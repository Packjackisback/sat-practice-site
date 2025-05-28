import {
  Dialog, 
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material'
import Question from './QuestionDisplay'

interface FlaggedQuestionsPanelProps {
  open: boolean
  onClose: () => void
  flaggedQuestions: Set<string>
  questions: Question[]
  onSelectQuestion: (index: number) => void
}


const FlaggedQuestionsPanel = ({
  open,
  onClose,
  flaggedQuestions,
  questions,
  onSelectQuestion
}: FlaggedQuestionsPanelProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Flagged Questions</DialogTitle>
      <DialogContent>
        <List>
          {[...flaggedQuestions].map(flaggedId => {
            const index = questions.findIndex(q => q.id === flaggedId)
            if (index === -1) return null
            const q = questions[index]
            return (
              <ListItem
                key={flaggedId}
                divider
                secondaryAction={
                  <Button
                    onClick={() => {
                      onSelectQuestion(index)
                      onClose()
                    }}
                    size="small"
                    variant="outlined"
                  >
                    Go to
                  </Button>
                }
              >
                <ListItemText
                  primary={`Question ${index + 1}`}
                  secondary={`Difficulty: ${q.difficulty} — Domain: ${q.domain}`}
                />
              </ListItem>
            )
          })}
          {flaggedQuestions.size === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              No questions flagged.
            </Typography>
          )}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  )
}

export default FlaggedQuestionsPanel
