import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from "react-router-dom";
import App from './App.tsx'
import { CategoryProvider } from './context/category-context.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>  
      <CategoryProvider>
        <App />
      </CategoryProvider>
    </Router>
  </React.StrictMode>,
)
