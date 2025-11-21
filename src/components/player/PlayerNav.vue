<template>
  <nav class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <router-link to="/my-courses" class="text-2xl font-bold text-blue-600">
            {{ $t('brand.name') }}
          </router-link>
          <div class="ml-10 flex space-x-4">
            <router-link
              to="/my-courses"
              class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition"
              :class="{ 'bg-gray-100 text-gray-900': $route.path === '/my-courses' }"
            >
              {{ $t('nav.myCourses') }}
            </router-link>
            <router-link
              to="/profile"
              class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition"
              :class="{ 'bg-gray-100 text-gray-900': $route.path === '/profile' }"
            >
              {{ $t('nav.profile') }}
            </router-link>
            <router-link
              to="/catalog"
              class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition"
            >
              {{ $t('nav.browseCourses') }}
            </router-link>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <LanguageSwitcher />
          <span class="text-sm text-gray-600">{{ userEmail }}</span>
          <button
            @click="handleSignOut"
            class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition"
          >
            {{ $t('nav.signOut') }}
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { supabase, signOut } from '../../shared/lib/supabase.config'
import LanguageSwitcher from '../shared/LanguageSwitcher.vue'

const router = useRouter()
const userEmail = ref('')

onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    userEmail.value = user.email || 'User'
  }
})

const handleSignOut = async () => {
  await signOut()
  router.push('/')
}
</script>
