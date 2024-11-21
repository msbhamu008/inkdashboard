import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  styled,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Description as PaperIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  background: 'linear-gradient(45deg, #6a1b9a 30%, #9c4dcc 90%)',
  color: 'white',
  height: '100%',
  borderRadius: 0,
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  borderRadius: theme.spacing(1),
  margin: theme.spacing(0.5, 1),
  '&.Mui-selected': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
  },
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
}));

const StyledListItemIcon = styled(ListItemIcon)({
  color: 'inherit',
  minWidth: 40,
});

const navigationItems = [
  { path: '/', label: 'Dashboard', icon: <DashboardIcon /> },
  { path: '/generate', label: 'Generate Paper', icon: <PaperIcon /> },
  { path: '/settings', label: 'Settings', icon: <SettingsIcon /> },
];

interface SidebarProps {
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onClose }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    if (onClose) {
      onClose();
    }
  };

  return (
    <StyledPaper elevation={0}>
      <Box sx={{ p: 2 }}>
        <List>
          {navigationItems.map((item) => (
            <ListItem key={item.path} disablePadding>
              <StyledListItemButton
                selected={location.pathname === item.path}
                onClick={() => handleNavigation(item.path)}
              >
                <StyledListItemIcon>{item.icon}</StyledListItemIcon>
                <ListItemText primary={item.label} />
              </StyledListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </StyledPaper>
  );
};

export default Sidebar;
