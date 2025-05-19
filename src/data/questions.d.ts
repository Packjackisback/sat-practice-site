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

interface QuestionsData {
  math: Question[]
  english: Question[]
}

declare const questions: QuestionsData
export default questions 