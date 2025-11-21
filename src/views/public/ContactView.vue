<template>
  <div>
    <PublicNav />
    <div class="min-h-screen bg-gray-50 py-12">
      <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-8">{{ $t('contact.title') }}</h1>
        
        <div class="bg-white rounded-lg shadow-md p-8">
          <form @submit.prevent="handleSubmit" class="space-y-6">
            <div v-if="success" class="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
              {{ success }}
            </div>
            
            <div v-if="error" class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {{ error }}
            </div>

            <div>
              <label for="name" class="block text-sm font-medium text-gray-700 mb-2">
                {{ $t('contact.form.name') }}
              </label>
              <input
                id="name"
                v-model="form.name"
                type="text"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              />
            </div>

            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                {{ $t('contact.form.email') }}
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              />
            </div>

            <div>
              <label for="message" class="block text-sm font-medium text-gray-700 mb-2">
                {{ $t('contact.form.message') }}
              </label>
              <textarea
                id="message"
                v-model="form.message"
                rows="5"
                required
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              ></textarea>
            </div>

            <button
              type="submit"
              :disabled="loading"
              class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition disabled:opacity-50"
            >
              {{ loading ? $t('contact.form.submitting') : $t('contact.form.submit') }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { supabase } from '../../shared/lib/supabase.config'
import PublicNav from '../../components/public/PublicNav.vue'

const { t } = useI18n()

const form = ref({
  name: '',
  email: '',
  message: ''
})

const loading = ref(false)
const success = ref('')
const error = ref('')

const handleSubmit = async () => {
  loading.value = true
  success.value = ''
  error.value = ''

  try {
    const { error: submitError } = await supabase
      .from('contact_submissions')
      .insert([form.value])

    if (submitError) throw submitError

    success.value = t('contact.success')
    form.value = { name: '', email: '', message: '' }
  } catch (err: any) {
    error.value = t('contact.error')
  } finally {
    loading.value = false
  }
}
</script>
