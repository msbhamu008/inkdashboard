import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Switch,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Button,
  TextField,
  Grid,
  FormControlLabel,
  styled,
} from '@mui/material';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  height: '100%',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
}));

interface SettingsState {
  darkMode: boolean;
  emailNotifications: boolean;
  autoSave: boolean;
  defaultDuration: string;
  defaultMarks: string;
  apiKey: string;
}

const initialSettings: SettingsState = {
  darkMode: false,
  emailNotifications: true,
  autoSave: true,
  defaultDuration: '180',
  defaultMarks: '100',
  apiKey: '',
};

const Settings = () => {
  const [settings, setSettings] = useState<SettingsState>(initialSettings);
  const [isEditing, setIsEditing] = useState(false);

  const handleToggle = (name: keyof SettingsState) => {
    setSettings(prev => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log('Saving settings:', settings);
    setIsEditing(false);
    // TODO: Add API call to save settings
  };

  return (
    <Box sx={{ p: { xs: 2, sm: 3 } }}>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Settings
        </Typography>
        {isEditing ? (
          <Button
            variant="contained"
            onClick={handleSave}
            sx={{
              background: 'linear-gradient(45deg, #6a1b9a 30%, #9c4dcc 90%)',
            }}
          >
            Save Changes
          </Button>
        ) : (
          <Button
            variant="outlined"
            onClick={() => setIsEditing(true)}
            sx={{ color: '#6a1b9a', borderColor: '#6a1b9a' }}
          >
            Edit Settings
          </Button>
        )}
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h6" sx={{ mb: 2, color: '#6a1b9a' }}>
              General Settings
            </Typography>
            <List>
              <ListItem>
                <ListItemText
                  primary="Dark Mode"
                  secondary="Enable dark theme for the dashboard"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={settings.darkMode}
                    onChange={() => handleToggle('darkMode')}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Email Notifications"
                  secondary="Receive email updates for paper generation"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={settings.emailNotifications}
                    onChange={() => handleToggle('emailNotifications')}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              <Divider />
              <ListItem>
                <ListItemText
                  primary="Auto Save"
                  secondary="Automatically save paper drafts"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={settings.autoSave}
                    onChange={() => handleToggle('autoSave')}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Typography variant="h6" sx={{ mb: 2, color: '#6a1b9a' }}>
              Default Values
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Default Duration (minutes)"
                  name="defaultDuration"
                  type="number"
                  value={settings.defaultDuration}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Default Total Marks"
                  name="defaultMarks"
                  type="number"
                  value={settings.defaultMarks}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="API Key"
                  name="apiKey"
                  type="password"
                  value={settings.apiKey}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  helperText="Enter your API key for external services"
                />
              </Grid>
            </Grid>
          </StyledPaper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings;
