"use strict";
/**
 * SPACED REPETITION UTILITIES
 * Implements the 1d → 7d → 30d interval system
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateNextReview = calculateNextReview;
exports.isReviewDue = isReviewDue;
exports.formatNextReview = formatNextReview;
exports.getIntervalDescription = getIntervalDescription;
/**
 * Calculate the next review date based on attempt count
 * @param attemptCount Number of times the quiz has been taken
 * @returns Date object for when the next review is due
 */
function calculateNextReview(attemptCount) {
    var now = new Date();
    var daysToAdd;
    if (attemptCount === 1) {
        daysToAdd = 1; // First attempt: review in 1 day
    }
    else if (attemptCount === 2) {
        daysToAdd = 7; // Second attempt: review in 7 days
    }
    else {
        daysToAdd = 30; // Third+ attempt: review in 30 days
    }
    var nextReview = new Date(now);
    nextReview.setDate(nextReview.getDate() + daysToAdd);
    return nextReview;
}
/**
 * Check if a quiz review is due
 * @param nextReviewDue ISO date string from database
 * @returns true if review is due now
 */
function isReviewDue(nextReviewDue) {
    if (!nextReviewDue)
        return true; // Never taken before
    var reviewDate = new Date(nextReviewDue);
    var now = new Date();
    return reviewDate <= now;
}
/**
 * Format the next review date for display
 * @param nextReviewDue ISO date string from database
 * @returns Formatted string like "Review Now" or "Next Review: Jan 15"
 */
function formatNextReview(nextReviewDue) {
    if (!nextReviewDue)
        return 'Start Learning';
    if (isReviewDue(nextReviewDue)) {
        return 'Review Now ⭐';
    }
    var reviewDate = new Date(nextReviewDue);
    var formatter = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });
    return "Next Review: ".concat(formatter.format(reviewDate));
}
/**
 * Get the interval description based on attempt count
 * @param attemptCount Number of attempts
 * @returns Human-readable interval description
 */
function getIntervalDescription(attemptCount) {
    if (attemptCount === 1)
        return '1 day';
    if (attemptCount === 2)
        return '7 days';
    return '30 days';
}
