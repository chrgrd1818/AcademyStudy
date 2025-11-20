import { createRouter, createWebHistory } from 'vue-router'
import { getCurrentProfile } from '../shared/lib/supabase.config'

// Extend route meta type
declare module 'vue-router' {
    interface RouteMeta {
        requiresAuth?: boolean
        zone?: string
        requiresRole?: string
    }
}

// Public views
import LandingView from '../views/public/LandingView.vue'
import CatalogView from '../views/public/CatalogView.vue'
import ContactView from '../views/public/ContactView.vue'

// Auth views
import LoginView from '../views/auth/LoginView.vue'
import SignupView from '../views/auth/SignupView.vue'

// Player views
import ProfileView from '../views/player/ProfileView.vue'
import MyCoursesView from '../views/player/MyCoursesView.vue'
import CourseDetailView from '../views/player/CourseDetailView.vue'
import QuizView from '../views/player/QuizView.vue'

// Leader views
import TeamDashboardView from '../views/leader/TeamDashboardView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        // Public routes
        {
            path: '/',
            name: 'landing',
            component: LandingView,
            meta: { requiresAuth: false, zone: 'public' }
        },
        {
            path: '/catalog',
            name: 'catalog',
            component: CatalogView,
            meta: { requiresAuth: false, zone: 'public' }
        },
        {
            path: '/contact',
            name: 'contact',
            component: ContactView,
            meta: { requiresAuth: false, zone: 'public' }
        },
        // Auth routes
        {
            path: '/login',
            name: 'login',
            component: LoginView,
            meta: { requiresAuth: false }
        },
        {
            path: '/signup',
            name: 'signup',
            component: SignupView,
            meta: { requiresAuth: false }
        },
        // Player routes
        {
            path: '/profile',
            name: 'profile',
            component: ProfileView,
            meta: { requiresAuth: true, zone: 'player' }
        },
        {
            path: '/my-courses',
            name: 'my-courses',
            component: MyCoursesView,
            meta: { requiresAuth: true, zone: 'player' }
        },
        {
            path: '/course/:id',
            name: 'course-detail',
            component: CourseDetailView,
            meta: { requiresAuth: true, zone: 'player' }
        },
        {
            path: '/quiz/:id',
            name: 'quiz',
            component: QuizView,
            meta: { requiresAuth: true, zone: 'player' }
        },
        // Leader routes
        {
            path: '/team',
            name: 'team',
            component: TeamDashboardView,
            meta: { requiresAuth: true, zone: 'leader', requiresRole: 'leader' }
        }
    ]
})

// Authentication guard
router.beforeEach(async (to, _from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

    if (requiresAuth) {
        try {
            const profile = await getCurrentProfile()

            if (!profile) {
                next({ name: 'login', query: { redirect: to.fullPath } })
                return
            }

            // Check role requirements
            if (to.meta.requiresRole && profile.role !== to.meta.requiresRole) {
                alert(`This page requires ${to.meta.requiresRole} role.`)
                next({ name: 'my-courses' })
                return
            }

            next()
        } catch (error) {
            next({ name: 'login', query: { redirect: to.fullPath } })
        }
    } else {
        next()
    }
})

export default router
