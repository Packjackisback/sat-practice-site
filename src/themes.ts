import type { PaletteOptions } from '@mui/material'

export interface ThemeOption {
  name: string
  palette: PaletteOptions
  background: {
    default: string
    pattern?: string
    particles?: {
      enabled: boolean
      options: {
        particles: {
          color: {
            value: string
          }
          links: {
            color: string
            enable: boolean
            opacity: number
            distance: number
          }
          move: {
            enable: boolean
            speed: number
          }
          size: {
            value: number
          }
          opacity: {
            value: number
          }
          number: {
            value: number
            density: {
              enable: boolean
              area: number
            }
          }
        }
        background: {
          color: string
        }
        detectRetina: boolean
        fpsLimit: number
        interactivity: {
          events: {
            onHover: {
              enable: boolean
              mode: string
            }
            onClick: {
              enable: boolean
              mode: string
            }
          }
          modes: {
            grab: {
              distance: number
              links: {
                opacity: number
              }
            }
            push: {
              quantity: number
            }
          }
        }
      }
    }
  }
}

const createParticleOptions = (color: string) => ({
  enabled: false,
  options: {
    particles: {
      color: {
        value: color
      },
      links: {
        color: color,
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
})

export const themes: ThemeOption[] = [
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
      particles: createParticleOptions('#928374')
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
      particles: createParticleOptions('#928374')
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
      particles: createParticleOptions('#6C7086')
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
      particles: createParticleOptions('#ACB0BE')
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
      particles: createParticleOptions('#4C566A')
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
      particles: createParticleOptions('#6272A4')
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
      particles: createParticleOptions('#565F89')
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
      particles: createParticleOptions('#93A1A1')
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
      particles: createParticleOptions('#4B5263')
    },
  },
] 