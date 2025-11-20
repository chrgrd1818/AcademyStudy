/**
 * GAMIFICATION UTILITIES
 * XP, levels, and badge calculations
 */

import type { Badge } from '../types/app.types';

/**
 * Calculate XP earned from a quiz score
 * @param score Percentage score (0-100)
 * @param difficultyLevel Quiz difficulty (1-5)
 * @returns XP earned
 */
export function calculateXP(score: number, difficultyLevel: number = 1): number {
    // Base XP: 10 points per 10% of score
    const baseXP = Math.floor(score / 10) * 10;

    // Difficulty multiplier (1x to 2x)
    const difficultyMultiplier = 1 + (difficultyLevel - 1) * 0.25;

    // Bonus for perfect score
    const perfectBonus = score === 100 ? 50 : 0;

    return Math.floor(baseXP * difficultyMultiplier) + perfectBonus;
}

/**
 * Calculate level from total XP (100 XP per level)
 * @param totalXP Total accumulated XP
 * @returns Current level (starts at 1)
 */
export function calculateLevel(totalXP: number): number {
    return Math.floor(totalXP / 100) + 1;
}

/**
 * Calculate XP needed for next level
 * @param totalXP Current total XP
 * @returns XP needed to reach next level
 */
export function getXPForNextLevel(totalXP: number): number {
    const currentLevel = calculateLevel(totalXP);
    const xpForNextLevel = currentLevel * 100;
    return xpForNextLevel - totalXP;
}

/**
 * Calculate progress percentage to next level
 * @param totalXP Current total XP
 * @returns Percentage (0-100) of progress to next level
 */
export function getLevelProgress(totalXP: number): number {
    const currentLevelMinXP = (calculateLevel(totalXP) - 1) * 100;
    const xpInCurrentLevel = totalXP - currentLevelMinXP;
    return (xpInCurrentLevel / 100) * 100;
}

/**
 * Get level title/name based on level number
 * @param level Current level
 * @returns Level title
 */
export function getLevelTitle(level: number): string {
    if (level >= 50) return 'Grand Master';
    if (level >= 40) return 'Master';
    if (level >= 30) return 'Expert';
    if (level >= 20) return 'Advanced';
    if (level >= 10) return 'Intermediate';
    if (level >= 5) return 'Apprentice';
    return 'Novice';
}

/**
 * Check and award badges based on user stats
 * @param stats User statistics
 * @returns Array of newly earned badges
 */
export function checkNewBadges(stats: {
    totalXP: number;
    quizzesCompleted: number;
    perfectScores: number;
    currentStreak: number;
}): Badge[] {
    const newBadges: Badge[] = [];
    const now = new Date().toISOString();

    // First Quiz Badge
    if (stats.quizzesCompleted === 1) {
        newBadges.push({
            id: 'first-quiz',
            name: 'First Steps',
            icon_url: '/assets/badges/first-quiz.png',
            earned_at: now,
            description: 'Completed your first quiz'
        });
    }

    // Perfect Score Badge
    if (stats.perfectScores === 1) {
        newBadges.push({
            id: 'perfect-score',
            name: 'Perfectionist',
            icon_url: '/assets/badges/perfect.png',
            earned_at: now,
            description: 'Achieved a perfect score'
        });
    }

    // 10 Quizzes Badge
    if (stats.quizzesCompleted === 10) {
        newBadges.push({
            id: 'quiz-master-10',
            name: 'Quiz Master',
            icon_url: '/assets/badges/10-quizzes.png',
            earned_at: now,
            description: 'Completed 10 quizzes'
        });
    }

    // 7 Day Streak Badge
    if (stats.currentStreak === 7) {
        newBadges.push({
            id: 'streak-7',
            name: 'Week Warrior',
            icon_url: '/assets/badges/7-day-streak.png',
            earned_at: now,
            description: '7 day learning streak'
        });
    }

    // Level Milestone Badges
    const level = calculateLevel(stats.totalXP);
    if (level === 10) {
        newBadges.push({
            id: 'level-10',
            name: 'Rising Star',
            icon_url: '/assets/badges/level-10.png',
            earned_at: now,
            description: 'Reached level 10'
        });
    }

    return newBadges;
}
