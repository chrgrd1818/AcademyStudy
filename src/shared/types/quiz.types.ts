/**
 * QUIZ CONTENT TYPES
 * Based on specs.txt lines 254-317
 * These define the JSONB structure stored in the questions.content column
 */

export type QuestionType = 'mcq' | 'matching' | 'sequencing' | 'ai_prompt';

// Base structure for all questions
export interface BaseQuestion {
  id: string;
  prompt: string; // The main question text
  media?: {
    type: 'image' | 'video' | 'audio';
    url: string; // Supabase Storage URL
    alt_text?: string;
  };
  feedback_text?: string; // Immediate feedback after answering
}

// 1. Multiple Choice Question
export interface McqQuestion extends BaseQuestion {
  type: 'mcq';
  options: {
    id: string;
    text: string;
    media_url?: string; // Optional image for the answer
  }[];
  correct_option_id: string;
}

// 2. Drag and Drop Matching
export interface MatchingQuestion extends BaseQuestion {
  type: 'matching';
  pairs: {
    left_text: string;
    right_text: string; // The correct match
    left_media?: string;
    right_media?: string;
  }[];
}

// 3. Sequencing / Ordering
export interface SequencingQuestion extends BaseQuestion {
  type: 'sequencing';
  items: {
    id: string;
    content: string;
  }[];
  correct_order_ids: string[]; // Array of IDs in correct order
}

// 4. AI Open Prompt (Future V2 Support)
export interface AiQuestion extends BaseQuestion {
  type: 'ai_prompt';
  model_parameters: {
    min_length: number;
    keywords_required: string[];
  };
}

/**
 * THE UNION TYPE
 * This is what goes into the 'questions.content' JSONB column
 */
export type QuizContent = McqQuestion | MatchingQuestion | SequencingQuestion | AiQuestion;
