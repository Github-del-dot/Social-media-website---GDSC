import { useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import { useTheme } from './contexts/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Login from './pages/Login'
import Home from './pages/Home'
import PostDetails from './pages/PostDetails'
import UserProfile from './pages/UserProfile'
import NotFound from './pages/NotFound'

function App() {
  const { isAuthenticated } = useAuth()
  const { theme } = useTheme()
  
  useEffect(() => {
    document.body.className = theme
  }, [theme])

  return (
    <div className="app">
      <Navbar />
      <main className="container" style={{ minHeight: 'calc(100vh - 140px)', paddingTop: '80px', paddingBottom: '20px' }}>
        <Routes>
          <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
          <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
          <Route path="/post/:id" element={isAuthenticated ? <PostDetails /> : <Navigate to="/login" />} />
          <Route path="/user/:id" element={isAuthenticated ? <UserProfile /> : <Navigate to="/login" />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App