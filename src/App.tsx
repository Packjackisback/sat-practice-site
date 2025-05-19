import { useState, useMemo, useEffect } from 'react'
import { 
  Container, 
  Typography, 
  Button, 
  Box, 
  ThemeProvider, 
  createTheme, 
  CssBaseline,
  IconButton,
  useMediaQuery,
  Paper,
  AppBar,
  Toolbar,
  Tooltip,
} from '@mui/material'
import {
  Palette as ThemeIcon,
  GitHub as GitHubIcon,
} from '@mui/icons-material'
import QuestionDisplay from './components/QuestionDisplay'
import ThemeSelector from './components/ThemeSelector'
import ParticlesBackground from './components/ParticlesBackground'
import { type ThemeOption, themes } from './themes'

function App() {
  const [subject, setSubject] = useState<'math' | 'english' | null>(null)
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  
  const [selectedTheme, setSelectedTheme] = useState<ThemeOption>(() => {
    const savedTheme = localStorage.getItem('selectedTheme')
    const savedCustomThemes = localStorage.getItem('customThemes')
    
    if (savedTheme) {
      const parsedTheme = JSON.parse(savedTheme)
      if (savedCustomThemes) {
        const customThemes = JSON.parse(savedCustomThemes)
        const customTheme = customThemes.find((t: ThemeOption) => t.name === parsedTheme.name)
        if (customTheme) {
          return customTheme
        }
      }
      const builtInTheme = themes.find(t => t.name === parsedTheme.name)
      if (builtInTheme) {
        return builtInTheme
      }
    }
    return prefersDarkMode ? themes[3] : themes[0]
  })

  const [themeDialogOpen, setThemeDialogOpen] = useState(false)

  // save theme to localstorage
  useEffect(() => {
    localStorage.setItem('selectedTheme', JSON.stringify(selectedTheme))
  }, [selectedTheme])

  const theme = useMemo(
    () => createTheme({
      palette: selectedTheme.palette,
    }),
    [selectedTheme]
  )

  const handleThemeChange = (newTheme: ThemeOption) => {
    setSelectedTheme(newTheme)
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: selectedTheme.background?.pattern && !selectedTheme.background?.particles?.enabled
            ? `${selectedTheme.background.default} ${selectedTheme.background.pattern}`
            : selectedTheme.background?.default,
          backgroundSize: '30px 30px',
          transition: 'background 0.3s ease-in-out',
          position: 'relative',
        }}
      >
        {selectedTheme.background?.particles?.enabled && (
          <ParticlesBackground options={selectedTheme.background.particles.options} />
        )}
        
        <AppBar 
          position="sticky" 
          elevation={2}
          sx={{
            backgroundColor: 'background.paper',
            color: 'text.primary',
            borderBottom: 1,
            borderColor: 'divider',
            position: 'relative',
            zIndex: 1,
          }}
        >
          <Toolbar>
            <Typography 
              variant="h6" 
              component="h1" 
              sx={{ 
                flexGrow: 1,
                fontWeight: 'bold',
              }}
            >
              Jackson's SAT Practice
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Tooltip title="View source on GitHub">
                <IconButton
                  component="a"
                  href="https://github.com/Packjackisback/sat-practice-site"
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: 'text.primary',
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <GitHubIcon />
                </IconButton>
              </Tooltip>
              <IconButton
                onClick={() => setThemeDialogOpen(true)}
                sx={{
                  color: 'text.primary',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <ThemeIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </AppBar>

        <ThemeSelector
          open={themeDialogOpen}
          onClose={() => setThemeDialogOpen(false)}
          currentTheme={selectedTheme.name}
          onThemeChange={handleThemeChange}
        />

        <Container maxWidth="lg" sx={{ py: 4 }}>
          {!subject ? (
            <Paper 
              elevation={3} 
              sx={{ 
                p: 4,
                backgroundColor: 'background.paper',
                borderRadius: 2,
              }}
            >
              <Typography variant="h4" component="h2" align="center" gutterBottom>
                Choose a Subject
              </Typography>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: 'column', 
                maxWidth: 400, 
                mx: 'auto', 
                gap: 2 
              }}>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={() => setSubject('math')}
                  fullWidth
                >
                  Mathematics
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => setSubject('english')}
                  fullWidth
                >
                  English
                </Button>
              </Box>
            </Paper>
          ) : (
            <Box>
              <Button
                variant="contained"
                onClick={() => setSubject(null)}
                sx={{ mb: 3 }}
                startIcon={<span>←</span>}
              >
                Back to Subject Selection
              </Button>
              <QuestionDisplay subject={subject} />
            </Box>
          )}
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
