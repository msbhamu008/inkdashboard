import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Paper,
  Typography,
  Autocomplete,
  Grid,
  FormControlLabel,
  Checkbox,
  IconButton,
  Slider,
  styled,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { v4 as uuidv4 } from 'uuid';
import {
  QuestionType,
  DifficultyLevel,
  QuestionFormData,
  Option,
} from '../../types/question';
import { availableTopics, SUBJECTS_BY_CLASS } from '../../data/mockData';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  backgroundColor: '#ffffff',
  borderRadius: theme.spacing(2),
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
}));

interface AddQuestionProps {
  initialData?: QuestionFormData;
  onSubmit: (data: QuestionFormData) => void;
}

interface FormErrors {
  type?: string;
  text?: string;
  options?: string;
  correctAnswer?: string;
  difficultyLevel?: string;
  topic?: string;
  subject?: string;
  explanation?: string;
}

const initialFormData: QuestionFormData = {
  type: QuestionType.MCQ,
  text: '',
  options: [],
  correctAnswer: '',
  difficultyLevel: DifficultyLevel.MEDIUM,
  topic: '',
  subject: '',
  tags: [],
  explanation: ''
};

const AddQuestion: React.FC<AddQuestionProps> = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState<QuestionFormData>(initialData || initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    if (!formData.text.trim()) {
      newErrors.text = 'Question text is required';
      isValid = false;
    }

    if (!formData.subject) {
      newErrors.subject = 'Subject is required';
      isValid = false;
    }

    if (!formData.topic) {
      newErrors.topic = 'Topic is required';
      isValid = false;
    }

    if (formData.type === QuestionType.MCQ) {
      if (!formData.options || formData.options.length < 2) {
        newErrors.options = 'At least 2 options are required';
        isValid = false;
      } else if (!formData.options.some(opt => opt.isCorrect)) {
        newErrors.options = 'Please mark at least one option as correct';
        isValid = false;
      }
    }

    if ((formData.type === QuestionType.TRUE_FALSE || 
         formData.type === QuestionType.FILL_BLANKS || 
         formData.type === QuestionType.SHORT_ANSWER) && 
        !formData.correctAnswer) {
      newErrors.correctAnswer = 'Correct answer is required';
      isValid = false;
    }

    if (!formData.explanation.trim()) {
      newErrors.explanation = 'Explanation is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleOptionChange = (optionId: string, field: keyof Option, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      options: prev.options?.map((opt) =>
        opt.id === optionId ? { ...opt, [field]: value } : opt
      ) || [],
    }));
  };

  const addOption = () => {
    setFormData((prev) => ({
      ...prev,
      options: [...(prev.options || []), { id: uuidv4(), text: '', isCorrect: false }],
    }));
  };

  const removeOption = (optionId: string) => {
    setFormData((prev) => ({
      ...prev,
      options: prev.options?.filter((opt) => opt.id !== optionId) || [],
    }));
  };

  const handleQuillChange = (value: string) => {
    setFormData((prev) => ({ ...prev, text: value }));
  };

  const handleExplanationChange = (value: string) => {
    setFormData((prev) => ({ ...prev, explanation: value }));
  };

  const renderQuestionTypeFields = () => {
    switch (formData.type) {
      case QuestionType.MCQ:
        return (
          <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Typography variant="subtitle1">Options</Typography>
              <Button
                startIcon={<AddIcon />}
                onClick={addOption}
                variant="outlined"
                color="primary"
              >
                Add Option
              </Button>
            </Box>
            {formData.options?.map((option) => (
              <Box
                key={option.id}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  mb: 2,
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={option.isCorrect}
                      onChange={(e) =>
                        handleOptionChange(option.id, 'isCorrect', e.target.checked)
                      }
                    />
                  }
                  label="Correct"
                />
                <TextField
                  fullWidth
                  value={option.text}
                  onChange={(e) => handleOptionChange(option.id, 'text', e.target.value)}
                  placeholder="Option text"
                />
                <IconButton
                  onClick={() => removeOption(option.id)}
                  color="error"
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))}
            {errors.options && (
              <Typography color="error" variant="caption">
                {errors.options}
              </Typography>
            )}
          </Box>
        );

      case QuestionType.TRUE_FALSE:
        return (
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Correct Answer</InputLabel>
            <Select
              value={formData.correctAnswer}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, correctAnswer: e.target.value }))
              }
              label="Correct Answer"
            >
              <MenuItem value="true">True</MenuItem>
              <MenuItem value="false">False</MenuItem>
            </Select>
            {errors.correctAnswer && (
              <Typography color="error" variant="caption">
                {errors.correctAnswer}
              </Typography>
            )}
          </FormControl>
        );

      case QuestionType.FILL_BLANKS:
      case QuestionType.SHORT_ANSWER:
        return (
          <TextField
            fullWidth
            label="Correct Answer"
            value={formData.correctAnswer}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, correctAnswer: e.target.value }))
            }
            sx={{ mb: 2 }}
          />
        );

      default:
        return null;
    }
  };

  return (
    <StyledPaper>
      <Typography variant="h5" gutterBottom>
        {initialData ? 'Edit Question' : 'Add New Question'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Question Type</InputLabel>
              <Select
                value={formData.type}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    type: e.target.value as QuestionType,
                    options: [],
                    correctAnswer: '',
                  }))
                }
                label="Question Type"
              >
                {Object.values(QuestionType).map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Subject</InputLabel>
              <Select
                value={formData.subject}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    subject: e.target.value as string,
                    topic: '',
                  }))
                }
                label="Subject"
              >
                {Object.values(SUBJECTS_BY_CLASS).flat().map((subject) => (
                  <MenuItem key={subject} value={subject}>
                    {subject}
                  </MenuItem>
                ))}
              </Select>
              {errors.subject && (
                <Typography color="error" variant="caption">
                  {errors.subject}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <ReactQuill
              theme="snow"
              value={formData.text}
              onChange={handleQuillChange}
              modules={{
                toolbar: [
                  [{ 'header': [1, 2, false] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                  ['link', 'image', 'formula'],
                  ['clean']
                ],
              }}
              style={{ height: '200px', marginBottom: '50px' }}
            />
            {errors.text && (
              <Typography color="error" variant="caption">
                {errors.text}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            {renderQuestionTypeFields()}
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Topic</InputLabel>
              <Select
                value={formData.topic}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, topic: e.target.value as string }))
                }
                label="Topic"
                disabled={!formData.subject}
              >
                {availableTopics.map((topic) => (
                  <MenuItem key={topic.id} value={topic.name}>
                    {topic.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.topic && (
                <Typography color="error" variant="caption">
                  {errors.topic}
                </Typography>
              )}
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Box sx={{ width: '100%' }}>
              <Typography gutterBottom>Difficulty Level</Typography>
              <Slider
                value={Object.values(DifficultyLevel).indexOf(formData.difficultyLevel)}
                onChange={(_, value) =>
                  setFormData((prev) => ({
                    ...prev,
                    difficultyLevel: Object.values(DifficultyLevel)[value as number],
                  }))
                }
                step={1}
                marks
                min={0}
                max={2}
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => Object.values(DifficultyLevel)[value]}
              />
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Autocomplete
              multiple
              freeSolo
              value={formData.tags}
              onChange={(_, newValue) =>
                setFormData((prev) => ({ ...prev, tags: newValue }))
              }
              options={[]}
              renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                  <Chip
                    label={option}
                    {...getTagProps({ index })}
                    sx={{
                      bgcolor: '#150b2e',
                      color: '#fff',
                      '& .MuiChip-deleteIcon': {
                        color: '#fff',
                        '&:hover': {
                          color: '#ff4d4f',
                        },
                      },
                    }}
                  />
                ))
              }
              renderInput={(params) => (
                <TextField {...params} label="Tags" placeholder="Add tags" />
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <ReactQuill
              theme="snow"
              value={formData.explanation}
              onChange={handleExplanationChange}
              modules={{
                toolbar: [
                  [{ 'header': [1, 2, false] }],
                  ['bold', 'italic', 'underline'],
                  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                  ['link'],
                  ['clean']
                ],
              }}
              style={{ height: '150px', marginBottom: '50px' }}
            />
            {errors.explanation && (
              <Typography color="error" variant="caption">
                {errors.explanation}
              </Typography>
            )}
          </Grid>

          <Grid item xs={12}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => {
                  const fileInput = document.createElement('input');
                  fileInput.type = 'file';
                  fileInput.accept = '.json';
                  fileInput.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (e) => {
                        try {
                          const importedData = JSON.parse(e.target?.result as string);
                          setFormData(importedData);
                        } catch (error) {
                          console.error('Error importing question:', error);
                        }
                      };
                      reader.readAsText(file);
                    }
                  };
                  fileInput.click();
                }}
              >
                Import Question
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  const dataStr = JSON.stringify(formData, null, 2);
                  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
                  const exportFileDefaultName = `question_${new Date().getTime()}.json`;
                  const linkElement = document.createElement('a');
                  linkElement.setAttribute('href', dataUri);
                  linkElement.setAttribute('download', exportFileDefaultName);
                  linkElement.click();
                }}
              >
                Export Question
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{
                  bgcolor: '#150b2e',
                  '&:hover': {
                    bgcolor: '#2a1758',
                  },
                }}
              >
                {initialData ? 'Update Question' : 'Add Question'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </StyledPaper>
  );
};

export default AddQuestion;
