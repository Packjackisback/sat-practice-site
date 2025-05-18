import { useEffect, useRef } from 'react'
import { Box, IconButton, Paper } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'

declare global {
  interface Window {
    Desmos: {
      GraphingCalculator: (
        container: HTMLElement,
        options?: {
          administeringTest?: boolean
          lockViewport?: boolean
          trace?: boolean
          showResetButtonOnGraphpaper?: boolean
          graphpaper?: boolean
          expressions?: boolean
          settingsMenu?: boolean
          zoomButtons?: boolean
          pointsOfInterest?: boolean
          border?: boolean
          expressionsTopbar?: boolean
          lockCalculator?: boolean
          images?: boolean
          folders?: boolean
          notes?: boolean
          sliders?: boolean
          links?: boolean
          distributions?: boolean
          restrictedFunctions?: boolean
          pasteGraphLink?: boolean
          showGrid?: boolean
          showXAxis?: boolean
          showYAxis?: boolean
          xAxisLabel?: string
          yAxisLabel?: string
          xAxisStep?: number
          yAxisStep?: number
        }
      ) => {
        destroy: () => void
      }
    }
  }
}

interface DesmosCalculatorProps {
  onClose: () => void
}

const DesmosCalculator = ({ onClose }: DesmosCalculatorProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const calculatorRef = useRef<any>(null)

  useEffect(() => {
    if (containerRef.current && !calculatorRef.current) {
      // Create calculator instance with SAT-specific settings
      calculatorRef.current = window.Desmos.GraphingCalculator(containerRef.current, {
        administeringTest: true,
        lockViewport: false,
        trace: false,
        showResetButtonOnGraphpaper: true,
        graphpaper: true,
        expressions: true,
        settingsMenu: false,
        zoomButtons: true,
        pointsOfInterest: false,
        border: true,
        expressionsTopbar: true,
        lockCalculator: false,
        images: false,
        folders: false,
        notes: false,
        sliders: false,
        links: false,
        distributions: false,
        restrictedFunctions: true,
        pasteGraphLink: false,
        showGrid: true,
        showXAxis: true,
        showYAxis: true,
        xAxisLabel: 'x',
        yAxisLabel: 'y',
        xAxisStep: 1,
        yAxisStep: 1
      })
    }

    return () => {
      if (calculatorRef.current) {
        calculatorRef.current.destroy()
      }
    }
  }, [])

  return (
    <Paper
      elevation={4}
      sx={{
        position: 'fixed',
        right: 20,
        top: '50%',
        transform: 'translateY(-50%)',
        width: 400,
        height: 500,
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden', // Prevent content overflow
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 0.5,
          bgcolor: 'background.paper',
        }}
      >
        <IconButton size="small" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box
        ref={containerRef}
        sx={{
          flexGrow: 1,
          '& > *': { // Target the Desmos container
            height: '100% !important',
            width: '100% !important',
          },
        }}
      />
    </Paper>
  )
}

export default DesmosCalculator 