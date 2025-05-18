import { useState, useEffect } from 'react'
import { 
  Box, 
  Typography, 
  Button, 
  Paper, 
  Alert, 
  ButtonGroup,
  ToggleButton,
  CircularProgress,
  Divider
} from '@mui/material'
import {
  NavigateBefore as PrevIcon,
  NavigateNext as NextIcon,
  Check as CheckIcon
} from '@mui/icons-material'
import axios from 'axios'
import 'katex/dist/katex.min.css'
import Latex from 'react-latex-next'

interface Question {
  id: string
  domain: string
  visuals: {
    type: string
    svg_content: string
  }
  question: {
    question: string
    paragraph: string
    choices: {
      A: string
      B: string
      C: string
      D: string
    }
    correct_answer: string
    explanation: string
  }
  difficulty: string
}

interface QuestionDisplayProps {
  subject: 'math' | 'english'
}

// Function to convert markdown-style bold to LaTeX bold
const convertBoldToLatex = (text: string): string => {
  // Replace **text** with \textbf{text}
  return text.replace(/\*\*(.*?)\*\*/g, '\\textbf{$1}')
}

const QuestionDisplay = ({ subject }: QuestionDisplayProps) => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [showExplanation, setShowExplanation] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://api.jsonsilo.com/public/942c3c3b-3a0c-4be3-81c2-12029def19f5')
        console.log('API Response:', response.data)
        const subjectQuestions = response.data[subject]
        console.log('Subject Questions:', subjectQuestions)
        if (!subjectQuestions || subjectQuestions.length === 0) {
          setError(`No ${subject} questions available.`)
          return
        }
        console.log('First Question:', subjectQuestions[0])
        setQuestions(subjectQuestions)
        setCurrentQuestionIndex(0)
        setSelectedAnswer('')
        setShowExplanation(false)
      } catch (error) {
        console.error('Error fetching questions:', error)
        setError('Error fetching questions. Please try again later.')
      }
    }

    fetchQuestions()
  }, [subject])

  const currentQuestion = questions[currentQuestionIndex]

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1)
      setSelectedAnswer('')
      setShowExplanation(false)
    }
  }

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
      setSelectedAnswer('')
      setShowExplanation(false)
    }
  }

  const handleSubmit = () => {
    if (!selectedAnswer) {
      setError('Please select an answer')
      return
    }

    const isCorrect = selectedAnswer === currentQuestion.question.correct_answer
    setError('')
    setShowExplanation(true)
  }

  if (error) {
    return <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
  }

  if (!currentQuestion) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Paper elevation={2} sx={{ p: 4 }}>
      <Box mb={3}>
        <Typography variant="h6" gutterBottom>
          Question {currentQuestionIndex + 1} of {questions.length}
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Difficulty: {currentQuestion.difficulty}
        </Typography>
      </Box>

      {subject === 'english' && currentQuestion.question.paragraph && (
        <Box mb={4} sx={{ 
          backgroundColor: theme => theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
          p: 3,
          borderRadius: 1,
          border: theme => `1px solid ${theme.palette.divider}`
        }}>
          <Typography variant="h6" gutterBottom>
            Passage:
          </Typography>
          <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>
            <Latex>{convertBoldToLatex(currentQuestion.question.paragraph)}</Latex>
          </Typography>
        </Box>
      )}

      <Box mb={4}>
        <Typography variant="body1">
          <Latex>{convertBoldToLatex(currentQuestion.question.question)}</Latex>
        </Typography>
      </Box>

      <Box mb={4}>
        {Object.entries(currentQuestion.question.choices).map(([key, value]) => (
          <ToggleButton
            key={key}
            value={key}
            selected={selectedAnswer === key}
            onChange={() => setSelectedAnswer(key)}
            fullWidth
            sx={{
              justifyContent: 'flex-start',
              mb: 1,
              textTransform: 'none',
              py: 1.5
            }}
          >
            <Typography variant="body1">
              <Latex>{convertBoldToLatex(`${key}. ${value}`)}</Latex>
            </Typography>
          </ToggleButton>
        ))}
      </Box>

      {showExplanation && (
        <Box mb={4}>
          <Alert 
            severity={selectedAnswer === currentQuestion.question.correct_answer ? "success" : "error"}
            sx={{ mb: 2 }}
          >
            {selectedAnswer === currentQuestion.question.correct_answer ? 
              "Correct!" : "Incorrect"}
          </Alert>
          <Typography variant="h6" gutterBottom>
            Explanation:
          </Typography>
          <Typography variant="body1">
            <Latex>{convertBoldToLatex(currentQuestion.question.explanation)}</Latex>
          </Typography>
        </Box>
      )}

      <Divider sx={{ my: 3 }} />

      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Button
          variant="outlined"
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex === 0}
          startIcon={<PrevIcon />}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={!selectedAnswer || showExplanation}
          endIcon={<CheckIcon />}
        >
          Submit
        </Button>
        <Button
          variant="outlined"
          onClick={handleNextQuestion}
          disabled={currentQuestionIndex === questions.length - 1}
          endIcon={<NextIcon />}
        >
          Next
        </Button>
      </Box>
    </Paper>
  )
}

export default QuestionDisplay 