<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 px-4">
    <div class="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Reset Password</h1>
        <p class="text-gray-600 mt-2">Enter your new password below.</p>
      </div>

      <form @submit.prevent="handleUpdatePassword" class="space-y-6">
        <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
          {{ error }}
        </div>

        <div v-if="success" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
          Password updated successfully! Redirecting...
        </div>

        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
            New Password
          </label>
          <input
            id="password"
            v-model="password"
            type="password"
            required
            minlength="6"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition text-gray-900"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ loading ? 'Updating...' : 'Update Password' }}
        </button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { updatePassword, supabase } from '../../shared/lib/supabase.config'

const router = useRouter()
const password = ref('')
const loading = ref(false)
const error = ref('')
const success = ref(false)

onMounted(async () => {
  // Supabase handles the access_token from URL hash automatically
  // and sets the session. We just need to wait a moment for it to initialize.
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    // If no session (e.g. link expired or invalid), redirect to login
    // But give it a moment as the hash processing happens on client side
    setTimeout(async () => {
        const { data: { session: newSession } } = await supabase.auth.getSession()
        if (!newSession) {
            error.value = "Invalid or expired reset link."
        }
    }, 1000)
  }
})

const handleUpdatePassword = async () => {
  loading.value = true
  error.value = ''
  
  try {
    await updatePassword(password.value)
    success.value = true
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  } catch (err: any) {
    error.value = err.message || 'Failed to update password.'
  } finally {
    loading.value = false
  }
}
</script>
