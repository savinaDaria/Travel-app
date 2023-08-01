import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './slices/store.ts'
import { ToastContainer } from 'react-toastify'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
       <ToastContainer className="notification" />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
