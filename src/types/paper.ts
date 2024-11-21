export enum ExamType {
  School = 'school',
  Entrance = 'entrance',
  SchoolEntrance = 'schoolEntrance',
  Olympiads = 'olympiads'
}

export enum Board {
  CBSE = 'CBSE',
  ICSE = 'ICSE',
  StateBoard = 'State Board'
}

export enum Class {
  Class5 = 'Class 5',
  Class6 = 'Class 6',
  Class7 = 'Class 7',
  Class8 = 'Class 8',
  Class9 = 'Class 9',
  Class10 = 'Class 10',
  Class11 = 'Class 11',
  Class12 = 'Class 12'
}

export enum PaperType {
  Objective = 'Objective',
  Subjective = 'Subjective',
  Mixed = 'Mixed'
}

export enum DifficultyLevel {
  Easy = 'Easy',
  Moderate = 'Moderate',
  Hard = 'Hard',
  Random = 'Random',
  Custom = 'Custom'
}

export enum SpecificExamType {
  UnitTest = 'Unit Test',
  BoardExam = 'Board Exam',
  Practice = 'Practice',
  Mock = 'Mock',
  TopicTest = 'Topic Test'
}

export enum QuestionType {
  TrueFalse = 'trueFalse',
  MCQ = 'mcq',
  FillInBlanks = 'fillInBlanks',
  ShortAnswer = 'shortAnswer',
  LongAnswer = 'longAnswer'
}

export interface CustomDifficulty {
  easy: number
  moderate: number
  hard: number
}

export interface QuestionTypeDistribution {
  type: QuestionType;
  quantity: number;
  marks: number;
}

export const SUBJECTS_BY_CLASS: Record<Class, string[]> = {
  [Class.Class5]: ['Mathematics', 'Science', 'English', 'Social Studies'],
  [Class.Class6]: ['Mathematics', 'Science', 'English', 'Social Studies'],
  [Class.Class7]: ['Mathematics', 'Science', 'English', 'Social Studies'],
  [Class.Class8]: ['Mathematics', 'Science', 'English', 'Social Studies'],
  [Class.Class9]: ['Mathematics', 'Science', 'English', 'Social Studies', 'Computer Science'],
  [Class.Class10]: ['Mathematics', 'Science', 'English', 'Social Studies', 'Computer Science'],
  [Class.Class11]: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science'],
  [Class.Class12]: ['Physics', 'Chemistry', 'Mathematics', 'Biology', 'Computer Science']
}

export interface TopicWeightage {
  topicId: string
  name: string
  weightage: number
  questionCount: number
}

export interface PaperConfig {
  examType: ExamType
  board?: Board
  class?: Class
  subject?: string
  specificExamType: SpecificExamType
  paperType: PaperType
  difficultyLevel: DifficultyLevel
  customDifficulty: CustomDifficulty
  selectedTopics: TopicWeightage[]
  questionTypes: QuestionTypeDistribution[]
  title: string
  totalMarks: number
  totalQuestions: number
  duration: number
  instructions: string
}

export interface PaperFormState extends PaperConfig {
  currentStep: number
  isCustomDifficulty: boolean
}
