import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/LoginPage'
import Register from './pages/RegisterPage'
import ForgotPassword from './pages/ForgotPasswordPage'
import ResetPassword from './pages/ResetPasswordPage'
import Dashboard from './pages/DashboardPage'
import NotFound from './pages/NotFoundPage'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { DataContextProvider } from './context/DataContextProvider'
import PrivateRoutes from './utils/ProtectedRoutes'
import PrivateRoutesAfterAuth from './utils/ProtectedRoutesAfterAuth'


function App() {

  const theme = createTheme({
    //Custom Code Here
  });

  return (

    <DataContextProvider>
    <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path='/dashboard' element={<Dashboard />}/>
            </Route>
            <Route element={<PrivateRoutesAfterAuth />}>
              <Route path='/' element={<Login />}/>
              <Route path='/register' element={<Register />}/>
              <Route path='/forgot-password' element={<ForgotPassword />}/>
              <Route path='/reset-password/:token/' element={<ResetPassword />}/>
            </Route>
            <Route path='*' element={<NotFound />}/>
          </Routes>
        </Router>
    </ThemeProvider>
    </DataContextProvider>
  )
}

export default App
