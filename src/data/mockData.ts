import { Class } from '../types/paper';
import { Question, QuestionType, DifficultyLevel } from '../types/question';

// Sample questions for the question bank
export const sampleQuestions: Question[] = [
  {
    id: '1',
    type: QuestionType.MCQ,
    text: '<p>What is the primary function of mitochondria in a cell?</p>',
    options: [
      { id: '1a', text: 'Energy production through cellular respiration', isCorrect: true },
      { id: '1b', text: 'Protein synthesis', isCorrect: false },
      { id: '1c', text: 'Storage of genetic material', isCorrect: false },
      { id: '1d', text: 'Cell division', isCorrect: false }
    ],
    correctAnswer: '',
    explanation: '<p>Mitochondria are often called the "powerhouse" of the cell because they generate most of the cell\'s supply of adenosine triphosphate (ATP), used as a source of chemical energy. This process occurs through cellular respiration.</p>',
    difficultyLevel: DifficultyLevel.MEDIUM,
    topic: 'Cell Biology',
    subject: 'Biology',
    tags: ['cell organelles', 'energy', 'cellular respiration'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '2',
    type: QuestionType.TRUE_FALSE,
    text: '<p>Newton\'s First Law states that an object will remain at rest or in uniform motion in a straight line unless acted upon by an external force.</p>',
    options: [],
    correctAnswer: 'true',
    explanation: '<p>This is correct. Newton\'s First Law, also known as the Law of Inertia, describes the tendency of objects to resist changes in their state of motion. This fundamental principle forms the basis of classical mechanics.</p>',
    difficultyLevel: DifficultyLevel.EASY,
    topic: 'Newton\'s Laws',
    subject: 'Physics',
    tags: ['mechanics', 'motion', 'forces'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '3',
    type: QuestionType.MCQ,
    text: '<p>Solve the quadratic equation: x² + 5x + 6 = 0</p><p>Find the values of x.</p>',
    options: [
      { id: '3a', text: 'x = -2 and x = -3', isCorrect: true },
      { id: '3b', text: 'x = 2 and x = 3', isCorrect: false },
      { id: '3c', text: 'x = -2 and x = 3', isCorrect: false },
      { id: '3d', text: 'x = 2 and x = -3', isCorrect: false }
    ],
    correctAnswer: '',
    explanation: '<p>Let\'s solve this step by step:</p><ol><li>This is a quadratic equation in the form ax² + bx + c = 0</li><li>Here, a = 1, b = 5, and c = 6</li><li>Using the factoring method: x² + 5x + 6 = (x + 2)(x + 3) = 0</li><li>Therefore, x = -2 or x = -3</li></ol>',
    difficultyLevel: DifficultyLevel.MEDIUM,
    topic: 'Quadratic Equations',
    subject: 'Mathematics',
    tags: ['algebra', 'equations', 'factoring'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '4',
    type: QuestionType.FILL_BLANKS,
    text: '<p>The process of converting water vapor into liquid water is called ________.</p>',
    options: [],
    correctAnswer: 'condensation',
    explanation: '<p>Condensation is the process where water vapor (gas) turns into liquid water. This process occurs when water vapor cools down or comes under increased pressure. Common examples include:</p><ul><li>Water droplets forming on a cold glass</li><li>Morning dew on grass</li><li>Clouds forming in the atmosphere</li></ul>',
    difficultyLevel: DifficultyLevel.EASY,
    topic: 'States of Matter',
    subject: 'Chemistry',
    tags: ['phase change', 'water cycle', 'states of matter'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '5',
    type: QuestionType.SHORT_ANSWER,
    text: '<p>Explain the significance of the Declaration of Independence in American history.</p>',
    options: [],
    correctAnswer: 'The Declaration of Independence, adopted on July 4, 1776, formally announced the 13 American colonies\' separation from Great Britain and their intention to form a new nation.',
    explanation: '<p>The Declaration of Independence is one of the most important documents in American history because:</p><ul><li>It formally declared the colonies\' independence from British rule</li><li>It outlined the basic principles of human rights and democracy</li><li>It inspired other independence movements worldwide</li><li>It established the foundation for the United States Constitution</li></ul>',
    difficultyLevel: DifficultyLevel.HARD,
    topic: 'American Revolution',
    subject: 'History',
    tags: ['american history', 'revolution', 'democracy'],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    id: '6',
    type: QuestionType.MCQ,
    text: '<p>In the context of computer programming, what does <code>API</code> stand for?</p>',
    options: [
      { id: '6a', text: 'Application Programming Interface', isCorrect: true },
      { id: '6b', text: 'Advanced Programming Implementation', isCorrect: false },
      { id: '6c', text: 'Automated Program Integration', isCorrect: false },
      { id: '6d', text: 'Application Process Integration', isCorrect: false }
    ],
    correctAnswer: '',
    explanation: '<p>API (Application Programming Interface) is a set of definitions and protocols for building and integrating application software. It acts as a bridge that allows different software applications to communicate with each other.</p><p>Common examples include:</p><ul><li>REST APIs for web services</li><li>Operating system APIs</li><li>Database APIs</li></ul>',
    difficultyLevel: DifficultyLevel.EASY,
    topic: 'Programming Fundamentals',
    subject: 'Computer Science',
    tags: ['programming', 'software development', 'integration'],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const availableTopics = [
  { id: '1', name: 'Cell Biology', subject: 'Biology' },
  { id: '2', name: 'Newton\'s Laws', subject: 'Physics' },
  { id: '3', name: 'Quadratic Equations', subject: 'Mathematics' },
  { id: '4', name: 'States of Matter', subject: 'Chemistry' },
  { id: '5', name: 'American Revolution', subject: 'History' },
  { id: '6', name: 'Programming Fundamentals', subject: 'Computer Science' }
];

export const SUBJECTS_BY_CLASS: Record<Class, string[]> = {
  [Class.Class6]: ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'],
  [Class.Class7]: ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'],
  [Class.Class8]: ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'],
  [Class.Class9]: ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'],
  [Class.Class10]: ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'],
  [Class.Class11]: [
    'Physics',
    'Chemistry',
    'Biology',
    'Mathematics',
    'Computer Science',
    'English',
  ],
  [Class.Class12]: [
    'Physics',
    'Chemistry',
    'Biology',
    'Mathematics',
    'Computer Science',
    'English',
  ],
  [Class.Class5]: ['Mathematics', 'Science', 'Social Science', 'English', 'Hindi'],
};
