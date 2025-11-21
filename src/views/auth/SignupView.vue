<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 px-4">
    <div class="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
      <!-- Logo/Title -->
      <div class="text-center mb-8">
        <router-link to="/" class="inline-block">
          <h1 class="text-3xl font-bold text-gray-800">{{ $t('auth.signup.title') }}</h1>
        </router-link>
        <p class="text-gray-600 mt-2">{{ $t('auth.signup.subtitle') }}</p>
      </div>

      <!-- Signup Form -->
      <form @submit.prevent="handleSignup" class="space-y-6">
        <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {{ error }}
        </div>

        <div v-if="success" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
          {{ success }}
        </div>

        <div>
          <label for="fullName" class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('auth.signup.fullNameLabel') }}
          </label>
          <input
            id="fullName"
            v-model="fullName"
            type="text"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-900"
            :placeholder="$t('auth.signup.fullNamePlaceholder')"
          />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('auth.signup.emailLabel') }}
          </label>
          <input
            id="email"
            v-model="email"
            type="email"
            required
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-900"
            :placeholder="$t('auth.signup.emailPlaceholder')"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
            {{ $t('auth.signup.passwordLabel') }}
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            minlength="6"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-900"
            :placeholder="$t('auth.signup.passwordPlaceholder')"
          />
          <p class="text-xs text-gray-500 mt-1">{{ $t('auth.signup.passwordHint') }}</p>
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? $t('auth.signup.creatingAccount') : $t('auth.signup.signupButton') }}
        </button>
      </form>

      <div class="mt-6 text-center">
        <p class="text-sm text-gray-600">
          {{ $t('auth.signup.haveAccount') }}
          <router-link to="/login" class="text-blue-600 hover:text-blue-700 font-medium">
            {{ $t('auth.signup.loginLink') }}
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
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { signUp } from '../../shared/lib/supabase.config'

const router = useRouter()
const { t } = useI18n()

const fullName = ref('')
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const success = ref('')

const handleSignup = async () => {
  loading.value = true
  error.value = ''
  success.value = ''

  try {
    await signUp(email.value, password.value, fullName.value)
    success.value = t('auth.signup.success')
    
    // Redirect to my courses after a short delay
    setTimeout(() => {
      router.push('/my-courses')
    }, 1500)
  } catch (err: any) {
    error.value = err.message || t('auth.signup.error')
  } finally {
    loading.value = false
  }
}
</script>
