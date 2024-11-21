import React, { useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Paper,
  Stack,
  Typography,
  styled,
  useTheme,
  Tooltip,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  ZoomIn,
  ZoomOut,
  Print,
  Download,
  Close,
  NavigateBefore,
  NavigateNext,
} from '@mui/icons-material';
import { PaperConfig } from '../../types/paper';

const PreviewContainer = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: '100%',
  height: 'calc(100vh - 200px)',
  overflow: 'hidden',
  backgroundColor: theme.palette.background.default,
}));

const PaperContent = styled(Paper)(({ theme }) => ({
  width: '210mm',
  minHeight: '297mm',
  padding: theme.spacing(4),
  margin: '0 auto',
  backgroundColor: '#fff',
  boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  overflow: 'auto',
}));

const ToolbarContainer = styled(Box)(({ theme }) => ({
  position: 'sticky',
  top: 0,
  zIndex: 1,
  padding: theme.spacing(1),
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const QuestionContainer = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  padding: theme.spacing(2),
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

interface PaperPreviewProps {
  open: boolean;
  onClose: () => void;
  config: PaperConfig;
  questions: Array<{
    id: string;
    type: string;
    question: string;
    options?: string[];
    answer?: string;
    marks: number;
  }>;
}

const PaperPreview: React.FC<PaperPreviewProps> = ({
  open,
  onClose,
  config,
  questions,
}) => {
  const theme = useTheme();
  const [zoomLevel, setZoomLevel] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [downloadAnchorEl, setDownloadAnchorEl] = useState<null | HTMLElement>(null);

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 10, 50));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadClick = (event: React.MouseEvent<HTMLElement>) => {
    setDownloadAnchorEl(event.currentTarget);
  };

  const handleDownloadClose = () => {
    setDownloadAnchorEl(null);
  };

  const handleDownload = (format: string) => {
    // TODO: Implement download functionality based on format
    console.log(`Downloading in ${format} format`);
    handleDownloadClose();
  };

  const renderQuestions = () => {
    return questions.map((question, index) => (
      <QuestionContainer key={question.id}>
        <Typography variant="body1" gutterBottom>
          <strong>{index + 1}. </strong>
          {question.question}
          <Typography
            component="span"
            color="textSecondary"
            sx={{ float: 'right' }}
          >
            [{question.marks} marks]
          </Typography>
        </Typography>
        {question.options && (
          <Box sx={{ pl: 3, mt: 1 }}>
            {question.options.map((option, optIndex) => (
              <Typography key={optIndex} variant="body2" gutterBottom>
                {String.fromCharCode(65 + optIndex)}. {option}
              </Typography>
            ))}
          </Box>
        )}
      </QuestionContainer>
    ));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: {
          height: 'calc(100vh - 64px)',
          maxHeight: 'none',
        },
      }}
    >
      <DialogTitle
        sx={{
          bgcolor: '#150b2e',
          color: '#fff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6">Paper Preview</Typography>
        <IconButton onClick={onClose} sx={{ color: '#fff' }}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        <ToolbarContainer>
          <Stack direction="row" spacing={1}>
            <Tooltip title="Zoom Out">
              <IconButton onClick={handleZoomOut}>
                <ZoomOut />
              </IconButton>
            </Tooltip>
            <Typography
              sx={{
                minWidth: 60,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {zoomLevel}%
            </Typography>
            <Tooltip title="Zoom In">
              <IconButton onClick={handleZoomIn}>
                <ZoomIn />
              </IconButton>
            </Tooltip>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Tooltip title="Previous Page">
              <IconButton onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}>
                <NavigateBefore />
              </IconButton>
            </Tooltip>
            <Typography
              sx={{
                minWidth: 40,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {currentPage}
            </Typography>
            <Tooltip title="Next Page">
              <IconButton
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(questions.length / 10)))
                }
              >
                <NavigateNext />
              </IconButton>
            </Tooltip>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Tooltip title="Print">
              <IconButton onClick={handlePrint}>
                <Print />
              </IconButton>
            </Tooltip>
            <Tooltip title="Download">
              <IconButton onClick={handleDownloadClick}>
                <Download />
              </IconButton>
            </Tooltip>
          </Stack>
        </ToolbarContainer>
        <PreviewContainer>
          <PaperContent
            sx={{
              transform: `scale(${zoomLevel / 100})`,
              transformOrigin: 'top center',
            }}
          >
            {/* Paper Header */}
            <Box sx={{ mb: 4, textAlign: 'center' }}>
              <Typography variant="h5" gutterBottom>
                {config.title}
              </Typography>
              <Typography variant="subtitle1" gutterBottom>
                Total Marks: {config.totalMarks} | Time: {config.duration} minutes
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mt: 2,
                  p: 2,
                  bgcolor: '#f5f5f5',
                  borderRadius: 1,
                }}
              >
                {config.instructions}
              </Typography>
            </Box>
            {/* Questions */}
            {renderQuestions()}
          </PaperContent>
        </PreviewContainer>
      </DialogContent>
      <Menu
        anchorEl={downloadAnchorEl}
        open={Boolean(downloadAnchorEl)}
        onClose={handleDownloadClose}
      >
        <MenuItem onClick={() => handleDownload('pdf')}>PDF</MenuItem>
        <MenuItem onClick={() => handleDownload('word')}>Word Document</MenuItem>
        <MenuItem onClick={() => handleDownload('text')}>Text File</MenuItem>
      </Menu>
    </Dialog>
  );
};

export default PaperPreview;
