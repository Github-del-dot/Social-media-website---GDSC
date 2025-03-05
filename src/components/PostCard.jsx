import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FaHeart, FaComment } from 'react-icons/fa'

const PostCard = ({ post }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`https://dummyjson.com/users/${post.userId}`)
        setUser(response.data)
      } catch (err) {
        console.error('Error fetching user:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [post.userId])

  return (
    <div style={{ 
      backgroundColor: 'var(--card-background)',
      borderRadius: '8px',
      padding: '1.5rem',
      marginBottom: '1.5rem',
      boxShadow: '0 2px 4px var(--shadow-color)',
      transition: 'transform 0.3s ease',
      cursor: 'pointer'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
        {loading ? (
          <div style={{ 
            width: '40px', 
            height: '40px', 
            borderRadius: '50%', 
            backgroundColor: 'var(--border-color)',
            marginRight: '1rem'
          }}></div>
        ) : (
          <Link to={`/user/${user?.id}`}>
            <img 
              src={user?.image || 'https://via.placeholder.com/40'} 
              alt={user?.firstName} 
              style={{ 
                width: '40px', 
                height: '40px', 
                borderRadius: '50%', 
                objectFit: 'cover',
                marginRight: '1rem'
              }}
            />
          </Link>
        )}
        
        <div>
          {loading ? (
            <div style={{ 
              width: '100px', 
              height: '20px', 
              backgroundColor: 'var(--border-color)',
              borderRadius: '4px',
              marginBottom: '0.25rem'
            }}></div>
          ) : (
            <Link to={`/user/${user?.id}`} style={{ fontWeight: 'bold' }}>
              {user?.firstName} {user?.lastName}
            </Link>
          )}
        </div>
      </div>
      
      <Link to={`/post/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <h2 style={{ marginBottom: '0.5rem' }}>{post.title}</h2>
        <p style={{ marginBottom: '1rem' }}>{post.body}</p>
      </Link>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '1rem' }}>
        {post.tags.map(tag => (
          <span 
            key={tag} 
            style={{ 
              backgroundColor: 'var(--primary-color)',
              color: 'white',
              padding: '0.2rem 0.5rem',
              borderRadius: '4px',
              fontSize: '0.8rem',
              marginRight: '0.5rem',
              marginBottom: '0.5rem'
            }}
          >
            #{tag}
          </span>
        ))}
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FaHeart style={{ color: 'var(--error-color)', marginRight: '0.5rem' }} />
          <span>{post.reactions.likes}</span>
        </div>
        
        <Link to={`/post/${post.id}`} style={{ display: 'flex', alignItems: 'center' }}>
          <FaComment style={{ marginRight: '0.5rem' }} />
          <span>View Comments</span>
        </Link>
      </div>
    </div>
  )
}

export default PostCard