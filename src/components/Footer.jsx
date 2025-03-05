import { useTheme } from '../contexts/ThemeContext'

const Footer = () => {
  const { theme, toggleTheme } = useTheme()
  
  const themes = [
    { id: '', name: 'Dark' },
    { id: 'light-theme', name: 'Light' },
    { id: 'serika-theme', name: 'Serika' },
    { id: 'dracula-theme', name: 'Dracula' }
  ]
  
  return (
    <footer style={{
      backgroundColor: 'var(--card-background)',
      padding: '1rem',
      textAlign: 'center',
      boxShadow: '0 -2px 4px var(--shadow-color)'
    }}>
      <div className="container">
        <div style={{ marginBottom: '1rem' }}>
          <p>© 2025 SocialApp. All rights reserved.</p>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          {themes.map((t) => (
            <button
              key={t.id}
              onClick={() => toggleTheme(t.id)}
              style={{
                backgroundColor: theme === t.id ? 'var(--primary-color)' : 'var(--button-background)',
                padding: '0.3rem 0.6rem',
                fontSize: '0.8rem'
              }}
            >
              {t.name}
            </button>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer