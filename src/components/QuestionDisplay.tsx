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
  Divider,
  TextField,
  IconButton,
  Tooltip
} from '@mui/material'
import {
  NavigateBefore as PrevIcon,
  NavigateNext as NextIcon,
  Check as CheckIcon,
  KeyboardReturn as GoIcon,
  Calculate as CalculatorIcon
} from '@mui/icons-material'
import axios from 'axios'
import 'katex/dist/katex.min.css'
import Latex from 'react-latex-next'
import DesmosCalculator from './DesmosCalculator'

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

const formatQuestionText = (text: string): string => {
  text = text.replace(/\*/g, '')
  return text
}

const QuestionDisplay = ({ subject }: QuestionDisplayProps) => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState('')
  const [showExplanation, setShowExplanation] = useState(false)
  const [error, setError] = useState('')
  const [jumpToQuestion, setJumpToQuestion] = useState('')
  const [showCalculator, setShowCalculator] = useState(false)

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

  const handleJumpToQuestion = () => {
    const questionNumber = parseInt(jumpToQuestion)
    if (isNaN(questionNumber) || questionNumber < 1 || questionNumber > questions.length) {
      setError(`Please enter a valid question number between 1 and ${questions.length}`)
      return
    }
    setCurrentQuestionIndex(questionNumber - 1)
    setSelectedAnswer('')
    setShowExplanation(false)
    setJumpToQuestion('')
    setError('')
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
      <Box mb={3} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Question {currentQuestionIndex + 1} of {questions.length}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {subject === 'math' && (
            <Tooltip title="Toggle Calculator">
              <IconButton
                onClick={() => setShowCalculator(prev => !prev)}
                color={showCalculator ? 'primary' : 'default'}
                size="small"
              >
                <CalculatorIcon />
              </IconButton>
            </Tooltip>
          )}
          <TextField
            size="small"
            label="Go to #"
            value={jumpToQuestion}
            onChange={(e) => {
              setJumpToQuestion(e.target.value)
              setError('')
            }}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleJumpToQuestion()
              }
            }}
            type="number"
            inputProps={{
              min: 1,
              max: questions.length,
              style: { width: '80px' }
            }}
          />
          <Tooltip title="Go to question">
            <IconButton
              onClick={handleJumpToQuestion}
              color="primary"
              size="small"
            >
              <GoIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Difficulty: {currentQuestion.difficulty}
      </Typography>

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
            <Latex>{formatQuestionText(currentQuestion.question.paragraph)}</Latex>
          </Typography>
        </Box>
      )}

      <Box mb={4}>
        <Typography variant="body1" gutterBottom>
          <Latex>{formatQuestionText(currentQuestion.question.question)}</Latex>
        </Typography>
      </Box>

      <Box mb={4}>
        <ButtonGroup
          orientation="vertical"
          fullWidth
          sx={{ gap: 1 }}
        >
          {Object.entries(currentQuestion.question.choices).map(([letter, choice]) => (
            <ToggleButton
              key={letter}
              value={letter}
              selected={selectedAnswer === letter}
              onChange={() => setSelectedAnswer(letter)}
              sx={{
                justifyContent: 'flex-start',
                textAlign: 'left',
                py: 1.5,
                px: 2,
                gap: 2,
              }}
            >
              <Typography component="span" sx={{ minWidth: '24px' }}>
                {letter}.
              </Typography>
              <Typography component="span">
                <Latex>{formatQuestionText(choice)}</Latex>
              </Typography>
            </ToggleButton>
          ))}
        </ButtonGroup>
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
            <Latex>{formatQuestionText(currentQuestion.question.explanation)}</Latex>
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

      {subject === 'math' && (
        <DesmosCalculator onClose={() => setShowCalculator(false)} isOpen={showCalculator} />
      )}
    </Paper>
  )
}

export default QuestionDisplay 