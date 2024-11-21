import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  TextField,
  Button,
  Card,
  CardContent,
  IconButton,
  Fade,
  Stack,
  Chip,
} from '@mui/material';
import {
  FlashOn as FlashcardIcon,
  Refresh as FlipIcon,
  NavigateNext,
  NavigateBefore,
} from '@mui/icons-material';

const Flashcards: React.FC = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Interactive Flashcards
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Generate interactive flashcards from your study material. Our AI will create concise question-answer pairs for effective learning.
        </Typography>

        <TextField
          fullWidth
          multiline
          rows={4}
          label="Study Content"
          placeholder="Paste your study material or describe the topic..."
          sx={{ mb: 3 }}
        />

        <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
          <TextField
            label="Number of Cards"
            type="number"
            defaultValue={10}
            size="small"
            sx={{ width: 150 }}
          />
          <TextField
            label="Subject/Topic"
            placeholder="e.g., Biology, History..."
            size="small"
            sx={{ width: 200 }}
          />
        </Stack>

        <Button
          variant="contained"
          size="large"
          startIcon={<FlashcardIcon />}
          sx={{
            background: 'linear-gradient(135deg, #6236a0 0%, #8a5cc6 100%)',
            '&:hover': {
              background: 'linear-gradient(135deg, #734bb9 0%, #9c71d6 100%)',
            },
          }}
        >
          Generate Flashcards
        </Button>
      </Paper>

      {/* Flashcard Preview */}
      <Paper sx={{ p: 3, mb: 3, bgcolor: 'rgba(98, 54, 160, 0.03)' }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Preview
        </Typography>
        
        <Box sx={{ position: 'relative', height: 300, perspective: '1000px' }}>
          <Card
            sx={{
              height: '100%',
              position: 'relative',
              transition: 'transform 0.6s',
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0)',
              cursor: 'pointer',
            }}
            onClick={() => setIsFlipped(!isFlipped)}
          >
            <CardContent
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 4,
              }}
            >
              <Typography variant="h5" sx={{ mb: 2 }}>
                What is photosynthesis?
              </Typography>
              <Chip label="Biology" size="small" color="primary" />
            </CardContent>

            <CardContent
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                p: 4,
              }}
            >
              <Typography variant="body1" align="center">
                Photosynthesis is the process by which plants convert light energy into chemical energy to produce glucose from carbon dioxide and water.
              </Typography>
            </CardContent>
          </Card>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, gap: 2 }}>
          <IconButton color="primary">
            <NavigateBefore />
          </IconButton>
          <IconButton color="primary" onClick={() => setIsFlipped(!isFlipped)}>
            <FlipIcon />
          </IconButton>
          <IconButton color="primary">
            <NavigateNext />
          </IconButton>
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Study Settings
        </Typography>
        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
          <Chip label="Spaced Repetition" color="primary" variant="outlined" />
          <Chip label="Audio Pronunciation" color="primary" variant="outlined" />
          <Chip label="Progress Tracking" color="primary" variant="outlined" />
        </Stack>
        <Typography variant="body2" color="textSecondary">
          Customize your learning experience with these advanced features
        </Typography>
      </Paper>
    </Box>
  );
};

export default Flashcards;
