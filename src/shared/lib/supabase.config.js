"use strict";
/**
 * SUPABASE CLIENT CONFIGURATION
 * This is the "backend API" - Supabase provides the API layer
 * Copy this file to both academyStudio and academyStudy /src/lib/ folders
 */
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
exports.supabase = void 0;
exports.getQuizMediaUrl = getQuizMediaUrl;
exports.getAvatarUrl = getAvatarUrl;
exports.uploadQuizMedia = uploadQuizMedia;
exports.uploadAvatar = uploadAvatar;
exports.getCurrentUser = getCurrentUser;
exports.getCurrentProfile = getCurrentProfile;
exports.signIn = signIn;
exports.signUp = signUp;
exports.signOut = signOut;
exports.signInWithGoogle = signInWithGoogle;
var supabase_js_1 = require("@supabase/supabase-js");
// Environment variables (typed in env.d.ts)
var supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
var supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables. Check your .env file.');
}
// Create a single Supabase client instance
exports.supabase = (0, supabase_js_1.createClient)(supabaseUrl, supabaseAnonKey, {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
    }
});
/**
 * STORAGE HELPER FUNCTIONS
 */
// Get public URL for quiz media
function getQuizMediaUrl(path) {
    var data = exports.supabase.storage.from('quiz-media').getPublicUrl(path).data;
    return data.publicUrl;
}
// Get public URL for user avatar
function getAvatarUrl(userId) {
    var data = exports.supabase.storage.from('user-avatars').getPublicUrl("".concat(userId, "/avatar.jpg")).data;
    return data.publicUrl;
}
// Upload file to quiz-media bucket (admin only)
function uploadQuizMedia(file, path) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, data, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, exports.supabase.storage
                        .from('quiz-media')
                        .upload(path, file, {
                        cacheControl: '3600',
                        upsert: false
                    })];
                case 1:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (error)
                        throw error;
                    return [2 /*return*/, getQuizMediaUrl(data.path)];
            }
        });
    });
}
// Upload user avatar
function uploadAvatar(userId, file) {
    return __awaiter(this, void 0, void 0, function () {
        var filePath, _a, data, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    filePath = "".concat(userId, "/avatar.jpg");
                    return [4 /*yield*/, exports.supabase.storage
                            .from('user-avatars')
                            .upload(filePath, file, {
                            cacheControl: '3600',
                            upsert: true
                        })];
                case 1:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (error)
                        throw error;
                    return [2 /*return*/, getAvatarUrl(userId)];
            }
        });
    });
}
/**
 * AUTH HELPER FUNCTIONS
 */
// Get current user
function getCurrentUser() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, user, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, exports.supabase.auth.getUser()];
                case 1:
                    _a = _b.sent(), user = _a.data.user, error = _a.error;
                    if (error)
                        throw error;
                    return [2 /*return*/, user];
            }
        });
    });
}
// Get current user profile with role
function getCurrentProfile() {
    return __awaiter(this, void 0, void 0, function () {
        var user, _a, data, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, getCurrentUser()];
                case 1:
                    user = _b.sent();
                    if (!user)
                        return [2 /*return*/, null];
                    return [4 /*yield*/, exports.supabase
                            .from('profiles')
                            .select('*')
                            .eq('id', user.id)
                            .single()];
                case 2:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (error)
                        throw error;
                    return [2 /*return*/, data];
            }
        });
    });
}
// Sign in with email/password
function signIn(email, password) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, data, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, exports.supabase.auth.signInWithPassword({
                        email: email,
                        password: password
                    })];
                case 1:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (error)
                        throw error;
                    return [2 /*return*/, data];
            }
        });
    });
}
// Sign up with email/password
function signUp(email, password, fullName) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, authData, authError, profileError;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, exports.supabase.auth.signUp({
                        email: email,
                        password: password
                    })];
                case 1:
                    _a = _b.sent(), authData = _a.data, authError = _a.error;
                    if (authError)
                        throw authError;
                    if (!authData.user)
                        throw new Error('No user returned from signup');
                    return [4 /*yield*/, exports.supabase
                            .from('profiles')
                            .insert({
                            id: authData.user.id,
                            email: email,
                            full_name: fullName,
                            role: 'player' // Default role
                        })];
                case 2:
                    profileError = (_b.sent()).error;
                    if (profileError)
                        throw profileError;
                    return [2 /*return*/, authData];
            }
        });
    });
}
// Sign out
function signOut() {
    return __awaiter(this, void 0, void 0, function () {
        var error;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.supabase.auth.signOut()];
                case 1:
                    error = (_a.sent()).error;
                    if (error)
                        throw error;
                    return [2 /*return*/];
            }
        });
    });
}
// Sign in with Google
function signInWithGoogle() {
    return __awaiter(this, void 0, void 0, function () {
        var _a, data, error;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, exports.supabase.auth.signInWithOAuth({
                        provider: 'google',
                        options: {
                            redirectTo: "".concat(window.location.origin, "/auth/callback")
                        }
                    })];
                case 1:
                    _a = _b.sent(), data = _a.data, error = _a.error;
                    if (error)
                        throw error;
                    return [2 /*return*/, data];
            }
        });
    });
}
