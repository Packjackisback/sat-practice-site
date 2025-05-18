import { useState } from 'react';
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
} from '@mui/material';
import { Close as CloseIcon, Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import type { PaletteOptions } from '@mui/material/styles';
import ThemeEditor from './ThemeEditor';

export interface ThemeOption {
  name: string;
  palette: PaletteOptions;
  background: {
    default: string;
    pattern?: string;
  };
}

const themes: ThemeOption[] = [
  {
    name: 'Gruvbox Light',
    palette: {
      mode: 'light',
      primary: {
        main: '#458588',
        light: '#83A598',
        dark: '#076678',
      },
      secondary: {
        main: '#B8BB26',
        light: '#98971A',
        dark: '#79740E',
      },
      background: {
        default: '#FBF1C7',
        paper: '#F9F5D7',
      },
      text: {
        primary: '#3C3836',
        secondary: '#504945',
      },
    },
    background: {
      default: '#FBF1C7',
      pattern: 'radial-gradient(circle at 1px 1px, #928374 1px, transparent 0) 0 0/40px 40px',
    },
  },
  {
    name: 'Gruvbox Dark',
    palette: {
      mode: 'dark',
      primary: {
        main: '#83A598',
        light: '#8EC07C',
        dark: '#689D6A',
      },
      secondary: {
        main: '#B8BB26',
        light: '#98971A',
        dark: '#79740E',
      },
      background: {
        default: '#282828',
        paper: '#32302F',
      },
      text: {
        primary: '#EBDBB2',
        secondary: '#D5C4A1',
      },
    },
    background: {
      default: '#282828',
      pattern: 'radial-gradient(circle at 1px 1px, #928374 1px, transparent 0) 0 0/40px 40px',
    },
  },
  {
    name: 'Catppuccin Mocha',
    palette: {
      mode: 'dark',
      primary: {
        main: '#89B4FA',
        light: '#B4BEFE',
        dark: '#738AAC',
      },
      secondary: {
        main: '#F5C2E7',
        light: '#F5C2E7',
        dark: '#C69ECF',
      },
      background: {
        default: '#1E1E2E',
        paper: '#24273A',
      },
      text: {
        primary: '#CDD6F4',
        secondary: '#BAC2DE',
      },
    },
    background: {
      default: '#1E1E2E',
      pattern: 'radial-gradient(circle at 1px 1px, #6C7086 1px, transparent 0) 0 0/40px 40px',
    },
  },
  {
    name: 'Catppuccin Latte',
    palette: {
      mode: 'light',
      primary: {
        main: '#7287FD',
        light: '#8839EF',
        dark: '#5B6078',
      },
      secondary: {
        main: '#EA76CB',
        light: '#DD7878',
        dark: '#8839EF',
      },
      background: {
        default: '#EFF1F5',
        paper: '#F4F5F8',
      },
      text: {
        primary: '#4C4F69',
        secondary: '#5C5F77',
      },
    },
    background: {
      default: '#EFF1F5',
      pattern: 'radial-gradient(circle at 1px 1px, #ACB0BE 1px, transparent 0) 0 0/40px 40px',
    },
  },
  {
    name: 'Nord',
    palette: {
      mode: 'dark',
      primary: {
        main: '#88C0D0',
        light: '#8FBCBB',
        dark: '#81A1C1',
      },
      secondary: {
        main: '#B48EAD',
        light: '#A3BE8C',
        dark: '#BF616A',
      },
      background: {
        default: '#2E3440',
        paper: '#3B4252',
      },
      text: {
        primary: '#ECEFF4',
        secondary: '#E5E9F0',
      },
    },
    background: {
      default: '#2E3440',
      pattern: 'radial-gradient(circle at 1px 1px, #4C566A 1px, transparent 0) 0 0/40px 40px',
    },
  },
  {
    name: 'Dracula',
    palette: {
      mode: 'dark',
      primary: {
        main: '#BD93F9',
        light: '#FF79C6',
        dark: '#6272A4',
      },
      secondary: {
        main: '#50FA7B',
        light: '#8BE9FD',
        dark: '#FFB86C',
      },
      background: {
        default: '#282A36',
        paper: '#44475A',
      },
      text: {
        primary: '#F8F8F2',
        secondary: '#BFBFBF',
      },
    },
    background: {
      default: '#282A36',
      pattern: 'radial-gradient(circle at 1px 1px, #6272A4 1px, transparent 0) 0 0/40px 40px',
    },
  },
  {
    name: 'Tokyo Night',
    palette: {
      mode: 'dark',
      primary: {
        main: '#7AA2F7',
        light: '#2AC3DE',
        dark: '#565F89',
      },
      secondary: {
        main: '#BB9AF7',
        light: '#7DCFFF',
        dark: '#9AA5CE',
      },
      background: {
        default: '#1A1B26',
        paper: '#24283B',
      },
      text: {
        primary: '#C0CAF5',
        secondary: '#A9B1D6',
      },
    },
    background: {
      default: '#1A1B26',
      pattern: 'radial-gradient(circle at 1px 1px, #565F89 1px, transparent 0) 0 0/40px 40px',
    },
  },
  {
    name: 'Solarized Light',
    palette: {
      mode: 'light',
      primary: {
        main: '#268BD2',
        light: '#2AA198',
        dark: '#6C71C4',
      },
      secondary: {
        main: '#859900',
        light: '#CB4B16',
        dark: '#D33682',
      },
      background: {
        default: '#FDF6E3',
        paper: '#EEE8D5',
      },
      text: {
        primary: '#073642',
        secondary: '#586E75',
      },
    },
    background: {
      default: '#FDF6E3',
      pattern: 'radial-gradient(circle at 1px 1px, #93A1A1 1px, transparent 0) 0 0/40px 40px',
    },
  },
  {
    name: 'One Dark',
    palette: {
      mode: 'dark',
      primary: {
        main: '#61AFEF',
        light: '#56B6C2',
        dark: '#528BFF',
      },
      secondary: {
        main: '#98C379',
        light: '#E5C07B',
        dark: '#C678DD',
      },
      background: {
        default: '#282C34',
        paper: '#21252B',
      },
      text: {
        primary: '#ABB2BF',
        secondary: '#828997',
      },
    },
    background: {
      default: '#282C34',
      pattern: 'radial-gradient(circle at 1px 1px, #4B5263 1px, transparent 0) 0 0/40px 40px',
    },
  },
];

interface ThemeSelectorProps {
  open: boolean;
  onClose: () => void;
  currentTheme: string;
  onThemeChange: (theme: ThemeOption) => void;
}

export default function ThemeSelector({ open, onClose, currentTheme, onThemeChange }: ThemeSelectorProps) {
  const [customThemes, setCustomThemes] = useState<ThemeOption[]>([]);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingTheme, setEditingTheme] = useState<ThemeOption | undefined>();

  const handleSaveTheme = (theme: ThemeOption) => {
    if (editingTheme) {
      setCustomThemes(prev => 
        prev.map(t => t.name === editingTheme.name ? theme : t)
      );
    } else {
      setCustomThemes(prev => [...prev, theme]);
    }
    onThemeChange(theme);
  };

  const handleEditTheme = (theme: ThemeOption) => {
    setEditingTheme(theme);
    setEditorOpen(true);
  };

  const handleDeleteTheme = (themeName: string) => {
    setCustomThemes(prev => prev.filter(t => t.name !== themeName));
  };

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
                setEditingTheme(undefined);
                setEditorOpen(true);
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

            {themes.map((theme) => (
              <ToggleButton
                key={theme.name}
                value={theme.name}
                selected={currentTheme === theme.name}
                onChange={() => {
                  onThemeChange(theme);
                  onClose();
                }}
                aria-label={theme.name}
                sx={{
                  p: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 1,
                  borderRadius: 1,
                  borderColor: theme => theme.palette.divider,
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.primary?.main || theme.palette.primary,
                    color: '#fff',
                    '&:hover': {
                      backgroundColor: theme.palette.primary?.dark || theme.palette.primary,
                    },
                  },
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: 60,
                    borderRadius: 1,
                    background: theme.background?.pattern
                      ? `${theme.background.default} ${theme.background.pattern}`
                      : theme.background?.default,
                    backgroundSize: '30px 30px',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                />
                <Typography variant="body2">
                  {theme.name}
                </Typography>
              </ToggleButton>
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
                  <ToggleButton
                    key={theme.name}
                    value={theme.name}
                    selected={currentTheme === theme.name}
                    onChange={() => {
                      onThemeChange(theme);
                      onClose();
                    }}
                    aria-label={theme.name}
                    sx={{
                      p: 2,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 1,
                      borderRadius: 1,
                      borderColor: theme => theme.palette.divider,
                      '&.Mui-selected': {
                        backgroundColor: theme.palette.primary?.main || theme.palette.primary,
                        color: '#fff',
                        '&:hover': {
                          backgroundColor: theme.palette.primary?.dark || theme.palette.primary,
                        },
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        height: 60,
                        borderRadius: 1,
                        background: theme.background?.pattern
                          ? `${theme.background.default} ${theme.background.pattern}`
                          : theme.background?.default,
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
                            e.stopPropagation();
                            handleEditTheme(theme);
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
                            e.stopPropagation();
                            handleDeleteTheme(theme.name);
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
                ))}
              </>
            )}
          </Box>
        </DialogContent>
      </Dialog>

      <ThemeEditor
        open={editorOpen}
        onClose={() => {
          setEditorOpen(false);
          setEditingTheme(undefined);
        }}
        onSave={handleSaveTheme}
        editingTheme={editingTheme}
      />
    </>
  );
}

export { themes }; 