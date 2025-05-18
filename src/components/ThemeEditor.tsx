import { useState, useEffect } from 'react';
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
  Switch,
  FormControlLabel,
  Slider,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import type { ThemeOption } from '../themes';
import type { PaletteOptions } from '@mui/material/styles';

interface ColorSection {
  label: string;
  colors: Record<string, string>;
}

interface ThemeEditorProps {
  open: boolean;
  onClose: () => void;
  onSave: (theme: ThemeOption) => void;
  editingTheme?: ThemeOption;
}

const defaultTheme: ThemeOption = {
  name: '',
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
    particles: {
      enabled: false,
      options: {
        particles: {
          color: {
            value: '#000000'
          },
          links: {
            color: '#000000',
            enable: true,
            opacity: 0.2,
            distance: 150
          },
          move: {
            enable: true,
            speed: 1
          },
          size: {
            value: 2
          },
          opacity: {
            value: 0.3
          },
          number: {
            value: 50,
            density: {
              enable: true,
              area: 800
            }
          }
        },
        background: {
          color: 'transparent'
        },
        detectRetina: true,
        fpsLimit: 60,
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: 'grab'
            },
            onClick: {
              enable: true,
              mode: 'push'
            }
          },
          modes: {
            grab: {
              distance: 200,
              links: {
                opacity: 0.3
              }
            },
            push: {
              quantity: 4
            }
          }
        }
      }
    }
  },
};

export default function ThemeEditor({ open, onClose, onSave, editingTheme }: ThemeEditorProps) {
  const [theme, setTheme] = useState<ThemeOption>(editingTheme || defaultTheme);
  const [activeTab, setActiveTab] = useState(0);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (editingTheme) {
      setTheme(editingTheme);
    }
  }, [editingTheme]);

  const handleColorChange = (section: keyof PaletteOptions, key: string, subKey: string, value: string) => {
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

  const handleParticleChange = (key: string, value: any) => {
    setTheme(prev => ({
      ...prev,
      background: {
        ...prev.background,
        particles: {
          ...prev.background.particles,
          enabled: prev.background.particles?.enabled ?? false,
          options: {
            ...prev.background.particles?.options,
            particles: {
              ...prev.background.particles?.options.particles,
              [key]: value
            }
          }
        }
      }
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

  const handleSave = () => {
    if (!theme.name) {
      alert('Please enter a theme name');
      return;
    }
    onSave(theme);
    onClose();
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
            <Tab label="Particles" />
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
                            onChange={(e) => handleColorChange(section as keyof PaletteOptions, key, subKey, e.target.value)}
                            style={{ width: 40, height: 40, padding: 0, border: 'none' }}
                          />
                          <TextField
                            size="small"
                            label={key}
                            value={value}
                            onChange={(e) => handleColorChange(section as keyof PaletteOptions, key, subKey, e.target.value)}
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
            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Background Settings
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Background Color"
                  type="color"
                  value={theme.background.default}
                  onChange={(e) => setTheme(prev => ({
                    ...prev,
                    background: { ...prev.background, default: e.target.value }
                  }))}
                  fullWidth
                />
                <TextField
                  label="Pattern"
                  value={theme.background.pattern || ''}
                  onChange={(e) => setTheme(prev => ({
                    ...prev,
                    background: { ...prev.background, pattern: e.target.value }
                  }))}
                  fullWidth
                  multiline
                />
              </Box>
            </Box>
          )}

          {activeTab === 2 && (
            <Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={theme.background.particles?.enabled ?? false}
                    onChange={(e) => setTheme(prev => ({
                      ...prev,
                      background: {
                        ...prev.background,
                        particles: {
                          ...prev.background.particles,
                          enabled: e.target.checked
                        }
                      }
                    }))}
                  />
                }
                label="Enable Particles"
              />

              {theme.background.particles?.enabled && (
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      Particle Settings
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <TextField
                        label="Particle Color"
                        type="color"
                        value={theme.background.particles.options.particles.color.value}
                        onChange={(e) => handleParticleChange('color', { value: e.target.value })}
                        fullWidth
                      />
                      <Box>
                        <Typography gutterBottom>Number of Particles</Typography>
                        <Slider
                          value={theme.background.particles.options.particles.number.value}
                          onChange={(_, value) => handleParticleChange('number', { 
                            value: value as number,
                            density: theme.background.particles.options.particles.number.density
                          })}
                          min={0}
                          max={200}
                          valueLabelDisplay="auto"
                        />
                      </Box>
                      <Box>
                        <Typography gutterBottom>Particle Size</Typography>
                        <Slider
                          value={theme.background.particles.options.particles.size.value}
                          onChange={(_, value) => handleParticleChange('size', { value: value as number })}
                          min={1}
                          max={10}
                          step={0.5}
                          valueLabelDisplay="auto"
                        />
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      Link Settings
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={theme.background.particles.options.particles.links.enable}
                            onChange={(e) => handleParticleChange('links', {
                              ...theme.background.particles.options.particles.links,
                              enable: e.target.checked
                            })}
                          />
                        }
                        label="Enable Links"
                      />
                      {theme.background.particles.options.particles.links.enable && (
                        <>
                          <TextField
                            label="Link Color"
                            type="color"
                            value={theme.background.particles.options.particles.links.color}
                            onChange={(e) => handleParticleChange('links', {
                              ...theme.background.particles.options.particles.links,
                              color: e.target.value
                            })}
                            fullWidth
                          />
                          <Box>
                            <Typography gutterBottom>Link Opacity</Typography>
                            <Slider
                              value={theme.background.particles.options.particles.links.opacity}
                              onChange={(_, value) => handleParticleChange('links', {
                                ...theme.background.particles.options.particles.links,
                                opacity: value as number
                              })}
                              min={0}
                              max={1}
                              step={0.1}
                              valueLabelDisplay="auto"
                            />
                          </Box>
                          <Box>
                            <Typography gutterBottom>Link Distance</Typography>
                            <Slider
                              value={theme.background.particles.options.particles.links.distance}
                              onChange={(_, value) => handleParticleChange('links', {
                                ...theme.background.particles.options.particles.links,
                                distance: value as number
                              })}
                              min={50}
                              max={400}
                              valueLabelDisplay="auto"
                            />
                          </Box>
                        </>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              )}
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
            onClick={handleSave}
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