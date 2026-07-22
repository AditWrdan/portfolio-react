import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'

const root = createRoot(document.getElementById('root')!)

const hasSupabaseConfig =
  Boolean(import.meta.env.VITE_SUPABASE_URL) &&
  Boolean(import.meta.env.VITE_SUPABASE_ANON_KEY)

if (hasSupabaseConfig) {
  import('./App.tsx').then(({ default: App }) => {
    root.render(
      <StrictMode>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StrictMode>,
    )
  })
} else {
  import('./components/SupabaseSetupNotice.tsx').then(
    ({ default: SupabaseSetupNotice }) => {
      root.render(
        <StrictMode>
          <SupabaseSetupNotice />
        </StrictMode>,
      )
    },
  )
}
