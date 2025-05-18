import { useState, useEffect } from 'react';
import { 
  Box, 
  ToggleButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Button,
  Divider,
  Switch,
  FormControlLabel,
} from '@mui/material';
import { Close as CloseIcon, Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import type { PaletteOptions, PaletteColor } from '@mui/material/styles';
import ThemeEditor from './ThemeEditor';
import { type ThemeOption, themes as defaultThemes } from '../themes';

interface ThemeSelectorProps {
  open: boolean;
  onClose: () => void;
  currentTheme: string;
  onThemeChange: (theme: ThemeOption) => void;
}

export default function ThemeSelector({ open, onClose, currentTheme, onThemeChange }: ThemeSelectorProps) {
  // Initialize custom themes from localStorage
  const [customThemes, setCustomThemes] = useState<ThemeOption[]>(() => {
    const saved = localStorage.getItem('customThemes')
    return saved ? JSON.parse(saved) : []
  })

  // Initialize global particles state
  const [globalParticlesEnabled, setGlobalParticlesEnabled] = useState(() => {
    const saved = localStorage.getItem('globalParticlesEnabled')
    return saved ? JSON.parse(saved) === true : false
  })

  const [editorOpen, setEditorOpen] = useState(false)
  const [editingTheme, setEditingTheme] = useState<ThemeOption | undefined>()

  // Save custom themes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('customThemes', JSON.stringify(customThemes))
  }, [customThemes])

  // Save global particles state to localStorage
  useEffect(() => {
    localStorage.setItem('globalParticlesEnabled', JSON.stringify(globalParticlesEnabled))
  }, [globalParticlesEnabled])

  const handleSaveTheme = (theme: ThemeOption) => {
    if (editingTheme) {
      setCustomThemes(prev => 
        prev.map(t => t.name === editingTheme.name ? theme : t)
      )
    } else {
      setCustomThemes(prev => [...prev, theme])
    }
    onThemeChange(theme)
  }

  const handleEditTheme = (theme: ThemeOption) => {
    setEditingTheme(theme)
    setEditorOpen(true)
  }

  const handleDeleteTheme = (themeName: string) => {
    setCustomThemes(prev => prev.filter(t => t.name !== themeName))
    // If the deleted theme was selected, switch to the first built-in theme
    if (currentTheme === themeName) {
      onThemeChange(defaultThemes[0])
    }
  }

  const handleParticlesToggle = (theme: ThemeOption) => {
    if (theme.background.particles) {
      const isCustomTheme = customThemes.some(t => t.name === theme.name)
      
      if (isCustomTheme) {
        // Handle custom theme particles individually
        const updatedTheme = {
          ...theme,
          background: {
            ...theme.background,
            particles: {
              ...theme.background.particles,
              enabled: !theme.background.particles.enabled
            }
          }
        }
        setCustomThemes(prev => 
          prev.map(t => t.name === theme.name ? updatedTheme : t)
        )
        onThemeChange(updatedTheme)
      } else {
        // Handle preset theme particles globally
        const newGlobalState = !globalParticlesEnabled
        setGlobalParticlesEnabled(newGlobalState)
        
        // Update current theme if it's a preset theme
        if (theme.name === currentTheme) {
          const updatedTheme = {
            ...theme,
            background: {
              ...theme.background,
              particles: {
                ...theme.background.particles,
                enabled: newGlobalState
              }
            }
          }
          onThemeChange(updatedTheme)
        }
      }
    }
  }

  return (
    <>
      <Dialog 
        open={open} 
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 2,
            p: 1,
          }
        }}
      >
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          pb: 1
        }}>
          <Typography variant="h6">Choose Theme</Typography>
          <IconButton 
            onClick={onClose}
            size="small"
            sx={{ 
              color: 'text.secondary',
              '&:hover': {
                color: 'text.primary',
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Box sx={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
            gap: 2,
            py: 1
          }}>
            <Button
              variant="outlined"
              onClick={() => {
                setEditingTheme(undefined)
                setEditorOpen(true)
              }}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                p: 2,
              }}
            >
              <AddIcon />
              <Typography variant="body2">
                Create Theme
              </Typography>
            </Button>

            {defaultThemes.map((theme) => (
              <Box key={theme.name} sx={{ display: 'flex', flexDirection: 'column' }}>
                <ToggleButton
                  value={theme.name}
                  selected={currentTheme === theme.name}
                  onChange={() => {
                    // Update theme with current global particles state when selecting
                    const updatedTheme = {
                      ...theme,
                      background: {
                        ...theme.background,
                        particles: theme.background.particles ? {
                          ...theme.background.particles,
                          enabled: globalParticlesEnabled
                        } : undefined
                      }
                    }
                    onThemeChange(updatedTheme)
                    onClose()
                  }}
                  aria-label={theme.name}
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                    borderRadius: 1,
                    borderColor: 'divider',
                    '&.Mui-selected': {
                      backgroundColor: (theme.palette.primary as PaletteColor)?.main || '#000',
                      color: '#fff',
                      '&:hover': {
                        backgroundColor: (theme.palette.primary as PaletteColor)?.dark || '#000',
                      },
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: 60,
                      borderRadius: 1,
                      background: theme.background.pattern
                        ? `${theme.background.default} ${theme.background.pattern}`
                        : theme.background.default,
                      backgroundSize: '30px 30px',
                      border: '1px solid',
                      borderColor: 'divider',
                    }}
                  />
                  <Typography variant="body2">
                    {theme.name}
                  </Typography>
                </ToggleButton>
                {theme.background.particles && (
                  <FormControlLabel
                    control={
                      <Switch
                        size="small"
                        checked={globalParticlesEnabled}
                        onChange={() => handleParticlesToggle(theme)}
                      />
                    }
                    label="Particles"
                    sx={{ mt: 1 }}
                  />
                )}
              </Box>
            ))}

            {customThemes.length > 0 && (
              <>
                <Box sx={{ gridColumn: '1/-1', pt: 2, pb: 1 }}>
                  <Divider>
                    <Typography variant="body2" color="text.secondary">
                      Custom Themes
                    </Typography>
                  </Divider>
                </Box>

                {customThemes.map((theme) => (
                  <Box key={theme.name} sx={{ display: 'flex', flexDirection: 'column' }}>
                    <ToggleButton
                      value={theme.name}
                      selected={currentTheme === theme.name}
                      onChange={() => {
                        onThemeChange(theme)
                        onClose()
                      }}
                      aria-label={theme.name}
                      sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 1,
                        borderRadius: 1,
                        borderColor: 'divider',
                        '&.Mui-selected': {
                          backgroundColor: (theme.palette.primary as PaletteColor)?.main || '#000',
                          color: '#fff',
                          '&:hover': {
                            backgroundColor: (theme.palette.primary as PaletteColor)?.dark || '#000',
                          },
                        },
                      }}
                    >
                      <Box
                        sx={{
                          width: '100%',
                          height: 60,
                          borderRadius: 1,
                          background: theme.background.pattern
                            ? `${theme.background.default} ${theme.background.pattern}`
                            : theme.background.default,
                          backgroundSize: '30px 30px',
                          border: '1px solid',
                          borderColor: 'divider',
                          position: 'relative',
                        }}
                      >
                        <Box
                          sx={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            display: 'flex',
                            gap: 0.5,
                            p: 0.5,
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleEditTheme(theme)
                            }}
                            sx={{
                              bgcolor: 'background.paper',
                              '&:hover': { bgcolor: 'background.paper' },
                            }}
                          >
                            <EditIcon sx={{ fontSize: 16 }} />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleDeleteTheme(theme.name)
                            }}
                            sx={{
                              bgcolor: 'background.paper',
                              '&:hover': { bgcolor: 'background.paper' },
                            }}
                          >
                            <DeleteIcon sx={{ fontSize: 16 }} />
                          </IconButton>
                        </Box>
                      </Box>
                      <Typography variant="body2">
                        {theme.name}
                      </Typography>
                    </ToggleButton>
                    {theme.background.particles && (
                      <FormControlLabel
                        control={
                          <Switch
                            size="small"
                            checked={theme.background.particles.enabled}
                            onChange={() => handleParticlesToggle(theme)}
                          />
                        }
                        label="Particles"
                        sx={{ mt: 1 }}
                      />
                    )}
                  </Box>
                ))}
              </>
            )}
          </Box>
        </DialogContent>
      </Dialog>

      <ThemeEditor
        open={editorOpen}
        onClose={() => {
          setEditorOpen(false)
          setEditingTheme(undefined)
        }}
        onSave={handleSaveTheme}
        editingTheme={editingTheme}
      />
    </>
  )
} 