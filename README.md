# SAT Practice Questions

A website for practicing lots of SAT questions.

## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sat-practice-site
```

2. Install dependencies:
```bash
npm install
```

## Development

To run the application in development mode:

```bash
npm run dev
```

The application will start on `http://localhost:5173` (or another port if 5173 is in use).

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Technologies Used

- React
- TypeScript
- Vite
- KaTeX (for LaTeX rendering)
- Material UI

## Data

The application uses a local JSON file containing SAT practice questions. The questions data is stored in `src/data/questions.json`.

Massive thanks for the OpenSAT team. This project would not be possible without their question bank.

## License

MIT
