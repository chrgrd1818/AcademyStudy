/**
 * SPACED REPETITION UTILITIES
 * Implements the 1d → 7d → 30d interval system
 */

import type { SpacedRepetitionInterval } from '../types/app.types';

/**
 * Calculate the next review date based on attempt count
 * @param attemptCount Number of times the quiz has been taken
 * @returns Date object for when the next review is due
 */
export function calculateNextReview(attemptCount: number): Date {
    const now = new Date();
    let daysToAdd: SpacedRepetitionInterval;

    if (attemptCount === 1) {
        daysToAdd = 1; // First attempt: review in 1 day
    } else if (attemptCount === 2) {
        daysToAdd = 7; // Second attempt: review in 7 days
    } else {
        daysToAdd = 30; // Third+ attempt: review in 30 days
    }

    const nextReview = new Date(now);
    nextReview.setDate(nextReview.getDate() + daysToAdd);

    return nextReview;
}

/**
 * Check if a quiz review is due
 * @param nextReviewDue ISO date string from database
 * @returns true if review is due now
 */
export function isReviewDue(nextReviewDue: string | null): boolean {
    if (!nextReviewDue) return true; // Never taken before

    const reviewDate = new Date(nextReviewDue);
    const now = new Date();

    return reviewDate <= now;
}

/**
 * Format the next review date for display
 * @param nextReviewDue ISO date string from database
 * @returns Formatted string like "Review Now" or "Next Review: Jan 15"
 */
export function formatNextReview(nextReviewDue: string | null): string {
    if (!nextReviewDue) return 'Start Learning';

    if (isReviewDue(nextReviewDue)) {
        return 'Review Now ⭐';
    }

    const reviewDate = new Date(nextReviewDue);
    const formatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });

    return `Next Review: ${formatter.format(reviewDate)}`;
}

/**
 * Get the interval description based on attempt count
 * @param attemptCount Number of attempts
 * @returns Human-readable interval description
 */
export function getIntervalDescription(attemptCount: number): string {
    if (attemptCount === 1) return '1 day';
    if (attemptCount === 2) return '7 days';
    return '30 days';
}
