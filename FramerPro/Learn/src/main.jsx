import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CssAnimation from './CssAnimation.jsx';

createRoot(document.getElementById('root')).render(
    <CssAnimation />
)
