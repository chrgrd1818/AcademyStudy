<template>
  <div class="min-h-screen bg-white">
    <!-- Navigation -->
    <PublicNav />

    <!-- Hero Section -->
    <section class="relative bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div class="text-center">
          <h1 class="text-5xl md:text-6xl font-bold mb-6">
            {{ $t('landing.hero.title') }}
            <span class="text-yellow-300">{{ $t('brand.name') }}</span>
          </h1>
          <p class="text-xl md:text-2xl mb-8 text-blue-100">
            {{ $t('landing.hero.subtitle') }}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link
              to="/signup"
              class="px-8 py-4 bg-yellow-400 text-gray-900 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition shadow-lg"
            >
              {{ $t('landing.hero.ctaGetStarted') }}
            </router-link>
            <router-link
              to="/catalog"
              class="px-8 py-4 bg-white bg-opacity-20 backdrop-blur-sm border-2 border-white rounded-lg font-semibold text-lg hover:bg-opacity-30 transition"
            >
              {{ $t('landing.hero.ctaBrowseCourses') }}
            </router-link>
          </div>
        </div>
      </div>
      <!-- Wave decoration -->
      <div class="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 75C1200 70 1320 50 1380 40L1440 30V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-center text-gray-900 mb-12">{{ $t('landing.features.title') }}</h2>
        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ $t('landing.features.smartLearning.title') }}</h3>
            <p class="text-gray-600">{{ $t('landing.features.smartLearning.description') }}</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ $t('landing.features.gamification.title') }}</h3>
            <p class="text-gray-600">{{ $t('landing.features.gamification.description') }}</p>
          </div>
          <div class="text-center">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ $t('landing.features.teamLearning.title') }}</h3>
            <p class="text-gray-600">{{ $t('landing.features.teamLearning.description') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Courses -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-3xl font-bold text-gray-900">{{ $t('landing.featuredCourses.title') }}</h2>
          <router-link to="/catalog" class="text-blue-600 hover:text-blue-700 font-medium">
            {{ $t('landing.featuredCourses.viewAll') }}
          </router-link>
        </div>
        <div v-if="featuredCourses.length === 0" class="text-center py-12">
          <p class="text-gray-500">{{ $t('landing.featuredCourses.noCourses') }}</p>
        </div>
        <div v-else class="grid md:grid-cols-3 gap-6">
          <div v-for="course in featuredCourses" :key="course.id" 
               class="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
            <div class="h-48 bg-gradient-to-br from-blue-400 to-indigo-500"></div>
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-900 mb-2">{{ course.title }}</h3>
              <p class="text-gray-600 text-sm mb-4">{{ course.description }}</p>
              <router-link 
                to="/signup"
                class="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
              >
                {{ $t('landing.featuredCourses.startLearning') }}
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-4xl font-bold mb-4">{{ $t('landing.cta.title') }}</h2>
        <p class="text-xl mb-8 text-blue-100">{{ $t('landing.cta.subtitle') }}</p>
        <router-link
          to="/signup"
          class="inline-block px-8 py-4 bg-yellow-400 text-gray-900 rounded-lg font-semibold text-lg hover:bg-yellow-300 transition shadow-lg"
        >
          {{ $t('landing.cta.button') }}
        </router-link>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-gray-300 py-12">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-white font-bold text-lg mb-4">{{ $t('brand.name') }}</h3>
            <p class="text-sm">{{ $t('landing.footer.description') }}</p>
          </div>
          <div>
            <h4 class="text-white font-semibold mb-4">{{ $t('landing.footer.quickLinks') }}</h4>
            <ul class="space-y-2 text-sm">
              <li><router-link to="/catalog" class="hover:text-white">{{ $t('nav.courses') }}</router-link></li>
              <li><router-link to="/contact" class="hover:text-white">{{ $t('nav.contact') }}</router-link></li>
              <li><router-link to="/login" class="hover:text-white">{{ $t('nav.login') }}</router-link></li>
            </ul>
          </div>
          <div>
            <h4 class="text-white font-semibold mb-4">{{ $t('landing.footer.contact') }}</h4>
            <p class="text-sm">{{ $t('landing.footer.email') }}</p>
          </div>
        </div>
        <div class="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>{{ $t('landing.footer.copyright') }}</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '../../shared/lib/supabase.config'
import PublicNav from '../../components/public/PublicNav.vue'

const featuredCourses = ref<any[]>([])

onMounted(async () => {
  const { data } = await supabase
    .from('courses')
    .select('*')
    .eq('is_published', true)
    .limit(3)

  if (data) {
    featuredCourses.value = data
  }
})
</script>
