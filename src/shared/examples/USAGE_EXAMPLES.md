# How to Use Supabase in Your Vue Components

## 🔑 The Key Concept

**Supabase IS your backend API!** You don't need to create REST endpoints. The Supabase client handles all database operations.

---

## 📚 Example 1: Fetch Published Courses (Read)

```typescript
// In a Vue component or composable
import { supabase } from '@/lib/supabase.config';
import { ref } from 'vue';
import type { CourseWithPaths } from '@/types/app.types';

export function useCourses() {
  const courses = ref<CourseWithPaths[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  async function fetchPublishedCourses() {
    loading.value = true;
    error.value = null;

    try {
      const { data, error: fetchError } = await supabase
        .from('courses')
        .select('*')
        .eq('is_published', true)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      courses.value = data || [];
    } catch (err: any) {
      error.value = err.message;
    } finally {
      loading.value = false;
    }
  }

  return { courses, loading, error, fetchPublishedCourses };
}
```

**Usage in Component:**
```vue
<script setup lang="ts">
import { onMounted } from 'vue';
import { useCourses } from '@/composables/useCourses';

const { courses, loading, fetchPublishedCourses } = useCourses();

onMounted(() => {
  fetchPublishedCourses();
});
</script>

<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-for="course in courses" :key="course.id">
      {{ course.title }}
    </div>
  </div>
</template>
```

---

## ✏️ Example 2: Create a New Course (Write - Admin Only)

```typescript
import { supabase } from '@/lib/supabase.config';

export async function createCourse(title: string, description: string) {
  const { data, error } = await supabase
    .from('courses')
    .insert({
      title,
      description,
      is_published: false // Draft by default
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}
```

**Note:** The RLS policy will automatically check if the user is an admin. If not, the insert will fail.

---

## 🎯 Example 3: Complete Quiz & Track Progress

```typescript
import { supabase } from '@/lib/supabase.config';
import { calculateXP } from '@/utils/gamification';
import { calculateNextReview } from '@/utils/spacedRepetition';

export async function submitQuizResults(
  quizId: string,
  score: number,
  difficultyLevel: number,
  attemptCount: number
) {
  const user = await supabase.auth.getUser();
  if (!user.data.user) throw new Error('Not authenticated');

  const userId = user.data.user.id;
  const xpEarned = calculateXP(score, difficultyLevel);
  const nextReview = calculateNextReview(attemptCount);
  const status = score >= 80 ? 'passed' : 'failed';

  // 1. Insert progress record
  const { error: progressError } = await supabase
    .from('user_progress')
    .insert({
      user_id: userId,
      quiz_id: quizId,
      score,
      status,
      attempt_count: attemptCount,
      xp_earned: xpEarned,
      next_review_due: nextReview.toISOString()
    });

  if (progressError) throw progressError;

  // 2. Update user XP (this will trigger the level calculation)
  const { error: xpError } = await supabase.rpc('increment', {
    row_id: userId,
    x: xpEarned
  });

  // Alternative: Manual update
  const { data: profile } = await supabase
    .from('profiles')
    .select('total_xp')
    .eq('id', userId)
    .single();

  if (profile) {
    await supabase
      .from('profiles')
      .update({ total_xp: profile.total_xp + xpEarned })
      .eq('id', userId);
  }

  return { xpEarned, nextReview };
}
```

---

## 👥 Example 4: Join a Team (Leader Approval)

```typescript
export async function requestJoinTeam(teamId: string) {
  const user = await supabase.auth.getUser();
  if (!user.data.user) throw new Error('Not authenticated');

  const { error } = await supabase
    .from('team_members')
    .insert({
      team_id: teamId,
      user_id: user.data.user.id,
      status: 'pending' // Needs leader approval
    });

  if (error) throw error;
}

export async function approveTeamMember(teamId: string, userId: string) {
  // Only team leader can do this (checked by RLS)
  const { error } = await supabase
    .from('team_members')
    .update({ status: 'approved' })
    .eq('team_id', teamId)
    .eq('user_id', userId);

  if (error) throw error;
}
```

---

## 📊 Example 5: Get Team Leaderboard

```typescript
export async function getTeamLeaderboard() {
  // Using the view we created in the schema
  const { data, error } = await supabase
    .from('team_scores')
    .select('*')
    .order('total_team_xp', { ascending: false })
    .limit(10);

  if (error) throw error;
  return data;
}
```

---

## 🖼️ Example 6: Upload Quiz Media (Admin)

```typescript
import { uploadQuizMedia } from '@/lib/supabase.config';

export async function handleImageUpload(file: File, quizId: string) {
  const filePath = `quizzes/${quizId}/${Date.now()}-${file.name}`;
  
  try {
    const publicUrl = await uploadQuizMedia(file, filePath);
    console.log('Image uploaded:', publicUrl);
    return publicUrl;
  } catch (error) {
    console.error('Upload failed:', error);
    throw error;
  }
}
```

---

## 🔄 Example 7: Real-time Subscription (Live Updates)

```typescript
import { supabase } from '@/lib/supabase.config';
import { ref, onUnmounted } from 'vue';

export function useTeamProgress(teamId: string) {
  const members = ref([]);

  // Subscribe to changes
  const subscription = supabase
    .channel(`team-${teamId}`)
    .on(
      'postgres_changes',
      {
        event: '*', // Listen to INSERT, UPDATE, DELETE
        schema: 'public',
        table: 'team_members',
        filter: `team_id=eq.${teamId}`
      },
      (payload) => {
        console.log('Team member changed:', payload);
        // Refresh data
        fetchTeamMembers();
      }
    )
    .subscribe();

  async function fetchTeamMembers() {
    const { data } = await supabase
      .from('team_members')
      .select('*, profile:profiles(*)')
      .eq('team_id', teamId)
      .eq('status', 'approved');

    members.value = data || [];
  }

  // Cleanup on component unmount
  onUnmounted(() => {
    subscription.unsubscribe();
  });

  return { members, fetchTeamMembers };
}
```

---

## 🔐 Example 8: Protected Route / Auth Guard

```typescript
// router/index.ts
import { supabase } from '@/lib/supabase.config';

router.beforeEach(async (to, from, next) => {
  const { data: { session } } = await supabase.auth.getSession();

  // Public routes
  if (to.meta.public) {
    return next();
  }

  // Require authentication
  if (!session) {
    return next('/login');
  }

  // Admin-only routes
  if (to.meta.requiresAdmin) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', session.user.id)
      .single();

    if (profile?.role !== 'admin') {
      return next('/unauthorized');
    }
  }

  next();
});
```

---

## 📦 Summary

**The "Backend API" is:**
- ✅ `@supabase/supabase-js` client library
- ✅ Methods like `.from('table').select()`, `.insert()`, `.update()`, `.delete()`
- ✅ RLS policies enforce permissions automatically
- ✅ Real-time subscriptions for live data
- ✅ Storage helpers for file uploads

**You DON'T need:**
- ❌ Express/Fastify/NestJS server
- ❌ REST endpoint definitions
- ❌ Manual auth middleware
- ❌ Separate image hosting service

Everything is handled by Supabase! 🚀
