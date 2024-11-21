import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Typography,
  Box,
  TablePagination,
  styled,
  InputAdornment,
  TextField,
} from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import SearchIcon from '@mui/icons-material/Search';

interface PaperType {
  id: string;
  name: string;
  class: string;
  totalMarks: number;
  totalTime: number;
  questionPaperUrl: string;
  solutionUrl: string;
}

const StyledTableContainer = styled(Box)(({ theme }) => ({
  margin: theme.spacing(3),
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  borderRadius: theme.spacing(1),
  '& .MuiTableHead-root': {
    backgroundColor: '#f3e5f5',
    '& .MuiTableCell-head': {
      color: '#6a1b9a',
      fontWeight: 600,
    },
  },
  '& .MuiTableRow-root': {
    '&:hover': {
      backgroundColor: '#faf5fb',
    },
  },
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  color: '#6a1b9a',
  '&:hover': {
    backgroundColor: 'rgba(106, 27, 154, 0.08)',
  },
}));

const SearchField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  width: 300,
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: '#6a1b9a',
    },
    '&:hover fieldset': {
      borderColor: '#8e24aa',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#6a1b9a',
    },
  },
}));

// Sample data
const samplePapers: PaperType[] = [
  {
    id: '1',
    name: 'Physics Half Yearly',
    class: 'Class 12',
    totalMarks: 100,
    totalTime: 180,
    questionPaperUrl: '/papers/physics-half-yearly.pdf',
    solutionUrl: '/solutions/physics-half-yearly.pdf',
  },
  {
    id: '2',
    name: 'Chemistry Unit Test',
    class: 'Class 11',
    totalMarks: 50,
    totalTime: 90,
    questionPaperUrl: '/papers/chemistry-unit.pdf',
    solutionUrl: '/solutions/chemistry-unit.pdf',
  },
  {
    id: '3',
    name: 'Mathematics Final',
    class: 'Class 10',
    totalMarks: 80,
    totalTime: 150,
    questionPaperUrl: '/papers/math-final.pdf',
    solutionUrl: '/solutions/math-final.pdf',
  },
  {
    id: '4',
    name: 'Biology Practical',
    class: 'Class 12',
    totalMarks: 30,
    totalTime: 120,
    questionPaperUrl: '/papers/bio-practical.pdf',
    solutionUrl: '/solutions/bio-practical.pdf',
  },
  {
    id: '5',
    name: 'English Mid Term',
    class: 'Class 9',
    totalMarks: 100,
    totalTime: 180,
    questionPaperUrl: '/papers/english-mid.pdf',
    solutionUrl: '/solutions/english-mid.pdf',
  },
];

const ViewPapers: React.FC = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredPapers = samplePapers.filter(paper =>
    paper.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paper.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleView = (url: string) => {
    // Implement view functionality
    window.open(url, '_blank');
  };

  const handleDownload = (url: string) => {
    // Implement download functionality
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop() || 'document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom sx={{ color: '#6a1b9a', mb: 4 }}>
        View Papers
      </Typography>

      <SearchField
        placeholder="Search papers..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: '#6a1b9a' }} />
            </InputAdornment>
          ),
        }}
      />

      <StyledTableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Paper Name</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Total Marks</TableCell>
              <TableCell>Total Time (min)</TableCell>
              <TableCell align="center">Question Paper</TableCell>
              <TableCell align="center">Solution</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredPapers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((paper) => (
                <TableRow key={paper.id}>
                  <TableCell>{paper.name}</TableCell>
                  <TableCell>{paper.class}</TableCell>
                  <TableCell>{paper.totalMarks}</TableCell>
                  <TableCell>{paper.totalTime}</TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                      <ActionButton
                        size="small"
                        onClick={() => handleView(paper.questionPaperUrl)}
                        title="View Question Paper"
                      >
                        <VisibilityIcon />
                      </ActionButton>
                      <ActionButton
                        size="small"
                        onClick={() => handleDownload(paper.questionPaperUrl)}
                        title="Download Question Paper"
                      >
                        <FileDownloadIcon />
                      </ActionButton>
                    </Box>
                  </TableCell>
                  <TableCell align="center">
                    <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                      <ActionButton
                        size="small"
                        onClick={() => handleView(paper.solutionUrl)}
                        title="View Solution"
                      >
                        <VisibilityIcon />
                      </ActionButton>
                      <ActionButton
                        size="small"
                        onClick={() => handleDownload(paper.solutionUrl)}
                        title="Download Solution"
                      >
                        <FileDownloadIcon />
                      </ActionButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredPapers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </StyledTableContainer>
    </Box>
  );
};

export default ViewPapers;
