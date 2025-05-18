import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  IconButton,
  Typography,
  Tabs,
  Tab,
  Grid,
  Snackbar,
  Alert,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import type { ThemeOption } from './ThemeSelector';

interface ColorSection {
  label: string;
  colors: {
    [key: string]: string;
  };
}

interface ThemeEditorProps {
  open: boolean;
  onClose: () => void;
  onSave: (theme: ThemeOption) => void;
  editingTheme?: ThemeOption;
}

const defaultTheme: ThemeOption = {
  name: 'Custom Theme',
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    secondary: {
      main: '#9c27b0',
      light: '#ba68c8',
      dark: '#7b1fa2',
    },
    background: {
      default: '#ffffff',
      paper: '#f5f5f5',
    },
    text: {
      primary: '#000000',
      secondary: '#666666',
    },
  },
  background: {
    default: '#ffffff',
    pattern: 'radial-gradient(circle at 1px 1px, #e0e0e0 1px, transparent 0) 0 0/40px 40px',
  },
};

export default function ThemeEditor({ open, onClose, onSave, editingTheme }: ThemeEditorProps) {
  const [theme, setTheme] = useState<ThemeOption>(editingTheme || defaultTheme);
  const [activeTab, setActiveTab] = useState(0);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleColorChange = (section: string, key: string, subKey: string, value: string) => {
    setTheme(prev => ({
      ...prev,
      palette: {
        ...prev.palette,
        [section]: {
          ...prev.palette[section],
          [subKey]: value,
        },
      },
    }));
  };

  const colorSections: ColorSection[] = [
    {
      label: 'Primary Colors',
      colors: {
        'primary.main': theme.palette.primary?.main || '',
        'primary.light': theme.palette.primary?.light || '',
        'primary.dark': theme.palette.primary?.dark || '',
      },
    },
    {
      label: 'Secondary Colors',
      colors: {
        'secondary.main': theme.palette.secondary?.main || '',
        'secondary.light': theme.palette.secondary?.light || '',
        'secondary.dark': theme.palette.secondary?.dark || '',
      },
    },
    {
      label: 'Background Colors',
      colors: {
        'background.default': theme.palette.background?.default || '',
        'background.paper': theme.palette.background?.paper || '',
      },
    },
    {
      label: 'Text Colors',
      colors: {
        'text.primary': theme.palette.text?.primary || '',
        'text.secondary': theme.palette.text?.secondary || '',
      },
    },
  ];

  const handleShare = () => {
    const themeString = JSON.stringify(theme, null, 2);
    navigator.clipboard.writeText(themeString);
    setSnackbarOpen(true);
  };

  const handleImport = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const importedTheme = JSON.parse(text);
      if (
        importedTheme.name &&
        importedTheme.palette &&
        importedTheme.background
      ) {
        setTheme(importedTheme);
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Failed to import theme:', error);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
          },
        }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="h6">Theme Editor</Typography>
            <TextField
              size="small"
              label="Theme Name"
              value={theme.name}
              onChange={(e) => setTheme(prev => ({ ...prev, name: e.target.value }))}
              sx={{ minWidth: 200 }}
            />
          </Box>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Tabs
            value={activeTab}
            onChange={(_, newValue) => setActiveTab(newValue)}
            sx={{ borderBottom: 1, borderColor: 'divider', mb: 2 }}
          >
            <Tab label="Colors" />
            <Tab label="Background" />
          </Tabs>

          {activeTab === 0 && (
            <Grid container spacing={3}>
              {colorSections.map((section) => (
                <Grid item xs={12} md={6} key={section.label}>
                  <Typography variant="subtitle2" gutterBottom>
                    {section.label}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {Object.entries(section.colors).map(([key, value]) => {
                      const [section, subKey] = key.split('.');
                      return (
                        <Box key={key} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                          <input
                            type="color"
                            value={value}
                            onChange={(e) => handleColorChange(section, key, subKey, e.target.value)}
                            style={{ width: 40, height: 40, padding: 0, border: 'none' }}
                          />
                          <TextField
                            size="small"
                            label={key}
                            value={value}
                            onChange={(e) => handleColorChange(section, key, subKey, e.target.value)}
                            sx={{ flex: 1 }}
                          />
                        </Box>
                      );
                    })}
                  </Box>
                </Grid>
              ))}
            </Grid>
          )}

          {activeTab === 1 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                fullWidth
                label="Background Pattern"
                value={theme.background?.pattern || ''}
                onChange={(e) => setTheme(prev => ({
                  ...prev,
                  background: {
                    ...prev.background,
                    pattern: e.target.value,
                  },
                }))}
                multiline
                rows={3}
                helperText="CSS gradient pattern for the background"
              />
            </Box>
          )}
        </DialogContent>

        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={handleImport} variant="outlined">
            Import
          </Button>
          <Button onClick={handleShare} variant="outlined">
            Share
          </Button>
          <Box sx={{ flex: 1 }} />
          <Button onClick={onClose}>Cancel</Button>
          <Button
            onClick={() => {
              onSave(theme);
              onClose();
            }}
            variant="contained"
          >
            Save Theme
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert severity="success" onClose={() => setSnackbarOpen(false)}>
          {theme ? 'Theme imported successfully!' : 'Theme copied to clipboard!'}
        </Alert>
      </Snackbar>
    </>
  );
} 