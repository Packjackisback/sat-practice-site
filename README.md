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
- Axios (for API requests)

## API

The application uses the JSON API at:
`https://api.jsonsilo.com/public/942c3c3b-3a0c-4be3-81c2-12029def19f5`

Massive thanks for the OpenSAT team. This project would not be possible without their question bank.

## License

MIT
