/**
 * SUPABASE CLIENT CONFIGURATION
 * This is the "backend API" - Supabase provides the API layer
 * Copy this file to both academyStudio and academyStudy /src/lib/ folders
 */

import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Environment variables (typed in env.d.ts)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables. Check your .env file.');
}

// Create a single Supabase client instance
export const supabase: SupabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
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
export function getQuizMediaUrl(path: string): string {
    const { data } = supabase.storage.from('quiz-media').getPublicUrl(path);
    return data.publicUrl;
}

// Get public URL for user avatar
export function getAvatarUrl(userId: string): string {
    const { data } = supabase.storage.from('user-avatars').getPublicUrl(`${userId}/avatar.jpg`);
    return data.publicUrl;
}

// Upload file to quiz-media bucket (admin only)
export async function uploadQuizMedia(file: File, path: string) {
    const { data, error } = await supabase.storage
        .from('quiz-media')
        .upload(path, file, {
            cacheControl: '3600',
            upsert: false
        });

    if (error) throw error;
    return getQuizMediaUrl(data.path);
}

// Upload user avatar
export async function uploadAvatar(userId: string, file: File) {
    const filePath = `${userId}/avatar.jpg`;
    const { data, error } = await supabase.storage
        .from('user-avatars')
        .upload(filePath, file, {
            cacheControl: '3600',
            upsert: true
        });

    if (error) throw error;
    return getAvatarUrl(userId);
}

/**
 * AUTH HELPER FUNCTIONS
 */

// Get current user
export async function getCurrentUser() {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
}

// Get current user profile with role
export async function getCurrentProfile() {
    const user = await getCurrentUser();
    if (!user) return null;

    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    if (error) throw error;
    return data;
}

// Sign in with email/password
export async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
    });

    if (error) throw error;
    return data;
}

// Sign up with email/password
export async function signUp(email: string, password: string, fullName: string) {
    // 1. Create auth user
    const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password
    });

    if (authError) throw authError;
    if (!authData.user) throw new Error('No user returned from signup');

    // 2. Create profile (with trigger or manual insert)
    const { error: profileError } = await supabase
        .from('profiles')
        .insert({
            id: authData.user.id,
            email,
            full_name: fullName,
            role: 'player' // Default role
        });

    if (profileError) throw profileError;

    return authData;
}

// Sign out
export async function signOut() {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
}

// Sign in with Google
export async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: `${window.location.origin}/auth/callback`
        }
    });

    if (error) throw error;
    return data;
}
