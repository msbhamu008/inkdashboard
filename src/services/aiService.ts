import axios from 'axios';
import type { AxiosResponse } from 'axios';

// Types for API requests
export interface SummaryOptions {
  maxLength?: number;
  focusAreas?: string[];
  includeKeyPoints?: boolean;
}

export interface QuestionOptions {
  types: Array<'mcq' | 'truefalse' | 'short' | 'long'>;
  count: number;
  difficulty: 'easy' | 'medium' | 'hard';
  topics?: string[];
}

export interface QuizOptions {
  questionCount: number;
  types: string[];
  difficulty: string;
  timeLimit?: number;
  topics?: string[];
}

export interface FlashcardOptions {
  count?: number;
  categories?: string[];
  includeExamples?: boolean;
}

export interface ConceptOptions {
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  style?: 'visual' | 'verbal' | 'logical' | 'practical';
  includeExamples?: boolean;
  includeAnalogies?: boolean;
}

// Types for API responses
export interface SummaryResponse {
  summary: string;
  keyPoints: string[];
  readingTime: number;
}

export interface Question {
  id: string;
  type: 'mcq' | 'truefalse' | 'short' | 'long';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuestionResponse {
  questions: Question[];
}

export interface Flashcard {
  id: string;
  term: string;
  definition: string;
  example?: string;
  category?: string;
}

export interface FlashcardResponse {
  flashcards: Flashcard[];
}

export interface ConceptExplanation {
  concept: string;
  explanation: string;
  examples: string[];
  analogies: string[];
  relatedConcepts: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

class AIService {
  private baseUrl: string;
  private apiKey: string;
  private useMock: boolean;

  constructor() {
    this.baseUrl = process.env.REACT_APP_AI_API_URL || 'https://api.inkredible.ai';
    this.apiKey = process.env.REACT_APP_AI_API_KEY || '';
    this.useMock = process.env.NODE_ENV === 'development' || !this.apiKey;
  }

  private async makeRequest<T>(endpoint: string, data: any): Promise<T> {
    if (this.useMock) {
      const mockService = await import('./mockAiService');
      const methodName = endpoint.slice(1) as keyof typeof mockService.default;
      return mockService.default[methodName](data.content || data.file, data.options) as Promise<T>;
    }

    try {
      const response: AxiosResponse<T> = await axios.post(`${this.baseUrl}${endpoint}`, data, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('AI Service Error:', error);
      throw error;
    }
  }

  async summarizePDF(file: File, options: SummaryOptions): Promise<SummaryResponse> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('options', JSON.stringify(options));

    return this.makeRequest<SummaryResponse>('/summarize', formData);
  }

  async generateQuestions(content: string, options: QuestionOptions): Promise<QuestionResponse> {
    return this.makeRequest<QuestionResponse>('/generate-questions', {
      content,
      options,
    });
  }

  async createQuiz(content: string, options: QuizOptions): Promise<QuestionResponse> {
    return this.makeRequest<QuestionResponse>('/create-quiz', {
      content,
      options,
    });
  }

  async generateFlashcards(content: string, options: FlashcardOptions): Promise<FlashcardResponse> {
    return this.makeRequest<FlashcardResponse>('/generate-flashcards', {
      content,
      options,
    });
  }

  async explainConcept(concept: string, options: ConceptOptions): Promise<ConceptExplanation> {
    return this.makeRequest<ConceptExplanation>('/explain-concept', {
      concept,
      options,
    });
  }

  async extractTextFromPDF(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await this.makeRequest<{ text: string }>('/extract-text', formData);
    return response.text;
  }
}

export const aiService = new AIService();
export default aiService;
