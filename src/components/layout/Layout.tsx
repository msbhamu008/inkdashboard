import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Menu,
  MenuItem as MuiMenuItem,
  Divider,
  Badge,
  Collapse,
  ListItemButton,
  CssBaseline,
  InputAdornment,
  Drawer,
  AppBar,
  Toolbar,
  TextField,
  styled,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Description as PaperIcon,
  Notifications as NotificationsIcon,
  ExpandMore,
  ChevronLeft,
  ChevronRight,
  Quiz as QuizIcon,
  Add as AddIcon,
  List as ListIcon,
  Psychology as PsychologyIcon,
  Search as SearchIcon,
  AccountCircle as AccountCircleIcon,
  SummarizeOutlined as SummarizeIcon,
  School as ConceptIcon,
  QuestionAnswer as QAIcon,
  FlashOn as FlashcardIcon,
  Assignment as QuizMakerIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation, Routes, Route } from 'react-router-dom';
import Dashboard from '../dashboard/Dashboard';
import PaperGenerationForm from '../paper/PaperGenerationForm';
import AddQuestion from '../questions/AddQuestion';
import ViewPapers from '../paper/ViewPapers';
import QuestionBank from '../questions/QuestionBank';
import PdfSummarizer from '../tools/PdfSummarizer';

interface SubMenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
}

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
  subItems?: SubMenuItem[];
}

interface LayoutProps {
  // Add any props that Layout component might receive
}

const drawerWidth = 280;

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  '& .MuiDrawer-paper': {
    boxSizing: 'border-box',
    borderRadius: 0,
    background: '#150b2e',
    color: '#fff',
    borderRight: 'none',
    display: 'flex',
    flexDirection: 'column',
    transition: theme.transitions.create(['width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    ...(open ? {
      width: drawerWidth,
      overflowX: 'hidden',
    } : {
      width: theme.spacing(7),
      overflowX: 'hidden',
    }),
  },
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  borderRadius: 0,
  background: '#150b2e',
  boxShadow: 'none',
  zIndex: theme.zIndex.drawer + 1,
}));

const Main = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  margin: theme.spacing(0.5, 1),
  borderRadius: theme.spacing(1),
  color: 'rgba(255, 255, 255, 0.7)',
  '&.Mui-selected': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: '#fff',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
    },
  },
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    color: '#fff',
  },
}));

const StyledListItemIcon = styled(ListItemIcon)({
  minWidth: 40,
  color: 'inherit',
});

const LogoText = styled(Typography)({
  fontWeight: 600,
  fontSize: '1.2rem',
  color: '#fff',
  marginLeft: 8,
});

const Layout: React.FC<LayoutProps> = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const [searchAnchor, setSearchAnchor] = useState<null | HTMLElement>(null);
  const [notificationAnchor, setNotificationAnchor] = useState<null | HTMLElement>(null);
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);
  const [selectedMenu, setSelectedMenu] = useState('dashboard');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleSearchClick = (event: React.MouseEvent<HTMLElement>) => {
    setSearchAnchor(event.currentTarget);
  };

  const handleSearchClose = () => {
    setSearchAnchor(null);
  };

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileAnchor(null);
  };

  const handleMenuClick = (path: string) => {
    navigate(path);
    setSelectedMenu(path);
  };

  const handleExpandClick = (item: string) => {
    setExpandedItems((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  };

  const isItemActive = (path: string) => location.pathname === path;

  const menuItems: MenuItem[] = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/dashboard',
    },
    {
      text: 'Question Paper',
      icon: <PaperIcon />,
      path: '/paper',
      subItems: [
        {
          text: 'Create Paper',
          icon: <AddIcon />,
          path: '/paper/create',
        },
        {
          text: 'View Papers',
          icon: <ListIcon />,
          path: '/paper/view',
        },
      ],
    },
    {
      text: 'Question Bank',
      icon: <QuizIcon />,
      path: '/questions',
      subItems: [
        {
          text: 'Add Questions',
          icon: <AddIcon />,
          path: '/questions/add',
        },
        {
          text: 'View Questions',
          icon: <ListIcon />,
          path: '/questions/view',
        },
      ],
    },
    {
      text: 'AI Tools',
      icon: <PsychologyIcon />,
      path: '/ai-tools',
      subItems: [
        {
          text: 'PDF Summarizer',
          icon: <SummarizeIcon />,
          path: '/ai-tools/pdf-summarizer',
        },
        {
          text: 'Concept Explainer',
          icon: <ConceptIcon />,
          path: '/ai-tools/concept-explainer',
        },
        {
          text: 'Question Generator',
          icon: <QAIcon />,
          path: '/ai-tools/question-generator',
        },
        {
          text: 'Interactive Flashcards',
          icon: <FlashcardIcon />,
          path: '/ai-tools/flashcards',
        },
        {
          text: 'Quiz Maker',
          icon: <QuizMakerIcon />,
          path: '/ai-tools/quiz-maker',
        },
      ],
    },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <StyledAppBar position="fixed">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="toggle drawer"
            onClick={handleDrawerToggle}
            edge="start"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            SIPS
          </Typography>
          <IconButton 
            color="inherit" 
            onClick={handleSearchClick}
            sx={{
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
            }}
          >
            <SearchIcon />
          </IconButton>
          <IconButton 
            color="inherit" 
            onClick={handleNotificationClick}
            sx={{
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
            }}
          >
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton 
            color="inherit" 
            onClick={handleProfileClick}
            sx={{
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' }
            }}
          >
            <AccountCircleIcon />
          </IconButton>

          {/* Profile Menu */}
          <Menu
            anchorEl={profileAnchor}
            open={Boolean(profileAnchor)}
            onClose={handleProfileMenuClose}
            onClick={handleProfileMenuClose}
            PaperProps={{
              sx: {
                mt: 1,
                background: '#150b2e',
                color: 'rgba(255, 255, 255, 0.7)',
                '& .MuiMenuItem-root': {
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MuiMenuItem>Profile</MuiMenuItem>
            <MuiMenuItem>Settings</MuiMenuItem>
            <MuiMenuItem>Logout</MuiMenuItem>
          </Menu>

          {/* Notifications Menu */}
          <Menu
            anchorEl={notificationAnchor}
            open={Boolean(notificationAnchor)}
            onClose={handleNotificationClose}
            PaperProps={{
              sx: {
                mt: 1,
                background: '#150b2e',
                color: 'rgba(255, 255, 255, 0.7)',
                minWidth: 280,
                '& .MuiMenuItem-root': {
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    color: '#fff',
                  },
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MuiMenuItem>
              <Box>
                <Typography variant="subtitle2">New Question Added</Typography>
                <Typography variant="caption" color="textSecondary">
                  2 hours ago
                </Typography>
              </Box>
            </MuiMenuItem>
            <Divider sx={{ my: 1, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
            <MuiMenuItem>
              <Box>
                <Typography variant="subtitle2">Paper Generated</Typography>
                <Typography variant="caption" color="textSecondary">
                  5 hours ago
                </Typography>
              </Box>
            </MuiMenuItem>
          </Menu>

          {/* Search Menu */}
          <Menu
            anchorEl={searchAnchor}
            open={Boolean(searchAnchor)}
            onClose={handleSearchClose}
            PaperProps={{
              sx: {
                mt: 1,
                background: '#150b2e',
                color: 'rgba(255, 255, 255, 0.7)',
                minWidth: 320,
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <Box sx={{ p: 2 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search..."
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon sx={{ color: 'rgba(255, 255, 255, 0.7)' }} />
                    </InputAdornment>
                  ),
                  sx: {
                    color: '#fff',
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.23)',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.23)',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Box>
          </Menu>
        </Toolbar>
      </StyledAppBar>

      <StyledDrawer variant="permanent" open={open}>
        <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Logo and Toggle Section */}
          <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <IconButton onClick={handleDrawerToggle}>
              {!open ? <ChevronRight /> : <ChevronLeft />}
            </IconButton>
          </Box>
          
          {/* Scrollable Menu Section */}
          <Box sx={{ 
            flex: 1, 
            overflowY: 'auto',
            '&::-webkit-scrollbar': {
              width: '4px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'rgba(255, 255, 255, 0.05)',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'rgba(255, 255, 255, 0.2)',
              borderRadius: '2px',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              background: 'rgba(255, 255, 255, 0.3)',
            },
          }}>
            <List component="nav">
              {menuItems.map((item) => (
                <React.Fragment key={item.text}>
                  {item.subItems ? (
                    <>
                      <ListItemButton
                        onClick={() => handleExpandClick(item.text)}
                        sx={{
                          minHeight: 48,
                          px: 2.5,
                          '&:hover': {
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          },
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                            color: 'rgba(255, 255, 255, 0.7)',
                          }}
                        >
                          {item.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={item.text}
                          sx={{
                            opacity: open ? 1 : 0,
                            color: 'rgba(255, 255, 255, 0.7)',
                          }}
                        />
                        {open && (
                          <ExpandMore
                            sx={{
                              transform: expandedItems.includes(item.text) ? 'rotate(180deg)' : 'rotate(0)',
                              transition: '0.2s',
                            }}
                          />
                        )}
                      </ListItemButton>
                      <Collapse in={expandedItems.includes(item.text) && open} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {item.subItems.map((subItem) => (
                            <ListItemButton
                              key={subItem.text}
                              onClick={() => handleMenuClick(subItem.path)}
                              sx={{
                                pl: 4,
                                '&:hover': {
                                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                },
                                position: 'relative',
                              }}
                            >
                              <ListItemIcon
                                sx={{
                                  minWidth: 0,
                                  mr: 3,
                                  justifyContent: 'center',
                                  color: 'rgba(255, 255, 255, 0.7)',
                                }}
                              >
                                {subItem.icon}
                              </ListItemIcon>
                              <Box>
                                <ListItemText
                                  primary={subItem.text}
                                  sx={{
                                    color: 'rgba(255, 255, 255, 0.7)',
                                    m: 0,
                                  }}
                                />
                              </Box>
                            </ListItemButton>
                          ))}
                        </List>
                      </Collapse>
                    </>
                  ) : (
                    <ListItemButton
                      onClick={() => handleMenuClick(item.path)}
                      sx={{
                        minHeight: 48,
                        px: 2.5,
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        },
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 0,
                          mr: open ? 3 : 'auto',
                          justifyContent: 'center',
                          color: 'rgba(255, 255, 255, 0.7)',
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={item.text}
                        sx={{
                          opacity: open ? 1 : 0,
                          color: 'rgba(255, 255, 255, 0.7)',
                        }}
                      />
                    </ListItemButton>
                  )}
                </React.Fragment>
              ))}
            </List>
          </Box>

          {/* Powered by Section - Made Smaller */}
          <Box
            sx={{
              p: 2,
              background: 'linear-gradient(135deg, rgba(98, 54, 160, 0.1) 0%, rgba(138, 92, 198, 0.1) 100%)',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              mt: 'auto',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <PsychologyIcon width="20" height="20" viewBox="0 0 24 24" />
              <Typography variant="subtitle2" sx={{ ml: 1, color: 'rgba(255, 255, 255, 0.7)' }}>
                Powered by Inkredible
              </Typography>
            </Box>
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              Crafted with ❤️ in India
            </Typography>
          </Box>
        </Box>
      </StyledDrawer>

      <Main open={open}>
        <DrawerHeader />
        <Box component="div" sx={{ p: 2 }}>
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/paper/create" element={<PaperGenerationForm />} />
            <Route 
              path="/questions/add" 
              element={
                <AddQuestion 
                  onSubmit={(data) => {
                    console.log('Question submitted:', data);
                    // TODO: Implement question submission logic
                  }} 
                />
              } 
            />
            <Route path="/paper/view" element={<ViewPapers />} />
            <Route path="/questions/view" element={<QuestionBank />} />
            <Route path="/ai-tools/pdf-summarizer" element={<PdfSummarizer />} />
            <Route path="/ai-tools/concept-explainer" element={
              <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
                <Typography variant="h5" gutterBottom>Concept Explainer</Typography>
                <Typography variant="body1" color="text.secondary">
                  Coming Soon: An AI-powered tool that breaks down complex educational concepts into simple, 
                  easy-to-understand explanations with examples and visual aids.
                </Typography>
              </Box>
            } />
            <Route path="/ai-tools/question-generator" element={
              <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
                <Typography variant="h5" gutterBottom>Question Generator</Typography>
                <Typography variant="body1" color="text.secondary">
                  Coming Soon: Automatically generate high-quality questions from your educational content 
                  with customizable difficulty levels and question types.
                </Typography>
              </Box>
            } />
            <Route path="/ai-tools/flashcards" element={
              <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
                <Typography variant="h5" gutterBottom>Interactive Flashcards</Typography>
                <Typography variant="body1" color="text.secondary">
                  Coming Soon: Create and study with AI-enhanced flashcards that adapt to your learning pace 
                  and automatically generate content from your study materials.
                </Typography>
              </Box>
            } />
            <Route path="/ai-tools/quiz-maker" element={
              <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
                <Typography variant="h5" gutterBottom>Quiz Maker</Typography>
                <Typography variant="body1" color="text.secondary">
                  Coming Soon: Create interactive quizzes with automatic scoring, detailed analytics, 
                  and AI-powered question suggestions based on your content.
                </Typography>
              </Box>
            } />
          </Routes>
        </Box>
      </Main>
    </Box>
  );
};

export default Layout;
