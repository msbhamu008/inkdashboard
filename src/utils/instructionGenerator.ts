import { QuestionType, QuestionTypeDistribution } from '../types/paper';

const SECTION_NAMES = ['A', 'B', 'C', 'D', 'E', 'F'];

interface InstructionSection {
  sectionName: string;
  questionType: QuestionType;
  quantity: number;
  marksPerQuestion: number;
}

export const generatePaperInstructions = (
  questionDistribution: QuestionTypeDistribution[]
): string => {
  // Filter out question types with quantity > 0 and sort by question type
  const activeQuestions = questionDistribution
    .filter((dist) => dist.quantity > 0)
    .sort((a, b) => a.type.localeCompare(b.type));

  if (activeQuestions.length === 0) {
    return '';
  }

  // Create sections with names
  const sections: InstructionSection[] = activeQuestions.map((dist, index) => ({
    sectionName: SECTION_NAMES[index],
    questionType: dist.type,
    quantity: dist.quantity,
    marksPerQuestion: dist.marks,
  }));

  // Calculate total questions
  const totalQuestions = sections.reduce((sum, section) => sum + section.quantity, 0);

  // Generate header
  const sectionNames = sections.map((section) => section.sectionName).join(', ');
  let instructions = `This question paper contains ${sections.length} section${
    sections.length > 1 ? 's' : ''
  }: ${sectionNames}. There are ${totalQuestions} questions in total. All sections are compulsory.\n\n`;

  // Generate section-wise instructions
  sections.forEach((section) => {
    const questionTypeDisplay = getQuestionTypeDisplay(section.questionType);
    instructions += ` Section ${
      section.sectionName
    } contains ${section.quantity} ${questionTypeDisplay} question${
      section.quantity > 1 ? 's' : ''
    } of ${section.marksPerQuestion} mark${
      section.marksPerQuestion > 1 ? 's' : ''
    } each.\n`;
  });

  // Add general instructions
  instructions += '\nGeneral Instructions:\n';
  instructions += '1. Read the instructions for each section carefully.\n';
  instructions += '2. There is no overall choice in the question paper.\n';
  instructions += '3. Internal choices are provided in some questions where applicable.\n';
  instructions += '4. All questions are compulsory unless stated otherwise.\n';

  // Add specific instructions based on question types
  if (hasQuestionType(sections, QuestionType.MCQ)) {
    instructions += '5. For Multiple-choice Questions, choose the most appropriate answer.\n';
  }
  if (hasQuestionType(sections, QuestionType.TrueFalse)) {
    instructions += '6. For True/False questions, clearly mark your answer as either True or False.\n';
  }
  if (hasQuestionType(sections, QuestionType.FillInBlanks)) {
    instructions += '7. For Fill-in-the-blank, provide precise and concise answers.\n';
  }
  if (hasQuestionType(sections, QuestionType.ShortAnswer)) {
    instructions += '8. Short-answer questions should be answered within the specified word limit.\n';
  }
  if (hasQuestionType(sections, QuestionType.LongAnswer)) {
    instructions += '9. Long Answer questions require detailed explanations with examples where applicable.\n';
  }

  return instructions;
};

const getQuestionTypeDisplay = (type: QuestionType): string => {
  switch (type) {
    case QuestionType.MCQ:
      return 'Multiple Choice';
    case QuestionType.TrueFalse:
      return 'True/False';
    case QuestionType.FillInBlanks:
      return 'Fill in the Blanks';
    case QuestionType.ShortAnswer:
      return 'Short Answer';
    case QuestionType.LongAnswer:
      return 'Long Answer';
    default:
      return type;
  }
};

const hasQuestionType = (sections: InstructionSection[], type: QuestionType): boolean => {
  return sections.some((section) => section.questionType === type);
};
