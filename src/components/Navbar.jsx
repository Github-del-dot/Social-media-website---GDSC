import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { useTheme } from '../contexts/ThemeContext'
import { FaSun, FaMoon, FaUser, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa'

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <nav style={{
      backgroundColor: 'var(--card-background)',
      padding: '1rem',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      boxShadow: '0 2px 4px var(--shadow-color)'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
          SocialApp
        </Link>

        <div className="mobile-menu-button" onClick={toggleMenu} style={{ display: 'none', cursor: 'pointer', fontSize: '1.5rem', '@media (max-width: 768px)': { display: 'block' } }}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </div>

        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`} style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1.5rem',
          '@media (max-width: 768px)': {
            position: 'absolute',
            top: '60px',
            left: 0,
            right: 0,
            backgroundColor: 'var(--card-background)',
            flexDirection: 'column',
            padding: '1rem',
            boxShadow: '0 2px 4px var(--shadow-color)',
            display: isMenuOpen ? 'flex' : 'none'
          }
        }}>
          {isAuthenticated && (
            <>
              <div className="theme-selector" style={{ display: 'flex', gap: '0.5rem' }}>
                <button 
                  onClick={() => toggleTheme('')} 
                  style={{ 
                    backgroundColor: theme === '' ? 'var(--primary-color)' : 'var(--button-background)',
                    padding: '0.3rem 0.6rem'
                  }}
                >
                  <FaMoon />
                </button>
                <button 
                  onClick={() => toggleTheme('light-theme')} 
                  style={{ 
                    backgroundColor: theme === 'light-theme' ? 'var(--primary-color)' : 'var(--button-background)',
                    padding: '0.3rem 0.6rem'
                  }}
                >
                  <FaSun />
                </button>
                <button 
                  onClick={() => toggleTheme('serika-theme')} 
                  style={{ 
                    backgroundColor: theme === 'serika-theme' ? 'var(--primary-color)' : 'var(--button-background)',
                    padding: '0.3rem 0.6rem'
                  }}
                >
                  S
                </button>
                <button 
                  onClick={() => toggleTheme('dracula-theme')} 
                  style={{ 
                    backgroundColor: theme === 'dracula-theme' ? 'var(--primary-color)' : 'var(--button-background)',
                    padding: '0.3rem 0.6rem'
                  }}
                >
                  D
                </button>
              </div>
              
              <Link to={`/user/${user?.id}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <img 
                  src={user?.image || 'https://via.placeholder.com/40'} 
                  alt={user?.firstName} 
                  style={{ width: '30px', height: '30px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <span>{user?.firstName}</span>
              </Link>
              
              <button onClick={handleLogout} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FaSignOutAlt />
                <span>Logout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar