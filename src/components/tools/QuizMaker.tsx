import React from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Stack,
} from '@mui/material';
import { Quiz as QuizIcon } from '@mui/icons-material';

const QuizMaker: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        AI Quiz Maker
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Create engaging quizzes automatically using AI. Input your content or topic, and let our AI generate relevant questions.
        </Typography>
        
        <FormControl fullWidth sx={{ mb: 3 }}>
          <TextField
            label="Topic or Subject"
            placeholder="Enter the main topic or subject for the quiz..."
            multiline
            rows={2}
          />
        </FormControl>

        <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
          <FormControl sx={{ width: 200 }}>
            <InputLabel>Question Type</InputLabel>
            <Select
              label="Question Type"
              defaultValue="multiple"
            >
              <MenuItem value="multiple">Multiple Choice</MenuItem>
              <MenuItem value="truefalse">True/False</MenuItem>
              <MenuItem value="short">Short Answer</MenuItem>
              <MenuItem value="mixed">Mixed</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ width: 150 }}>
            <TextField
              label="Number of Questions"
              type="number"
              defaultValue={10}
              size="small"
            />
          </FormControl>

          <FormControl sx={{ width: 200 }}>
            <InputLabel>Difficulty</InputLabel>
            <Select
              label="Difficulty"
              defaultValue="medium"
            >
              <MenuItem value="easy">Easy</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="hard">Hard</MenuItem>
              <MenuItem value="mixed">Mixed</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
          <Chip label="Add Explanations" color="primary" variant="outlined" />
          <Chip label="Include Images" color="primary" variant="outlined" />
          <Chip label="Time Limits" color="primary" variant="outlined" />
        </Stack>

        <Button
          variant="contained"
          size="large"
          startIcon={<QuizIcon />}
          sx={{
            background: 'linear-gradient(135deg, #6236a0 0%, #8a5cc6 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #734bb9 0%, #9c71d6 100%)',
            },
          }}
        >
          Generate Quiz
        </Button>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Advanced Options
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            label="Time per Question (seconds)"
            type="number"
            defaultValue={60}
            size="small"
            sx={{ width: 200 }}
          />
          <TextField
            label="Pass Percentage"
            type="number"
            defaultValue={70}
            size="small"
            sx={{ width: 200 }}
          />
          <TextField
            label="Tags"
            placeholder="Add tags..."
            size="small"
            sx={{ width: 200 }}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default QuizMaker;
