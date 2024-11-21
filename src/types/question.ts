export enum QuestionType {
  MCQ = 'MCQ',
  TRUE_FALSE = 'True/False',
  FILL_BLANKS = 'Fill in the Blanks',
  SHORT_ANSWER = 'Short Answer',
  ESSAY = 'Essay',
}

export enum DifficultyLevel {
  EASY = 'Easy',
  MEDIUM = 'Medium',
  HARD = 'Hard',
}

export interface Option {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options?: Option[];
  correctAnswer?: string;
  difficultyLevel: DifficultyLevel;
  topic: string;
  subject: string;
  tags: string[];
  explanation: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuestionFormData extends Omit<Question, 'id' | 'createdAt' | 'updatedAt'> {}

export interface QuestionFilters {
  search: string;
  types: QuestionType[];
  difficultyLevels: DifficultyLevel[];
  topics: string[];
  subjects: string[];
  tags: string[];
}
