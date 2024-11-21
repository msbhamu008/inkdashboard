import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Slider,
  Alert,
  styled,
  Checkbox,
  FormGroup,
  Autocomplete,
  Chip,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
} from '@mui/material';
import {
  Close as CloseIcon,
  Description as DescriptionIcon,
  Refresh as RefreshIcon,
  Preview as PreviewIcon,
  Save as SaveIcon
} from '@mui/icons-material';
import {
  ExamType,
  Board,
  Class,
  PaperType,
  DifficultyLevel,
  SpecificExamType,
  SUBJECTS_BY_CLASS,
  TopicWeightage,
  PaperConfig,
  CustomDifficulty,
  QuestionType,
} from '../../types/paper';
import { availableTopics } from '../../data/mockData';
import { generatePaperInstructions } from '../../utils/instructionGenerator';

interface FormErrors {
  examType?: string;
  board?: string;
  class?: string;
  subject?: string;
  totalMarks?: string;
  totalQuestions?: string;
  duration?: string;
  paperType?: string;
  questionDistribution?: string;
  difficultyLevel?: string;
  customDifficulty?: string;
  topics?: string;
  topicWeightage?: string;
  title?: string;
  instructions?: string;
}

interface Topic {
  id: string;
  name: string;
  subject: string;
}

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  height: '100%',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
  borderRadius: theme.spacing(1),
  overflow: 'auto',
  maxHeight: 'calc(100vh - 140px)',
}));

const StyledStepper = styled(Stepper)(({ theme }) => ({
  '.MuiStepLabel-root': {
    padding: theme.spacing(2, 0),
  },
  '.MuiStepContent-root': {
    borderLeft: `2px solid ${theme.palette.grey[300]}`,
    marginLeft: theme.spacing(2.5),
    paddingLeft: theme.spacing(3),
  },
  '.MuiStepLabel-label': {
    fontWeight: 500,
    '&.Mui-active': {
      color: '#6a1b9a',
      fontWeight: 600,
    },
    '&.Mui-completed': {
      color: '#8e24aa',
    },
  },
  '.MuiStepIcon-root': {
    '&.Mui-active': {
      color: '#6a1b9a',
    },
    '&.Mui-completed': {
      color: '#8e24aa',
    },
  },
}));

const steps = [
  {
    label: 'Basic Information',
    description: 'Select exam type, subject, and topics',
  },
  {
    label: 'Paper Details',
    description: 'Set marks, questions, and duration',
  },
  {
    label: 'Question Types',
    description: 'Select question types and distribution',
  },
  {
    label: 'Difficulty Level',
    description: 'Set the difficulty distribution',
  },
  {
    label: 'Final Details',
    description: 'Add title and instructions',
  },
];

const examTypeOptions = [
  { value: ExamType.School, label: 'School Exam' },
  { value: ExamType.Entrance, label: 'Entrance Exam' },
  { value: ExamType.SchoolEntrance, label: 'School Entrance Exam' },
  { value: ExamType.Olympiads, label: 'Olympiads' }
];

const difficultyOptions = [
  { value: DifficultyLevel.Easy, label: 'Easy' },
  { value: DifficultyLevel.Moderate, label: 'Moderate' },
  { value: DifficultyLevel.Hard, label: 'Hard' },
  { value: DifficultyLevel.Random, label: 'Random' },
  { value: DifficultyLevel.Custom, label: 'Custom' }
];

const boardOptions = [
  { value: Board.CBSE, label: 'CBSE' },
  { value: Board.ICSE, label: 'ICSE' },
  { value: Board.StateBoard, label: 'State Board' }
];

const classOptions = [
  { value: Class.Class5, label: 'Class 5' },
  { value: Class.Class6, label: 'Class 6' },
  { value: Class.Class7, label: 'Class 7' },
  { value: Class.Class8, label: 'Class 8' },
  { value: Class.Class9, label: 'Class 9' },
  { value: Class.Class10, label: 'Class 10' },
  { value: Class.Class11, label: 'Class 11' },
  { value: Class.Class12, label: 'Class 12' }
];

const questionTypeOptions = [
  { value: QuestionType.TrueFalse, label: 'True/False', defaultMarks: 1 },
  { value: QuestionType.MCQ, label: 'Multiple Choice', defaultMarks: 1 },
  { value: QuestionType.FillInBlanks, label: 'Fill in the Blanks', defaultMarks: 1 },
  { value: QuestionType.ShortAnswer, label: 'Short Answer', defaultMarks: 3 },
  { value: QuestionType.LongAnswer, label: 'Long Answer', defaultMarks: 5 },
];

const initialConfig: PaperConfig = {
  examType: ExamType.School,
  specificExamType: SpecificExamType.UnitTest,
  paperType: PaperType.Mixed,
  difficultyLevel: DifficultyLevel.Moderate,
  customDifficulty: {
    easy: 30,
    moderate: 40,
    hard: 30
  },
  questionTypes: [],
  title: '',
  totalMarks: 0,
  totalQuestions: 0,
  duration: 180,
  instructions: '',
  selectedTopics: []
};

const PaperGenerationForm: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [config, setConfig] = useState<PaperConfig>(initialConfig);

  const [isCustomDifficulty, setIsCustomDifficulty] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPreview, setShowPreview] = useState(false);

  useEffect(() => {
    if (config.questionTypes.length > 0) {
      const generatedInstructions = generatePaperInstructions(config.questionTypes);
      setConfig(prev => ({
        ...prev,
        instructions: generatedInstructions
      }));
    }
  }, [config.questionTypes]);

  const convertToTopic = (weightage: TopicWeightage): Topic => ({
    id: weightage.topicId,
    name: weightage.name,
    subject: config.subject || ''
  });

  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {};

    switch (step) {
      case 0:
        if (!config.examType) newErrors.examType = 'Please select an exam type';
        if (config.examType === ExamType.School) {
          if (!config.board) newErrors.board = 'Please select a board';
          if (!config.class) newErrors.class = 'Please select a class';
          if (!config.subject) newErrors.subject = 'Please select a subject';
        }
        break;

      case 1:
        if (!config.totalMarks) newErrors.totalMarks = 'Please enter total marks';
        if (!config.totalQuestions) newErrors.totalQuestions = 'Please enter total questions';
        if (!config.duration) newErrors.duration = 'Please enter duration';
        break;

      case 2:
        if (config.questionTypes.reduce((sum, qt) => sum + qt.quantity, 0) !== config.totalQuestions) {
          newErrors.questionDistribution = `Total questions must equal ${config.totalQuestions}`;
        }
        const totalCalculatedMarks = config.questionTypes.reduce((sum, qt) => sum + (qt.quantity * qt.marks), 0);
        if (totalCalculatedMarks !== config.totalMarks) {
          newErrors.questionDistribution = `${newErrors.questionDistribution || ''} Total marks must equal ${config.totalMarks}`;
        }
        break;

      case 3:
        if (!config.difficultyLevel) newErrors.difficultyLevel = 'Please select a difficulty level';
        if (isCustomDifficulty) {
          const total = Object.values(config.customDifficulty).reduce((sum, val) => sum + val, 0);
          if (total !== 100) {
            newErrors.customDifficulty = 'Difficulty percentages must add up to 100%';
          }
        }
        break;

      case 4:
        if (!config.title) newErrors.title = 'Please enter a title';
        if (!config.instructions) newErrors.instructions = 'Please enter instructions';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
    setErrors({});
  };

  const handleCustomDifficultyChange = (type: keyof CustomDifficulty, value: number) => {
    setConfig((prev) => ({
      ...prev,
      customDifficulty: {
        ...prev.customDifficulty,
        [type]: value,
      },
    }));
  };

  const getTopicsForSubject = (subject: string) => {
    return availableTopics.filter(topic => topic.subject === subject);
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.examType}>
                <InputLabel>Exam Type</InputLabel>
                <Select
                  value={config.examType}
                  label="Exam Type"
                  onChange={(e) => setConfig((prev) => ({ ...prev, examType: e.target.value as ExamType }))}
                >
                  {examTypeOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {errors.examType && <FormHelperText>{errors.examType}</FormHelperText>}
              </FormControl>
            </Grid>
            {config.examType === ExamType.School && (
              <>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={!!errors.board}>
                    <InputLabel>Board</InputLabel>
                    <Select
                      value={config.board || ''}
                      label="Board"
                      onChange={(e) => setConfig((prev) => ({ ...prev, board: e.target.value as Board }))}
                    >
                      {boardOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.board && <FormHelperText>{errors.board}</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={!!errors.class}>
                    <InputLabel>Class</InputLabel>
                    <Select
                      value={config.class || ''}
                      label="Class"
                      onChange={(e) => {
                        const selectedClass = e.target.value as Class;
                        setConfig((prev) => ({
                          ...prev,
                          class: selectedClass,
                          subject: undefined,
                          selectedTopics: [], // Reset topics when class changes
                        }));
                      }}
                    >
                      {classOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors.class && <FormHelperText>{errors.class}</FormHelperText>}
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth error={!!errors.subject}>
                    <InputLabel>Subject</InputLabel>
                    <Select
                      value={config.subject || ''}
                      label="Subject"
                      onChange={(e) => {
                        const selectedSubject = e.target.value;
                        // Get topics for the selected subject
                        const subjectTopics = getTopicsForSubject(selectedSubject);
                        setConfig((prev) => ({
                          ...prev,
                          subject: selectedSubject,
                          // Auto-select all topics by default
                          selectedTopics: subjectTopics.map(topic => ({
                            topicId: topic.id,
                            name: topic.name,
                            weightage: Math.floor(100 / subjectTopics.length),
                            questionCount: 0
                          }))
                        }));
                      }}
                      disabled={!config.class}
                    >
                      {config.class &&
                        SUBJECTS_BY_CLASS[config.class].map((subject) => (
                          <MenuItem key={subject} value={subject}>
                            {subject}
                          </MenuItem>
                        ))}
                    </Select>
                    {errors.subject && <FormHelperText>{errors.subject}</FormHelperText>}
                  </FormControl>
                </Grid>
                {config.subject && (
                  <Grid item xs={12}>
                    <Autocomplete<Topic, true>
                      multiple
                      value={config.selectedTopics.map(convertToTopic)}
                      options={getTopicsForSubject(config.subject || '')}
                      getOptionLabel={(option) => option.name}
                      isOptionEqualToValue={(option, value) => option.id === value.id}
                      onChange={(_, newValue) => {
                        setConfig((prev) => ({
                          ...prev,
                          selectedTopics: newValue.map(topic => ({
                            topicId: topic.id,
                            name: topic.name,
                            weightage: Math.floor(100 / newValue.length),
                            questionCount: Math.floor(prev.totalQuestions / newValue.length)
                          }))
                        }));
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Topics"
                          error={!!errors.topics}
                          helperText={errors.topics}
                        />
                      )}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            label={option.name}
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
                    />
                  </Grid>
                )}
              </>
            )}
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Total Marks"
                type="number"
                value={config.totalMarks || ''}
                onChange={(e) => setConfig((prev) => ({ ...prev, totalMarks: Number(e.target.value) }))}
                error={!!errors.totalMarks}
                helperText={errors.totalMarks}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Total Questions"
                type="number"
                value={config.totalQuestions || ''}
                onChange={(e) => setConfig((prev) => ({ ...prev, totalQuestions: Number(e.target.value) }))}
                error={!!errors.totalQuestions}
                helperText={errors.totalQuestions}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Duration (minutes)"
                type="number"
                value={config.duration || ''}
                onChange={(e) => setConfig((prev) => ({ ...prev, duration: Number(e.target.value) }))}
                error={!!errors.duration}
                helperText={errors.duration}
              />
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Select Question Types and Distribution
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <FormControl fullWidth error={!!errors.questionDistribution}>
                  <FormGroup>
                    {questionTypeOptions.map((option) => (
                      <Box key={option.value} sx={{ mb: 2 }}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={config.questionTypes.some(qt => qt.type === option.value)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setConfig(prev => ({
                                    ...prev,
                                    questionTypes: [
                                      ...prev.questionTypes,
                                      {
                                        type: option.value,
                                        quantity: 0,
                                        marks: option.defaultMarks
                                      }
                                    ]
                                  }));
                                } else {
                                  setConfig(prev => ({
                                    ...prev,
                                    questionTypes: prev.questionTypes.filter(qt => qt.type !== option.value)
                                  }));
                                }
                              }}
                            />
                          }
                          label={option.label}
                        />
                        {config.questionTypes.some(qt => qt.type === option.value) && (
                          <Grid container spacing={2} sx={{ ml: 3, mt: 1 }}>
                            <Grid item xs={6}>
                              <TextField
                                fullWidth
                                size="small"
                                label="Number of Questions"
                                type="number"
                                value={config.questionTypes.find(qt => qt.type === option.value)?.quantity || 0}
                                onChange={(e) => {
                                  const value = Number(e.target.value);
                                  setConfig(prev => ({
                                    ...prev,
                                    questionTypes: prev.questionTypes.map(qt =>
                                      qt.type === option.value
                                        ? { ...qt, quantity: value }
                                        : qt
                                    )
                                  }));
                                }}
                                InputProps={{
                                  inputProps: { min: 0 }
                                }}
                              />
                            </Grid>
                            <Grid item xs={6}>
                              <TextField
                                fullWidth
                                size="small"
                                label="Marks per Question"
                                type="number"
                                value={config.questionTypes.find(qt => qt.type === option.value)?.marks || option.defaultMarks}
                                onChange={(e) => {
                                  const value = Number(e.target.value);
                                  setConfig(prev => ({
                                    ...prev,
                                    questionTypes: prev.questionTypes.map(qt =>
                                      qt.type === option.value
                                        ? { ...qt, marks: value }
                                        : qt
                                    )
                                  }));
                                }}
                                InputProps={{
                                  inputProps: { min: 1 }
                                }}
                              />
                            </Grid>
                          </Grid>
                        )}
                      </Box>
                    ))}
                  </FormGroup>
                  {errors.questionDistribution && (
                    <FormHelperText error>{errors.questionDistribution}</FormHelperText>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Box sx={{ mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Summary
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography color="text.secondary">
                        Total Questions: {config.questionTypes.reduce((sum, qt) => sum + qt.quantity, 0)} / {config.totalQuestions}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography color="text.secondary">
                        Total Marks: {config.questionTypes.reduce((sum, qt) => sum + (qt.quantity * qt.marks), 0)} / {config.totalMarks}
                      </Typography>
                    </Grid>
                  </Grid>
                  {(config.questionTypes.reduce((sum, qt) => sum + qt.quantity, 0) !== config.totalQuestions ||
                    config.questionTypes.reduce((sum, qt) => sum + (qt.quantity * qt.marks), 0) !== config.totalMarks) && (
                    <Alert severity="warning" sx={{ mt: 2 }}>
                      {config.questionTypes.reduce((sum, qt) => sum + qt.quantity, 0) !== config.totalQuestions && 
                        `Total questions must equal ${config.totalQuestions}. `}
                      {config.questionTypes.reduce((sum, qt) => sum + (qt.quantity * qt.marks), 0) !== config.totalMarks && 
                        `Total marks must equal ${config.totalMarks}.`}
                    </Alert>
                  )}
                </Box>
              </Grid>
            </Grid>
          </Box>
        );

      case 3:
        return (
          <Box>
            <Typography variant="subtitle1" gutterBottom>
              Set Difficulty Level Distribution
            </Typography>
            <FormControl fullWidth sx={{ mb: 3 }} error={!!errors.difficultyLevel}>
              <InputLabel>Difficulty Level</InputLabel>
              <Select
                value={config.difficultyLevel}
                label="Difficulty Level"
                onChange={(e) => {
                  setConfig((prev) => ({ ...prev, difficultyLevel: e.target.value as DifficultyLevel }));
                  setIsCustomDifficulty(e.target.value === DifficultyLevel.Custom);
                }}
              >
                {difficultyOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              {errors.difficultyLevel && <FormHelperText>{errors.difficultyLevel}</FormHelperText>}
            </FormControl>

            {isCustomDifficulty && (
              <Box sx={{ mt: 2 }}>
                <Typography gutterBottom>Easy Questions (%)</Typography>
                <Slider
                  value={config.customDifficulty.easy}
                  onChange={(_, value) => handleCustomDifficultyChange('easy', value as number)}
                  valueLabelDisplay="auto"
                  sx={{ color: '#6a1b9a' }}
                />
                <Typography gutterBottom>Moderate Questions (%)</Typography>
                <Slider
                  value={config.customDifficulty.moderate}
                  onChange={(_, value) => handleCustomDifficultyChange('moderate', value as number)}
                  valueLabelDisplay="auto"
                  sx={{ color: '#6a1b9a' }}
                />
                <Typography gutterBottom>Hard Questions (%)</Typography>
                <Slider
                  value={config.customDifficulty.hard}
                  onChange={(_, value) => handleCustomDifficultyChange('hard', value as number)}
                  valueLabelDisplay="auto"
                  sx={{ color: '#6a1b9a' }}
                />
                {errors.customDifficulty && (
                  <Alert severity="error" sx={{ mt: 2 }}>
                    {errors.customDifficulty}
                  </Alert>
                )}
              </Box>
            )}
          </Box>
        );

      case 4:
        return (
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Paper Title"
                  value={config.title}
                  onChange={(e) => setConfig((prev) => ({ ...prev, title: e.target.value }))}
                  error={!!errors.title}
                  helperText={errors.title}
                />
              </Grid>

              <Grid item xs={12}>
                <Paper sx={{ p: 3, bgcolor: '#f5f5f5' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="subtitle1" fontWeight="medium">
                      Paper Instructions
                    </Typography>
                    <Button
                      size="small"
                      startIcon={<RefreshIcon />}
                      onClick={() => {
                        const generatedInstructions = generatePaperInstructions(config.questionTypes);
                        setConfig(prev => ({
                          ...prev,
                          instructions: generatedInstructions
                        }));
                      }}
                    >
                      Regenerate
                    </Button>
                  </Box>

                  {/* Section Information */}
                  <Box sx={{ mb: 2 }}>
                    <TextField
                      fullWidth
                      multiline
                      variant="outlined"
                      value={config.instructions}
                      onChange={(e) => setConfig(prev => ({
                        ...prev,
                        instructions: e.target.value
                      }))}
                      InputProps={{
                        sx: {
                          fontFamily: 'monospace',
                          fontSize: '0.875rem',
                          lineHeight: 1.6,
                          '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: 'rgba(0, 0, 0, 0.12)'
                          }
                        }
                      }}
                      sx={{
                        '& .MuiInputBase-root': {
                          backgroundColor: '#ffffff'
                        }
                      }}
                    />
                  </Box>

                  {/* Helper Text */}
                  <Typography variant="caption" color="text.secondary">
                    These instructions will be displayed at the beginning of the question paper. The instructions are automatically generated based on your question distribution but can be modified as needed.
                  </Typography>
                </Paper>
              </Grid>
            </Grid>
          </Box>
        );

      default:
        return null;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Final Paper Configuration:', config);
    // TODO: Add API call to generate paper
  };

  const renderPreviewAdditionalDetails = () => (
    <Grid item xs={12}>
      <Paper sx={{ p: 3, bgcolor: '#f5f5f5', borderRadius: 1 }}>
        <Typography variant="h6" gutterBottom>
          Additional Details
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Duration
            </Typography>
            <Typography>
              {config.duration} minutes
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Total Questions
            </Typography>
            <Typography>
              {config.totalQuestions}
            </Typography>
          </Box>
          <Box>
            <Typography variant="subtitle2" color="text.secondary">
              Total Marks
            </Typography>
            <Typography>
              {config.totalMarks}
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" color="text.secondary" gutterBottom>
            Instructions
          </Typography>
          <Typography
            sx={{
              whiteSpace: 'pre-wrap',
              fontFamily: 'monospace',
              fontSize: '0.875rem',
              lineHeight: 1.6,
              bgcolor: '#ffffff',
              p: 2,
              borderRadius: 1,
              border: '1px solid rgba(0, 0, 0, 0.12)'
            }}
          >
            {config.instructions}
          </Typography>
        </Box>
      </Paper>
    </Grid>
  );

  const renderPreviewContent = () => (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={3}>
        {renderPreviewAdditionalDetails()}
        <Grid item xs={12}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 2, 
              bgcolor: '#f8f9fa',
              borderRadius: 2
            }}
          >
            <Typography variant="h6" gutterBottom color="primary">
              Basic Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Exam Type
                  </Typography>
                  <Typography variant="body1">
                    {examTypeOptions.find(opt => opt.value === config.examType)?.label}
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Board
                  </Typography>
                  <Typography variant="body1">
                    {boardOptions.find(opt => opt.value === config.board)?.label}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Class
                  </Typography>
                  <Typography variant="body1">
                    {classOptions.find(opt => opt.value === config.class)?.label}
                  </Typography>
                </Box>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Subject
                  </Typography>
                  <Typography variant="body1">
                    {config.subject}
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 2, 
              bgcolor: '#f8f9fa',
              borderRadius: 2
            }}
          >
            <Typography variant="h6" gutterBottom color="primary">
              Paper Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Total Marks
                  </Typography>
                  <Typography variant="body1">
                    {config.totalMarks}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Total Questions
                  </Typography>
                  <Typography variant="body1">
                    {config.totalQuestions}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Duration
                  </Typography>
                  <Typography variant="body1">
                    {config.duration} minutes
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 2, 
              bgcolor: '#f8f9fa',
              borderRadius: 2
            }}
          >
            <Typography variant="h6" gutterBottom color="primary">
              Additional Details
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Duration
                </Typography>
                <Typography>
                  {config.duration} minutes
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Total Questions
                </Typography>
                <Typography>
                  {config.totalQuestions}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Total Marks
                </Typography>
                <Typography>
                  {config.totalMarks}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 2, 
              bgcolor: '#f8f9fa',
              borderRadius: 2
            }}
          >
            <Typography variant="h6" gutterBottom color="primary">
              Question Distribution
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Question Type</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Marks per Question</TableCell>
                    <TableCell align="right">Total Marks</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {config.questionTypes
                    .filter((type) => type.quantity > 0)
                    .map((type) => (
                      <TableRow key={type.type}>
                        <TableCell>{questionTypeOptions.find(opt => opt.value === type.type)?.label}</TableCell>
                        <TableCell align="right">{type.quantity}</TableCell>
                        <TableCell align="right">{type.marks}</TableCell>
                        <TableCell align="right">{type.quantity * type.marks}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 2, 
              bgcolor: '#f8f9fa',
              borderRadius: 2
            }}
          >
            <Typography variant="h6" gutterBottom color="primary">
              Difficulty Level
            </Typography>
            {config.difficultyLevel === DifficultyLevel.Custom ? (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Easy
                  </Typography>
                  <Typography>
                    {config.customDifficulty.easy}%
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Moderate
                  </Typography>
                  <Typography>
                    {config.customDifficulty.moderate}%
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    Hard
                  </Typography>
                  <Typography>
                    {config.customDifficulty.hard}%
                  </Typography>
                </Box>
              </Box>
            ) : (
              <Typography>
                {difficultyOptions.find(opt => opt.value === config.difficultyLevel)?.label}
              </Typography>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 2, 
              bgcolor: '#f8f9fa',
              borderRadius: 2
            }}
          >
            <Typography variant="h6" gutterBottom color="primary">
              Additional Details
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" color="text.secondary">
                Title
              </Typography>
              <Typography variant="body1">
                {config.title}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <StyledPaper>
      <Typography variant="h5" gutterBottom sx={{ color: '#6a1b9a', mb: 4 }}>
        Generate Question Paper
      </Typography>

      <StyledStepper activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                <Typography variant="caption" color="text.secondary">
                  {step.description}
                </Typography>
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Box sx={{ mt: 2, mb: 1 }}>
                {renderStepContent(index)}
              </Box>
              <Box sx={{ mb: 2, mt: 3, display: 'flex', gap: 2 }}>
                {index !== 0 && (
                  <Button
                    onClick={handleBack}
                    variant="outlined"
                    sx={{
                      borderColor: '#6a1b9a',
                      color: '#6a1b9a',
                      '&:hover': {
                        borderColor: '#8e24aa',
                        backgroundColor: 'rgba(106, 27, 154, 0.04)',
                      },
                    }}
                    startIcon={<CloseIcon />}
                  >
                    Back
                  </Button>
                )}
                <Box sx={{ flex: 1 }} />
                {index === steps.length - 1 && (
                  <Button
                    onClick={() => setShowPreview(true)}
                    variant="outlined"
                    sx={{
                      borderColor: '#6a1b9a',
                      color: '#6a1b9a',
                      '&:hover': {
                        borderColor: '#8e24aa',
                        backgroundColor: 'rgba(106, 27, 154, 0.04)',
                      },
                    }}
                    startIcon={<PreviewIcon />}
                  >
                    Preview Paper
                  </Button>
                )}
                <Button
                  variant="contained"
                  onClick={index === steps.length - 1 ? handleSubmit : handleNext}
                  sx={{
                    bgcolor: '#6a1b9a',
                    '&:hover': {
                      bgcolor: '#8e24aa',
                    },
                  }}
                  startIcon={index === steps.length - 1 ? <SaveIcon /> : undefined}
                >
                  {index === steps.length - 1 ? 'Generate Paper' : 'Continue'}
                </Button>
              </Box>
            </StepContent>
          </Step>
        ))}
      </StyledStepper>

      {activeStep === steps.length && (
        <Box sx={{ pt: 3, pb: 1 }}>
          <Alert severity="success" sx={{ mb: 3 }}>
            Paper configuration completed successfully!
          </Alert>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              onClick={() => setActiveStep(0)}
              variant="outlined"
              sx={{
                borderColor: '#6a1b9a',
                color: '#6a1b9a',
                '&:hover': {
                  borderColor: '#8e24aa',
                  backgroundColor: 'rgba(106, 27, 154, 0.04)',
                },
              }}
              startIcon={<CloseIcon />}
            >
              Create New Paper
            </Button>
            <Button
              onClick={() => setShowPreview(true)}
              variant="contained"
              sx={{
                bgcolor: '#6a1b9a',
                '&:hover': {
                  bgcolor: '#8e24aa',
                },
              }}
              startIcon={<PreviewIcon />}
            >
              View Configuration
            </Button>
          </Box>
        </Box>
      )}
      <Dialog
        open={showPreview}
        onClose={() => setShowPreview(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            bgcolor: '#fff',
          }
        }}
      >
        <DialogTitle 
          sx={{ 
            bgcolor: '#150b2e',
            color: '#fff',
            py: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DescriptionIcon sx={{ fontSize: 28 }} />
            <Typography variant="h6">Paper Configuration Preview</Typography>
          </Box>
          <IconButton 
            onClick={() => setShowPreview(false)}
            sx={{ 
              color: 'rgba(255, 255, 255, 0.7)',
              '&:hover': { color: '#fff' }
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          {renderPreviewContent()}
        </DialogContent>
        <DialogActions sx={{ p: 3, bgcolor: '#f8f9fa', borderTop: '1px solid rgba(0, 0, 0, 0.12)' }}>
          <Button 
            onClick={() => setShowPreview(false)}
            variant="outlined"
            color="primary"
            startIcon={<CloseIcon />}
          >
            Close
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            startIcon={<SaveIcon />}
          >
            Generate Paper
          </Button>
        </DialogActions>
      </Dialog>
    </StyledPaper>
  );
};

export default PaperGenerationForm;
