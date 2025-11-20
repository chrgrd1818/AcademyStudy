"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_router_1 = require("vue-router");
var supabase_config_1 = require("../shared/lib/supabase.config");
// Public views
var LandingView_vue_1 = require("../views/public/LandingView.vue");
var CatalogView_vue_1 = require("../views/public/CatalogView.vue");
var ContactView_vue_1 = require("../views/public/ContactView.vue");
// Auth views
var LoginView_vue_1 = require("../views/auth/LoginView.vue");
var SignupView_vue_1 = require("../views/auth/SignupView.vue");
// Player views
var ProfileView_vue_1 = require("../views/player/ProfileView.vue");
var MyCoursesView_vue_1 = require("../views/player/MyCoursesView.vue");
var CourseDetailView_vue_1 = require("../views/player/CourseDetailView.vue");
var QuizView_vue_1 = require("../views/player/QuizView.vue");
// Leader views
var TeamDashboardView_vue_1 = require("../views/leader/TeamDashboardView.vue");
var router = (0, vue_router_1.createRouter)({
    history: (0, vue_router_1.createWebHistory)(import.meta.env.BASE_URL),
    routes: [
        // Public routes
        {
            path: '/',
            name: 'landing',
            component: LandingView_vue_1.default,
            meta: { requiresAuth: false, zone: 'public' }
        },
        {
            path: '/catalog',
            name: 'catalog',
            component: CatalogView_vue_1.default,
            meta: { requiresAuth: false, zone: 'public' }
        },
        {
            path: '/contact',
            name: 'contact',
            component: ContactView_vue_1.default,
            meta: { requiresAuth: false, zone: 'public' }
        },
        // Auth routes
        {
            path: '/login',
            name: 'login',
            component: LoginView_vue_1.default,
            meta: { requiresAuth: false }
        },
        {
            path: '/signup',
            name: 'signup',
            component: SignupView_vue_1.default,
            meta: { requiresAuth: false }
        },
        // Player routes
        {
            path: '/profile',
            name: 'profile',
            component: ProfileView_vue_1.default,
            meta: { requiresAuth: true, zone: 'player' }
        },
        {
            path: '/my-courses',
            name: 'my-courses',
            component: MyCoursesView_vue_1.default,
            meta: { requiresAuth: true, zone: 'player' }
        },
        {
            path: '/course/:id',
            name: 'course-detail',
            component: CourseDetailView_vue_1.default,
            meta: { requiresAuth: true, zone: 'player' }
        },
        {
            path: '/quiz/:id',
            name: 'quiz',
            component: QuizView_vue_1.default,
            meta: { requiresAuth: true, zone: 'player' }
        },
        // Leader routes
        {
            path: '/team',
            name: 'team',
            component: TeamDashboardView_vue_1.default,
            meta: { requiresAuth: true, zone: 'leader', requiresRole: 'leader' }
        }
    ]
});
// Authentication guard
router.beforeEach(function (to, _from, next) { return __awaiter(void 0, void 0, void 0, function () {
    var requiresAuth, profile, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                requiresAuth = to.matched.some(function (record) { return record.meta.requiresAuth; });
                if (!requiresAuth) return [3 /*break*/, 5];
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, (0, supabase_config_1.getCurrentProfile)()];
            case 2:
                profile = _a.sent();
                if (!profile) {
                    next({ name: 'login', query: { redirect: to.fullPath } });
                    return [2 /*return*/];
                }
                // Check role requirements
                if (to.meta.requiresRole && profile.role !== to.meta.requiresRole) {
                    alert("This page requires ".concat(to.meta.requiresRole, " role."));
                    next({ name: 'my-courses' });
                    return [2 /*return*/];
                }
                next();
                return [3 /*break*/, 4];
            case 3:
                error_1 = _a.sent();
                next({ name: 'login', query: { redirect: to.fullPath } });
                return [3 /*break*/, 4];
            case 4: return [3 /*break*/, 6];
            case 5:
                next();
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); });
exports.default = router;
