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
  Stack,
  Chip,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import {
  QuestionAnswer as QuestionIcon,
  Psychology as ThinkingIcon,
  School as AcademicIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';

const QuestionGenerator: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        AI Question Generator
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Generate thought-provoking questions from your content. Perfect for creating discussion topics, study guides, and exam preparation materials.
        </Typography>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <TextField
            label="Content"
            placeholder="Enter your text or topic here..."
            multiline
            rows={4}
          />
        </FormControl>

        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <FormControl sx={{ width: 200 }}>
            <InputLabel>Question Level</InputLabel>
            <Select
              label="Question Level"
              defaultValue="understanding"
            >
              <MenuItem value="knowledge">Knowledge</MenuItem>
              <MenuItem value="understanding">Understanding</MenuItem>
              <MenuItem value="application">Application</MenuItem>
              <MenuItem value="analysis">Analysis</MenuItem>
              <MenuItem value="synthesis">Synthesis</MenuItem>
              <MenuItem value="evaluation">Evaluation</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ width: 200 }}>
            <InputLabel>Question Style</InputLabel>
            <Select
              label="Question Style"
              defaultValue="open"
            >
              <MenuItem value="open">Open-ended</MenuItem>
              <MenuItem value="analytical">Analytical</MenuItem>
              <MenuItem value="critical">Critical Thinking</MenuItem>
              <MenuItem value="discussion">Discussion</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Number of Questions"
            type="number"
            defaultValue={5}
            size="small"
            sx={{ width: 150 }}
          />
        </Stack>

        <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
          <Chip icon={<ThinkingIcon />} label="Critical Thinking" color="primary" variant="outlined" />
          <Chip icon={<AcademicIcon />} label="Academic Focus" color="primary" variant="outlined" />
          <Chip icon={<AssignmentIcon />} label="Custom Format" color="primary" variant="outlined" />
        </Stack>

        <Button
          variant="contained"
          size="large"
          startIcon={<QuestionIcon />}
          sx={{
            background: 'linear-gradient(135deg, #6236a0 0%, #8a5cc6 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #734bb9 0%, #9c71d6 100%)',
            },
          }}
        >
          Generate Questions
        </Button>
      </Paper>

      {/* Example Output */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Generated Questions Preview
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <QuestionIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="How does the concept of sustainability relate to modern urban development?"
              secondary="Analysis Level | Critical Thinking"
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemIcon>
              <QuestionIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="What are the potential implications of artificial intelligence on future job markets?"
              secondary="Evaluation Level | Discussion"
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemIcon>
              <QuestionIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Compare and contrast the different approaches to renewable energy adoption across developed nations."
              secondary="Synthesis Level | Analytical"
            />
          </ListItem>
        </List>

        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" color="textSecondary">
            Pro tip: Use these questions to create engaging discussions or as starting points for deeper research.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default QuestionGenerator;
