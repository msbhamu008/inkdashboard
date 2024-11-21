import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  IconButton,
  LinearProgress,
  Chip,
  Avatar,
  styled,
} from '@mui/material';
import {
  School as SchoolIcon,
  Description as PaperIcon,
  Timeline as TimelineIcon,
  MoreVert as MoreVertIcon,
  TrendingUp,
  Assessment,
  People,
} from '@mui/icons-material';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const StatCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  background: 'linear-gradient(45deg, #4a148c 30%, #7c43bd 90%)',
  color: 'white',
  height: '100%',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
  },
}));

const IconBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 48,
  height: 48,
  borderRadius: '50%',
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
  marginRight: theme.spacing(2),
}));

const Dashboard: React.FC = () => {
  const recentPapers = [
    { id: 1, title: 'Physics Mid-Term', type: 'School', date: '2024-01-15', status: 'Published' },
    { id: 2, title: 'Chemistry Final', type: 'Entrance', date: '2024-01-14', status: 'Draft' },
    { id: 3, title: 'Mathematics Quiz', type: 'School', date: '2024-01-13', status: 'Published' },
  ];

  const stats = [
    { title: 'Total Papers', value: '256', icon: <PaperIcon />, trend: '+12%' },
    { title: 'Active Users', value: '1,234', icon: <People />, trend: '+5%' },
    { title: 'Success Rate', value: '94%', icon: <Assessment />, trend: '+2%' },
  ];

  return (
    <Box sx={{ 
      flexGrow: 1,
      height: 'calc(100vh - 64px)', // Subtract AppBar height
      overflow: 'auto',
      backgroundColor: '#f8f4fc',
      p: 3,
    }}>
      <Typography variant="h4" sx={{ mb: 3, fontWeight: 600, color: '#4a148c' }}>
        Dashboard Overview
      </Typography>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={4} key={index}>
            <StatCard elevation={3}>
              <IconBox>
                {stat.icon}
              </IconBox>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {stat.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <Typography variant="h4" sx={{ mr: 1, fontWeight: 600 }}>
                    {stat.value}
                  </Typography>
                  <Chip
                    size="small"
                    icon={<TrendingUp sx={{ fontSize: 16 }} />}
                    label={stat.trend}
                    sx={{
                      backgroundColor: 'rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      height: 24,
                    }}
                  />
                </Box>
              </Box>
            </StatCard>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <StyledCard>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#4a148c' }}>
                  Recent Papers
                </Typography>
                <IconButton size="small">
                  <MoreVertIcon />
                </IconButton>
              </Box>

              {recentPapers.map((paper) => (
                <Box
                  key={paper.id}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    p: 2,
                    mb: 1,
                    borderRadius: 1,
                    bgcolor: 'background.default',
                  }}
                >
                  <Avatar
                    sx={{
                      bgcolor: '#e1bee7',
                      color: '#4a148c',
                      width: 40,
                      height: 40,
                      mr: 2,
                    }}
                  >
                    <SchoolIcon />
                  </Avatar>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {paper.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {paper.type} • {paper.date}
                    </Typography>
                  </Box>
                  <Chip
                    label={paper.status}
                    size="small"
                    color={paper.status === 'Published' ? 'success' : 'default'}
                  />
                </Box>
              ))}
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={4}>
          <StyledCard>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#4a148c' }}>
                  Paper Analytics
                </Typography>
                <IconButton size="small">
                  <TimelineIcon />
                </IconButton>
              </Box>
              
              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">School Papers</Typography>
                  <Typography variant="body2" color="primary">
                    65%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={65}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Entrance Papers</Typography>
                  <Typography variant="body2" color="primary">
                    25%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={25}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>

              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography variant="body2">Olympiad Papers</Typography>
                  <Typography variant="body2" color="primary">
                    10%
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={10}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
