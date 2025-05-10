import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { SpeedInsights } from '@vercel/speed-insights/react'; // 引入 SpeedInsights
import { Analytics } from '@vercel/analytics/react'; // 引入 analytics

const theme = createTheme(); // 可自訂


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
      <SpeedInsights />
      <Analytics />
    </ThemeProvider>
  </StrictMode>,
)
