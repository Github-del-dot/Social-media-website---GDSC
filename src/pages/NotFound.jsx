import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      minHeight: '60vh'
    }}>
      <h1 style={{ fontSize: '4rem', marginBottom: '1rem' }}>404</h1>
      <h2 style={{ marginBottom: '2rem' }}>Page Not Found</h2>
      <p style={{ marginBottom: '2rem', maxWidth: '500px' }}>
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link to="/" style={{ 
        backgroundColor: 'var(--primary-color)',
        color: 'white',
        padding: '0.75rem 1.5rem',
        borderRadius: '8px',
        fontWeight: 'bold',
        fontSize: '1.1rem'
      }}>
        Go Home
      </Link>
    </div>
  )
}

export default NotFound