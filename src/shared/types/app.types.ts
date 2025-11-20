/**
 * APPLICATION-SPECIFIC TYPES
 * Enums and interfaces for app logic
 */

export type UserRole = 'player' | 'leader' | 'admin';
export type QuizMode = 'standard' | 'timed' | 'strike_limit';
export type ContentType = 'lesson' | 'quiz';
export type SubscriptionStatus = 'active' | 'inactive' | 'trial' | 'expired';

// Spaced Repetition Intervals (in days)
export type SpacedRepetitionInterval = 1 | 7 | 30;

// Badge structure stored in profiles.badges JSONB
export interface Badge {
    id: string;
    name: string;
    icon_url: string;
    earned_at: string; // ISO date
    description?: string;
}

// User profile with computed fields
export interface UserProfile {
    id: string;
    email: string | null;
    full_name: string | null;
    avatar_url: string | null;
    role: UserRole;
    total_xp: number;
    current_level: number;
    badges: Badge[];
    created_at: string;
    updated_at: string;
}

// Course with relationships
export interface CourseWithPaths {
    id: string;
    title: string;
    description: string | null;
    thumbnail_url: string | null;
    is_published: boolean;
    learning_paths?: LearningPath[];
}

// Learning path item
export interface LearningPath {
    id: string;
    course_id: string;
    sequence_order: number;
    type: ContentType;
    target_id: string;
    title: string;
}

// Quiz with questions
export interface QuizWithQuestions {
    id: string;
    title: string;
    description: string | null;
    mode: QuizMode;
    time_limit_seconds: number | null;
    passing_score: number;
    difficulty_level: number;
    questions?: Question[];
}

// Question from database
export interface Question {
    id: string;
    quiz_id: string;
    type: string;
    content: any; // This will be one of the QuizContent types
    order_index: number;
}

// User progress record
export interface UserProgress {
    id: string;
    user_id: string;
    course_id: string | null;
    quiz_id: string;
    score: number;
    status: 'passed' | 'failed';
    attempt_count: number;
    xp_earned: number;
    completed_at: string;
    next_review_due: string | null;
}

// Team with members
export interface TeamWithMembers {
    id: string;
    name: string;
    leader_id: string;
    description: string | null;
    members?: TeamMember[];
    total_team_xp?: number;
}

// Team member
export interface TeamMember {
    team_id: string;
    user_id: string;
    status: 'pending' | 'approved' | 'rejected';
    joined_at: string;
    profile?: UserProfile;
}

// Subscription
export interface Subscription {
    id: string;
    user_id: string;
    course_id: string;
    status: SubscriptionStatus;
    stripe_subscription_id: string | null;
    started_at: string;
    expires_at: string | null;
}
