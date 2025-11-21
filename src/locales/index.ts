import { createI18n } from 'vue-i18n'
import enUS from './en-US.json'
import frFR from './fr-FR.json'

// Type-safe locale messages
export type MessageSchema = typeof enUS

// Create i18n instance with options
export const i18n = createI18n<[MessageSchema], 'en-US' | 'fr-FR'>({
    legacy: false, // Use Composition API mode
    locale: 'en-US', // Default locale
    fallbackLocale: 'en-US',
    messages: {
        'en-US': enUS,
        'fr-FR': frFR
    }
})

// Helper to get available locales
export const availableLocales = [
    { code: 'en-US', name: 'English', flag: '🇺🇸' },
    { code: 'fr-FR', name: 'Français', flag: '🇫🇷' }
] as const
