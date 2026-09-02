import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import { TooltipProvider } from './components/ui/tooltip'
import { ThemeProvider } from './hooks/theme-provider'
import { I18nProvider } from './lib/i18n'
import { registerServiceWorker } from './lib/register-sw'

registerServiceWorker()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <I18nProvider>
      <ThemeProvider>
        <BrowserRouter>
          <TooltipProvider>
            <App />
          </TooltipProvider>
        </BrowserRouter>
      </ThemeProvider>
    </I18nProvider>
  </StrictMode>,
)
