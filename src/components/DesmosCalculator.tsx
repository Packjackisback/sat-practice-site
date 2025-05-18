import { useState, useCallback } from 'react'
import { Box, IconButton, Paper } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import DragIndicatorIcon from '@mui/icons-material/DragIndicator'

interface DesmosCalculatorProps {
  onClose: () => void
  isOpen: boolean
}

const MIN_WIDTH = 300
const MIN_HEIGHT = 400

const DesmosCalculator = ({ onClose, isOpen }: DesmosCalculatorProps) => {
  const [size, setSize] = useState({ width: 400, height: 500 })
  const [position, setPosition] = useState<{ x: number, y: number | string }>({ x: 20, y: '50%' })
  const [isResizing, setIsResizing] = useState(false)
  const [isDragging, setIsDragging] = useState(false)

  const handleDragStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsDragging(true)

    const startX = e.pageX
    const startY = e.pageY
    const startPosX = position.x
    const startPosY = typeof position.y === 'string' ? window.innerHeight / 2 : position.y

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.pageX - startX
      const deltaY = e.pageY - startY
      const newX = startPosX + deltaX
      const newY = startPosY + deltaY
      setPosition({ 
        x: Math.max(0, Math.min(window.innerWidth - size.width, newX)),
        y: Math.max(0, Math.min(window.innerHeight - size.height, newY))
      })
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }, [position, size])

  const handleResizeStart = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    setIsResizing(true)

    const startX = e.pageX
    const startY = e.pageY
    const startWidth = size.width
    const startHeight = size.height

    const handleMouseMove = (e: MouseEvent) => {
      const newWidth = Math.max(MIN_WIDTH, startWidth + e.pageX - startX)
      const newHeight = Math.max(MIN_HEIGHT, startHeight + e.pageY - startY)
      setSize({ width: newWidth, height: newHeight })
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }, [size])

  return (
    <Paper
      elevation={4}
      sx={{
        position: 'fixed',
        right: typeof position.x === 'number' ? 'auto' : position.x,
        left: typeof position.x === 'number' ? position.x : 'auto',
        top: position.y,
        transform: typeof position.y === 'string' ? 'translateY(-50%)' : 'none',
        width: size.width,
        height: size.height,
        zIndex: 1000,
        display: isOpen ? 'flex' : 'none',
        flexDirection: 'column',
        overflow: 'hidden',
        resize: 'both',
        transition: (isResizing || isDragging) ? 'none' : 'width 0.2s, height 0.2s',
        cursor: isDragging ? 'move' : 'default'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          p: 0.5,
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <IconButton
          size="small"
          sx={{
            cursor: 'move',
            '&:hover': {
              backgroundColor: 'action.hover',
            },
          }}
          onMouseDown={handleDragStart}
        >
          <DragIndicatorIcon />
        </IconButton>
        <IconButton size="small" onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          flexGrow: 1,
          '& > iframe': {
            border: 'none',
            width: '100%',
            height: '100%',
          },
        }}
      >
        <iframe
          src="https://www.desmos.com/testing/cb-sat-ap/graphing"
          title="SAT Calculator"
          allow="fullscreen"
        />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: 20,
          height: 20,
          cursor: 'nwse-resize',
          backgroundColor: 'transparent',
          '&::before': {
            content: '""',
            position: 'absolute',
            right: 3,
            bottom: 3,
            width: 8,
            height: 8,
            borderRight: '2px solid',
            borderBottom: '2px solid',
            borderColor: 'text.disabled',
          },
        }}
        onMouseDown={handleResizeStart}
      />
    </Paper>
  )
}

export default DesmosCalculator 