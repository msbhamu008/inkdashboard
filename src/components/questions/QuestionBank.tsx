import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Button,
  Dialog,
  Grid,
  TextField,
  Autocomplete,
  styled,
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Add as AddIcon,
} from '@mui/icons-material';

import {
  Question,
  QuestionType,
  DifficultyLevel,
  QuestionFilters,
} from '../../types/question';
import AddQuestion from './AddQuestion';
import { availableTopics, SUBJECTS_BY_CLASS, sampleQuestions } from '../../data/mockData';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  backgroundColor: '#ffffff',
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
}));

const QuestionBank: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>(sampleQuestions);
  const [filters, setFilters] = useState<QuestionFilters>({
    search: '',
    types: [],
    difficultyLevels: [],
    topics: [],
    subjects: [],
    tags: [],
  });
  const [showAddQuestion, setShowAddQuestion] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const handleAddQuestion = () => {
    setSelectedQuestion(null);
    setShowAddQuestion(true);
  };

  const handleEditQuestion = (question: Question) => {
    setSelectedQuestion(question);
    setShowAddQuestion(true);
  };

  const handleDeleteQuestion = (questionId: string) => {
    setQuestions((prev) => prev.filter((q) => q.id !== questionId));
  };

  const handlePreviewQuestion = (question: Question) => {
    setSelectedQuestion(question);
    setShowPreview(true);
  };

  const handleQuestionSubmit = (formData: Omit<Question, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (selectedQuestion) {
      // Update existing question
      setQuestions((prev) =>
        prev.map((q) =>
          q.id === selectedQuestion.id
            ? {
                ...selectedQuestion,
                ...formData,
                updatedAt: new Date(),
              }
            : q
        )
      );
    } else {
      // Add new question
      const newQuestion: Question = {
        ...formData,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setQuestions((prev) => [...prev, newQuestion]);
    }
    setShowAddQuestion(false);
  };

  const filteredQuestions = questions.filter((question) => {
    const matchesSearch =
      filters.search === '' ||
      question.text.toLowerCase().includes(filters.search.toLowerCase()) ||
      question.tags.some((tag) =>
        tag.toLowerCase().includes(filters.search.toLowerCase())
      );

    const matchesType =
      filters.types.length === 0 || filters.types.includes(question.type);

    const matchesDifficulty =
      filters.difficultyLevels.length === 0 ||
      filters.difficultyLevels.includes(question.difficultyLevel);

    const matchesTopic =
      filters.topics.length === 0 || filters.topics.includes(question.topic);

    const matchesSubject =
      filters.subjects.length === 0 || filters.subjects.includes(question.subject);

    const matchesTags =
      filters.tags.length === 0 ||
      filters.tags.some((tag) => question.tags.includes(tag));

    return (
      matchesSearch &&
      matchesType &&
      matchesDifficulty &&
      matchesTopic &&
      matchesSubject &&
      matchesTags
    );
  });

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Question Bank</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleAddQuestion}
          sx={{
            bgcolor: '#150b2e',
            '&:hover': {
              bgcolor: '#2a1758',
            },
          }}
        >
          Add Question
        </Button>
      </Box>

      <StyledPaper>
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Search Questions"
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, search: e.target.value }))
              }
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Autocomplete
              multiple
              value={filters.types}
              onChange={(_, newValue) =>
                setFilters((prev) => ({ ...prev, types: newValue }))
              }
              options={Object.values(QuestionType)}
              renderInput={(params) => (
                <TextField {...params} label="Question Types" />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Autocomplete
              multiple
              value={filters.difficultyLevels}
              onChange={(_, newValue) =>
                setFilters((prev) => ({ ...prev, difficultyLevels: newValue }))
              }
              options={Object.values(DifficultyLevel)}
              renderInput={(params) => (
                <TextField {...params} label="Difficulty Levels" />
              )}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Autocomplete
              multiple
              value={filters.subjects}
              onChange={(_, newValue) =>
                setFilters((prev) => ({ ...prev, subjects: newValue }))
              }
              options={Object.values(SUBJECTS_BY_CLASS).flat()}
              renderInput={(params) => <TextField {...params} label="Subjects" />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Autocomplete
              multiple
              value={filters.topics}
              onChange={(_, newValue) =>
                setFilters((prev) => ({ ...prev, topics: newValue }))
              }
              options={availableTopics.map((topic) => topic.name)}
              renderInput={(params) => <TextField {...params} label="Topics" />}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Autocomplete
              multiple
              freeSolo
              value={filters.tags}
              onChange={(_, newValue) =>
                setFilters((prev) => ({ ...prev, tags: newValue }))
              }
              options={[]}
              renderInput={(params) => <TextField {...params} label="Tags" />}
            />
          </Grid>
        </Grid>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Question</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Difficulty</TableCell>
                <TableCell>Topic</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Tags</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredQuestions.map((question) => (
                <TableRow key={question.id}>
                  <TableCell>{question.text}</TableCell>
                  <TableCell>{question.type}</TableCell>
                  <TableCell>
                    <Chip
                      label={question.difficultyLevel}
                      color={
                        question.difficultyLevel === DifficultyLevel.EASY
                          ? 'success'
                          : question.difficultyLevel === DifficultyLevel.MEDIUM
                          ? 'warning'
                          : 'error'
                      }
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{question.topic}</TableCell>
                  <TableCell>{question.subject}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {question.tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          size="small"
                          sx={{
                            bgcolor: '#150b2e',
                            color: '#fff',
                          }}
                        />
                      ))}
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={() => handlePreviewQuestion(question)}
                      color="primary"
                      size="small"
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleEditQuestion(question)}
                      color="primary"
                      size="small"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDeleteQuestion(question.id)}
                      color="error"
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </StyledPaper>

      <Dialog
        open={showAddQuestion}
        onClose={() => setShowAddQuestion(false)}
        maxWidth="md"
        fullWidth
      >
        <AddQuestion
          initialData={selectedQuestion || undefined}
          onSubmit={handleQuestionSubmit}
        />
      </Dialog>

      <Dialog
        open={showPreview}
        onClose={() => setShowPreview(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedQuestion && (
          <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="h6">Question Preview</Typography>
              <Button
                variant="outlined"
                onClick={() => {
                  const printWindow = window.open('', '_blank');
                  if (printWindow) {
                    printWindow.document.write(`
                      <html>
                        <head>
                          <title>Question Preview</title>
                          <style>
                            body {
                              font-family: Arial, sans-serif;
                              line-height: 1.6;
                              padding: 20px;
                              max-width: 800px;
                              margin: 0 auto;
                            }
                            .header {
                              text-align: center;
                              margin-bottom: 20px;
                              padding-bottom: 10px;
                              border-bottom: 2px solid #ccc;
                            }
                            .question {
                              margin-bottom: 20px;
                            }
                            .options {
                              margin-left: 20px;
                            }
                            .option {
                              margin: 5px 0;
                            }
                            .correct {
                              color: #2e7d32;
                              font-weight: bold;
                            }
                            .metadata {
                              margin-top: 20px;
                              padding-top: 10px;
                              border-top: 1px solid #ccc;
                              font-size: 0.9em;
                              color: #666;
                            }
                            @media print {
                              body {
                                padding: 0;
                              }
                              button {
                                display: none;
                              }
                            }
                          </style>
                        </head>
                        <body>
                          <div class="header">
                            <h2>Question Details</h2>
                          </div>
                          <div class="question">
                            <div><strong>Question:</strong></div>
                            <div>${selectedQuestion.text}</div>
                          </div>
                          ${selectedQuestion.options ? `
                            <div class="options">
                              <div><strong>Options:</strong></div>
                              ${selectedQuestion.options.map(option => `
                                <div class="option ${option.isCorrect ? 'correct' : ''}">
                                  • ${option.text} ${option.isCorrect ? '(Correct)' : ''}
                                </div>
                              `).join('')}
                            </div>
                          ` : ''}
                          ${selectedQuestion.correctAnswer ? `
                            <div class="correct-answer">
                              <strong>Correct Answer:</strong> ${selectedQuestion.correctAnswer}
                            </div>
                          ` : ''}
                          <div class="explanation">
                            <strong>Explanation:</strong>
                            <div>${selectedQuestion.explanation}</div>
                          </div>
                          <div class="metadata">
                            <div><strong>Type:</strong> ${selectedQuestion.type}</div>
                            <div><strong>Subject:</strong> ${selectedQuestion.subject}</div>
                            <div><strong>Topic:</strong> ${selectedQuestion.topic}</div>
                            <div><strong>Difficulty:</strong> ${selectedQuestion.difficultyLevel}</div>
                            <div><strong>Tags:</strong> ${selectedQuestion.tags.join(', ')}</div>
                          </div>
                        </body>
                      </html>
                    `);
                    printWindow.document.close();
                    printWindow.print();
                  }
                }}
              >
                Print Preview
              </Button>
            </Box>
            <Typography variant="body1" paragraph>
              <div dangerouslySetInnerHTML={{ __html: selectedQuestion.text }} />
            </Typography>
            {selectedQuestion.options && (
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Options:
                </Typography>
                {selectedQuestion.options.map((option) => (
                  <Typography
                    key={option.id}
                    variant="body2"
                    sx={{
                      color: option.isCorrect ? 'success.main' : 'inherit',
                      ml: 2,
                    }}
                  >
                    • <span dangerouslySetInnerHTML={{ __html: option.text }} />
                    {option.isCorrect && ' (Correct)'}
                  </Typography>
                ))}
              </Box>
            )}
            {selectedQuestion.correctAnswer && (
              <Typography variant="body2" color="success.main" paragraph>
                Correct Answer: {selectedQuestion.correctAnswer}
              </Typography>
            )}
            <Typography variant="body2" paragraph>
              Explanation: <span dangerouslySetInnerHTML={{ __html: selectedQuestion.explanation }} />
            </Typography>
          </Box>
        )}
      </Dialog>
    </Box>
  );
};

export default QuestionBank;
