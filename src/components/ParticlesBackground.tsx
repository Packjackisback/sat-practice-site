import { useCallback } from 'react'
import { Particles } from 'react-tsparticles'
import { loadSlim } from 'tsparticles-slim'
import type { Engine } from 'tsparticles-engine'
import { Box } from '@mui/material'

interface ParticlesBackgroundProps {
  options: any
}

export default function ParticlesBackground({ options }: ParticlesBackgroundProps) {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <Particles
        init={particlesInit}
        options={options}
      />
    </Box>
  )
} 