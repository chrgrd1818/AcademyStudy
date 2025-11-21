<template>
  <div>
    <PublicNav />
    <div class="min-h-screen bg-gray-50 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">{{ $t('catalog.title') }}</h1>
        
        <!-- Search Bar -->
        <div class="mb-8">
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="$t('catalog.searchPlaceholder')"
            class="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          />
        </div>

        <!-- Course Grid -->
        <div v-if="filteredCourses.length === 0" class="text-center py-12">
          <p class="text-gray-500">{{ $t('catalog.noCourses') }}</p>
        </div>
        <div v-else class="grid md:grid-cols-3 gap-6">
          <div v-for="course in filteredCourses" :key="course.id" 
               class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
            <div class="h-48 bg-gradient-to-br from-blue-400 to-indigo-500"></div>
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ course.title }}</h3>
              <p class="text-gray-600 text-sm mb-4">{{ course.description }}</p>
              <router-link 
                to="/signup"
                class="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition text-sm font-medium"
              >
                {{ $t('catalog.enrollNow') }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { supabase } from '../../shared/lib/supabase.config'
import PublicNav from '../../components/public/PublicNav.vue'

const courses = ref<any[]>([])
const searchQuery = ref('')

const filteredCourses = computed(() => {
  if (!searchQuery.value) return courses.value
  const query = searchQuery.value.toLowerCase()
  return courses.value.filter(course => 
    course.title.toLowerCase().includes(query) ||
    course.description.toLowerCase().includes(query)
  )
})

onMounted(async () => {
  const { data } = await supabase
    .from('courses')
    .select('*')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  if (data) {
    courses.value = data
  }
})
</script>
