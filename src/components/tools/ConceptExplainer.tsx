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
  Card,
  CardContent,
  LinearProgress,
} from '@mui/material';
import {
  Lightbulb as ConceptIcon,
  Psychology as BrainIcon,
  School as EducationIcon,
  AutoGraph as LevelIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material';

const ConceptExplainer: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        AI Concept Explainer
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Get clear, concise explanations for complex concepts. Our AI breaks down difficult topics into easily understandable components.
        </Typography>

        <FormControl fullWidth sx={{ mb: 3 }}>
          <TextField
            label="Concept or Topic"
            placeholder="Enter the concept you want to understand..."
            multiline
            rows={2}
          />
        </FormControl>

        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <FormControl sx={{ width: 200 }}>
            <InputLabel>Explanation Level</InputLabel>
            <Select
              label="Explanation Level"
              defaultValue="intermediate"
            >
              <MenuItem value="beginner">Beginner</MenuItem>
              <MenuItem value="intermediate">Intermediate</MenuItem>
              <MenuItem value="advanced">Advanced</MenuItem>
              <MenuItem value="expert">Expert</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ width: 200 }}>
            <InputLabel>Learning Style</InputLabel>
            <Select
              label="Learning Style"
              defaultValue="visual"
            >
              <MenuItem value="visual">Visual</MenuItem>
              <MenuItem value="verbal">Verbal</MenuItem>
              <MenuItem value="logical">Logical</MenuItem>
              <MenuItem value="practical">Practical</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
          <Chip icon={<BrainIcon />} label="Analogies" color="primary" variant="outlined" />
          <Chip icon={<TimelineIcon />} label="Step-by-Step" color="primary" variant="outlined" />
          <Chip icon={<EducationIcon />} label="Examples" color="primary" variant="outlined" />
        </Stack>

        <Button
          variant="contained"
          size="large"
          startIcon={<ConceptIcon />}
          sx={{
            background: 'linear-gradient(135deg, #6236a0 0%, #8a5cc6 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #734bb9 0%, #9c71d6 100%)',
            },
          }}
        >
          Explain Concept
        </Button>
      </Paper>

      {/* Example Explanation */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Explanation Preview
        </Typography>
        
        <Card sx={{ mb: 3, bgcolor: 'rgba(98, 54, 160, 0.03)' }}>
          <CardContent>
            <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
              <Chip icon={<LevelIcon />} label="Intermediate" size="small" />
              <Chip icon={<BrainIcon />} label="Visual Learning" size="small" />
            </Stack>
            
            <Typography variant="h6" gutterBottom>
              Quantum Computing
            </Typography>
            
            <Typography variant="body1" paragraph>
              Think of quantum computing like a massive parallel calculator. While traditional computers work with bits (0s and 1s), quantum computers use quantum bits or 'qubits' that can exist in multiple states simultaneously.
            </Typography>
            
            <Typography variant="subtitle2" color="primary" gutterBottom>
              Key Components:
            </Typography>
            
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" gutterBottom>
                Superposition
              </Typography>
              <LinearProgress variant="determinate" value={75} sx={{ mb: 1 }} />
              <Typography variant="body2" gutterBottom>
                Entanglement
              </Typography>
              <LinearProgress variant="determinate" value={60} sx={{ mb: 1 }} />
              <Typography variant="body2" gutterBottom>
                Quantum Gates
              </Typography>
              <LinearProgress variant="determinate" value={45} />
            </Box>
          </CardContent>
        </Card>

        <Typography variant="subtitle2" color="textSecondary">
          Pro tip: Click on any highlighted term for a deeper explanation
        </Typography>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Related Concepts
        </Typography>
        <Stack direction="row" spacing={1}>
          <Chip label="Quantum Mechanics" color="primary" variant="outlined" />
          <Chip label="Superposition" color="primary" variant="outlined" />
          <Chip label="Quantum Algorithms" color="primary" variant="outlined" />
        </Stack>
      </Paper>
    </Box>
  );
};

export default ConceptExplainer;
