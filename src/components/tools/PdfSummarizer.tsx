import React, { useState, useCallback } from 'react';
import type { FileRejection } from 'react-dropzone';
import { useDropzone } from 'react-dropzone';
import {
  Box,
  Paper,
  Typography,
  CircularProgress,
  Slider,
  Chip,
  TextField,
  Button,
  Stack,
  Alert,
  Snackbar,
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ArticleIcon from '@mui/icons-material/Article';
import TimerIcon from '@mui/icons-material/Timer';

interface SummaryData {
  summary: string;
  keyPoints: string[];
  readingTime: number;
}

const PdfSummarizer: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [summaryLength, setSummaryLength] = useState<number>(50);
  const [focusKeywords, setFocusKeywords] = useState<string>('');
  const [error, setError] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
    if (rejectedFiles.length > 0) {
      const rejectionReasons = rejectedFiles[0].errors.map(error => error.message).join(', ');
      setError(`File not accepted: ${rejectionReasons}`);
      return;
    }

    const uploadedFile = acceptedFiles[0];
    if (uploadedFile) {
      if (uploadedFile.size > 10 * 1024 * 1024) { // 10MB limit
        setError('File size too large. Please upload a PDF smaller than 10MB.');
        return;
      }
      setFile(uploadedFile);
      handleSummarize(uploadedFile);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
    },
    maxFiles: 1,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const handleSummarize = async (uploadedFile: File) => {
    setLoading(true);
    setError('');
    
    try {
      // Mock data response - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSummaryData({
        summary: "This document discusses the importance of artificial intelligence in modern education. " +
          "It highlights how AI can personalize learning experiences, automate administrative tasks, " +
          "and provide instant feedback to students. The text emphasizes the role of machine learning " +
          "algorithms in adapting to individual learning styles and paces.",
        keyPoints: [
          "AI enables personalized learning experiences",
          "Machine learning algorithms adapt to individual learning styles",
          "Automated administrative tasks increase efficiency",
          "Real-time feedback improves learning outcomes",
          "AI tools can supplement traditional teaching methods"
        ],
        readingTime: 3
      });
    } catch (err) {
      setError('Failed to generate summary. Please try again.');
      console.error('Summarization error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLengthChange = (_event: Event, newValue: number | number[]) => {
    setSummaryLength(newValue as number);
  };

  const handleReset = () => {
    setFile(null);
    setSummaryData(null);
    setError('');
    setFocusKeywords('');
  };

  const handleCloseError = () => {
    setError('');
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        PDF Summarizer
      </Typography>
      
      <Snackbar 
        open={!!error} 
        autoHideDuration={6000} 
        onClose={handleCloseError}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>

      {!file && (
        <Paper 
          sx={{ 
            p: 4, 
            textAlign: 'center', 
            cursor: 'pointer',
            borderStyle: 'dashed',
            borderWidth: 2,
            borderColor: isDragActive ? 'primary.main' : 'grey.400',
            bgcolor: isDragActive ? 'action.hover' : 'background.paper',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              borderColor: 'primary.main',
              bgcolor: 'action.hover',
            },
          }}
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
          <Typography variant="h6" gutterBottom>
            {isDragActive ? 'Drop the PDF here' : 'Drag & drop a PDF file here'}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            or click to select a file (max 10MB)
          </Typography>
        </Paper>
      )}

      {file && (
        <Box sx={{ mt: 3 }}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <ArticleIcon color="primary" />
              <Typography sx={{ flex: 1 }}>{file.name}</Typography>
              <Button
                size="small"
                color="error"
                onClick={handleReset}
                variant="outlined"
              >
                Remove
              </Button>
            </Stack>
          </Paper>

          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Summary Length (%)</Typography>
            <Slider
              value={summaryLength}
              onChange={handleLengthChange}
              valueLabelDisplay="auto"
              step={10}
              marks
              min={10}
              max={100}
            />
          </Box>

          <TextField
            fullWidth
            label="Focus Keywords (optional)"
            value={focusKeywords}
            onChange={(e) => setFocusKeywords(e.target.value)}
            placeholder="Enter keywords separated by commas"
            sx={{ mb: 3 }}
          />

          <Button
            variant="contained"
            onClick={() => handleSummarize(file)}
            disabled={loading}
            fullWidth
            sx={{ mb: 3 }}
          >
            {loading ? (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <CircularProgress size={24} sx={{ mr: 1 }} />
                Generating Summary...
              </Box>
            ) : (
              'Generate Summary'
            )}
          </Button>
        </Box>
      )}

      {summaryData && (
        <Paper sx={{ p: 3, mt: 3 }}>
          <Typography variant="h6" gutterBottom>
            Summary
          </Typography>
          <Typography paragraph sx={{ whiteSpace: 'pre-line' }}>
            {summaryData.summary}
          </Typography>

          <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
            Key Points
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap sx={{ mb: 2 }}>
            {summaryData.keyPoints.map((point, index) => (
              <Chip 
                key={index} 
                label={point} 
                sx={{ 
                  my: 0.5,
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                }} 
              />
            ))}
          </Stack>

          <Stack direction="row" alignItems="center" spacing={1}>
            <TimerIcon color="primary" />
            <Typography variant="body2" color="textSecondary">
              Estimated reading time: {summaryData.readingTime} minutes
            </Typography>
          </Stack>
        </Paper>
      )}
    </Box>
  );
};

export default PdfSummarizer;
