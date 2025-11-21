<template>
  <div class="relative inline-block">
    <button
      @click="toggleMenu"
      class="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition"
    >
      <span>{{ currentLocale.flag }}</span>
      <span>{{ currentLocale.code.split('-')[0].toUpperCase() }}</span>
      <svg 
        class="w-4 h-4 transition-transform"
        :class="{ 'rotate-180': isOpen }"
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Dropdown Menu -->
    <div
      v-if="isOpen"
      class="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-200 z-50"
    >
      <div class="py-1">
        <button
          v-for="locale in availableLocales"
          :key="locale.code"
          @click="changeLocale(locale.code)"
          class="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 transition flex items-center space-x-2"
          :class="{
            'bg-blue-50 text-blue-700': currentLocale.code === locale.code,
            'text-gray-700': currentLocale.code !== locale.code
          }"
        >
          <span>{{ locale.flag }}</span>
          <span>{{ locale.name }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { availableLocales } from '../../locales'

const { locale } = useI18n()
const isOpen = ref(false)

const currentLocale = computed(() => {
  return availableLocales.find(l => l.code === locale.value) || availableLocales[0]
})

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const changeLocale = (newLocale: string) => {
  locale.value = newLocale
  localStorage.setItem('locale', newLocale)
  isOpen.value = false
}

// Close menu when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.relative')) {
    isOpen.value = false
  }
}

onMounted(() => {
  // Load saved locale from localStorage
  const savedLocale = localStorage.getItem('locale')
  if (savedLocale && availableLocales.some(l => l.code === savedLocale)) {
    locale.value = savedLocale
  }
  
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
