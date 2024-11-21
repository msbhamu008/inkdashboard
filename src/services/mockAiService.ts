import { 
  SummaryResponse, 
  QuestionResponse, 
  FlashcardResponse, 
  ConceptExplanation,
  SummaryOptions,
  QuestionOptions,
  FlashcardOptions,
  ConceptOptions
} from './aiService';

// Helper function to simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const mockAiService = {
  async summarizePDF(file: File, options: SummaryOptions): Promise<SummaryResponse> {
    await delay(2000); // Simulate API call delay
    
    return {
      summary: "This document discusses the importance of artificial intelligence in modern education. It highlights how AI can personalize learning experiences, automate administrative tasks, and provide instant feedback to students. The text emphasizes the role of machine learning algorithms in adapting to individual learning styles and paces.",
      keyPoints: [
        "AI enables personalized learning experiences",
        "Machine learning algorithms adapt to individual learning styles",
        "Automated administrative tasks increase efficiency",
        "Real-time feedback improves learning outcomes",
        "AI tools can supplement traditional teaching methods"
      ],
      readingTime: 3
    };
  },

  async generateQuestions(content: string, options: QuestionOptions): Promise<QuestionResponse> {
    await delay(1500);

    return {
      questions: [
        {
          id: '1',
          type: 'mcq',
          question: 'What is the primary benefit of AI in education?',
          options: [
            'Personalized learning experiences',
            'Reduced cost of education',
            'Elimination of teachers',
            'Faster internet speeds'
          ],
          correctAnswer: 'Personalized learning experiences',
          explanation: 'AI enables customized learning paths based on individual student needs and preferences.',
          difficulty: 'medium'
        },
        {
          id: '2',
          type: 'truefalse',
          question: 'AI completely replaces traditional teaching methods.',
          correctAnswer: 'false',
          explanation: 'AI supplements and enhances traditional teaching rather than replacing it entirely.',
          difficulty: 'easy'
        }
      ]
    };
  },

  async createQuiz(content: string, options: QuestionOptions): Promise<QuestionResponse> {
    return this.generateQuestions(content, options);
  },

  async generateFlashcards(content: string, options: FlashcardOptions): Promise<FlashcardResponse> {
    await delay(1800);

    return {
      flashcards: [
        {
          id: '1',
          term: 'Machine Learning',
          definition: 'A subset of artificial intelligence that enables systems to learn and improve from experience without being explicitly programmed.',
          example: 'A spam filter that learns to identify unwanted emails based on past examples.',
          category: 'AI Concepts'
        },
        {
          id: '2',
          term: 'Neural Network',
          definition: 'A computing system inspired by biological neural networks, designed to recognize patterns and learn from data.',
          example: 'Image recognition systems that can identify objects in photographs.',
          category: 'AI Concepts'
        }
      ]
    };
  },

  async explainConcept(concept: string, options: ConceptOptions): Promise<ConceptExplanation> {
    await delay(1600);

    return {
      concept: concept,
      explanation: "Artificial Intelligence (AI) refers to the simulation of human intelligence in machines programmed to think and learn like humans. It encompasses various technologies and approaches aimed at creating smart systems that can perform tasks typically requiring human intelligence.",
      examples: [
        "Virtual assistants like Siri and Alexa",
        "Netflix's movie recommendation system",
        "Self-driving cars"
      ],
      analogies: [
        "AI is like having a very smart intern who learns from experience",
        "Machine learning is similar to how a child learns to recognize patterns"
      ],
      relatedConcepts: [
        "Machine Learning",
        "Deep Learning",
        "Neural Networks"
      ],
      difficulty: options.level || 'intermediate'
    };
  },

  async extractTextFromPDF(file: File): Promise<string> {
    await delay(1000);
    return "Sample extracted text from PDF...";
  }
};

export default mockAiService;
