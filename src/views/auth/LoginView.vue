<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 px-4">
    <div class="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
      <!-- Logo/Title -->
      <div class="text-center mb-8">
        <router-link to="/" class="inline-block">
          <h1 class="text-3xl font-bold text-gray-800">{{ $t('auth.login.title') }}</h1>
        </router-link>
        <p class="text-gray-600 mt-2">{{ $t('auth.login.subtitle') }}</p>
      </div>

      <!-- Login Form -->
      <form @submit.prevent="handleLogin" class="space-y-6">
        <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {{ error }}
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('auth.login.emailLabel') }}
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-900"
            :placeholder="$t('auth.login.emailPlaceholder')"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('auth.login.passwordLabel') }}
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-900"
            :placeholder="$t('auth.login.passwordPlaceholder')"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? $t('auth.login.loggingIn') : $t('auth.login.loginButton') }}
        </button>
      </form>

      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600">
          {{ $t('auth.login.noAccount') }}
          <router-link to="/signup" class="text-blue-600 hover:text-blue-700 font-medium">
            {{ $t('auth.login.signupLink') }}
          </router-link>
        </p>
      </div>

      <div class="mt-4 text-center">
        <router-link to="/" class="text-sm text-gray-500 hover:text-gray-700">
          {{ $t('common.backToHome') }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { signIn } from '../../shared/lib/supabase.config'

const router = useRouter()
const route = useRoute()
const { t } = useI18n()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    await signIn(email.value, password.value)
    const redirect = (route.query.redirect as string) || '/my-courses'
    router.push(redirect)
  } catch (err: any) {
    error.value = err.message || t('auth.login.error')
  } finally {
    loading.value = false
  }
}
</script>
