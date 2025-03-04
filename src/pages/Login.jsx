import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { login, loading, error } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await login(username, password)
    if (success) {
      navigate('/')
    }
  }

  const handleDemoLogin = async () => {
    setUsername('emilys')
    setPassword('emilyspass')
    const success = await login('emilys', 'emilyspass')
    if (success) {
      navigate('/')
    }
  }

  return (
    <div style={{ 
      maxWidth: '400px', 
      margin: '0 auto', 
      marginTop: '2rem',
      padding: '2rem',
      backgroundColor: 'var(--card-background)',
      borderRadius: '8px',
      boxShadow: '0 4px 6px var(--shadow-color)'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>Login</h1>
      
      {error && (
        <div style={{ 
          backgroundColor: 'var(--error-color)', 
          color: 'white', 
          padding: '0.75rem', 
          borderRadius: '4px',
          marginBottom: '1rem'
        }}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="username" style={{ display: 'block', marginBottom: '0.5rem' }}>Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </div>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            width: '100%', 
            backgroundColor: 'var(--primary-color)',
            color: 'white',
            padding: '0.75rem',
            fontSize: '1rem'
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      
      <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        <p>Demo credentials:</p>
        <p>Username: emilys</p>
        <p>Password: emilyspass</p>
        <button 
          onClick={handleDemoLogin}
          style={{ 
            marginTop: '1rem',
            backgroundColor: 'var(--secondary-color)',
            color: 'white'
          }}
        >
          Login with Demo Account
        </button>
      </div>
    </div>
  )
}

export default Login