<template>
  <nav class="bg-white shadow-sm border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <router-link to="/" class="text-2xl font-bold text-blue-600">
            QuizAcademy
          </router-link>
          <div class="ml-10 flex space-x-4">
            <router-link
              to="/"
              class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition"
              :class="{ 'bg-gray-100 text-gray-900': $route.path === '/' }"
            >
              Home
            </router-link>
            <router-link
              to="/catalog"
              class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition"
              :class="{ 'bg-gray-100 text-gray-900': $route.path === '/catalog' }"
            >
              Courses
            </router-link>
            <router-link
              to="/contact"
              class="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition"
              :class="{ 'bg-gray-100 text-gray-900': $route.path === '/contact' }"
            >
              Contact
            </router-link>
          </div>
        </div>
        <div class="flex items-center space-x-4">
          <router-link
            to="/login"
            class="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition"
          >
            Login
          </router-link>
          <router-link
            to="/signup"
            class="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition"
          >
            Sign Up
          </router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
</script>
