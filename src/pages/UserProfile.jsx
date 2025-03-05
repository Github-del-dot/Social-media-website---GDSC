import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaBriefcase, FaArrowLeft } from 'react-icons/fa'
import PostCard from '../components/PostCard'
import Loader from '../components/Loader'

const UserProfile = () => {
  const { id } = useParams()
  const [user, setUser] = useState(null)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true)
        
        // Fetch user
        const userResponse = await axios.get(`https://dummyjson.com/users/${id}`)
        setUser(userResponse.data)
        
        // Fetch user's posts
        const postsResponse = await axios.get(`https://dummyjson.com/posts/user/${id}`)
        setPosts(postsResponse.data.posts)
        
      } catch (err) {
        setError('Failed to fetch user data. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [id])

  if (loading) return <Loader />
  
  if (error) return <div style={{ textAlign: 'center', marginTop: '2rem' }}>{error}</div>
  
  if (!user) return <div style={{ textAlign: 'center', marginTop: '2rem' }}>User not found</div>

  return (
    <div>
      <Link to="/" style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        marginBottom: '1.5rem',
        color: 'var(--primary-color)'
      }}>
        <FaArrowLeft style={{ marginRight: '0.5rem' }} />
        Back to Feed
      </Link>
      
      <div style={{ 
        backgroundColor: 'var(--card-background)',
        borderRadius: '8px',
        padding: '2rem',
        marginBottom: '2rem',
        boxShadow: '0 2px 4px var(--shadow-color)'
      }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          textAlign: 'center',
          marginBottom: '1.5rem'
        }}>
          <img 
            src={user.image || 'https://via.placeholder.com/150'} 
            alt={user.firstName} 
            style={{ 
              width: '150px', 
              height: '150px', 
              borderRadius: '50%', 
              objectFit: 'cover',
              marginBottom: '1rem',
              border: '4px solid var(--primary-color)'
            }}
          />
          
          <h1 style={{ marginBottom: '0.5rem' }}>{user.firstName} {user.lastName}</h1>
          <p style={{ fontSize: '1.1rem', color: 'var(--text-color)', opacity: 0.8, marginBottom: '1rem' }}>
            @{user.username}
          </p>
          
          {user.company && user.company.title && (
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center',
              backgroundColor: 'var(--background-color)',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              marginBottom: '1rem'
            }}>
              <FaBriefcase style={{ marginRight: '0.5rem' }} />
              <span>{user.company.title} at {user.company.name}</span>
            </div>
          )}
        </div>
        
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '1.5rem'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            backgroundColor: 'var(--background-color)',
            padding: '1rem',
            borderRadius: '8px'
          }}>
            <FaEnvelope style={{ marginRight: '0.7rem', fontSize: '1.2rem' }} />
            <span>{user.email}</span>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            backgroundColor: 'var(--background-color)',
            padding: '1rem',
            borderRadius: '8px'
          }}>
            <FaPhone style={{ marginRight: '0.7rem', fontSize: '1.2rem' }} />
            <span>{user.phone}</span>
          </div>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center',
            backgroundColor: 'var(--background-color)',
            padding: '1rem',
            borderRadius: '8px'
          }}>
            <FaMapMarkerAlt style={{ marginRight: '0.7rem', fontSize: '1.2rem' }} />
            <span>{user.address.city}, {user.address.state}</span>
          </div>
        </div>
        
        {user.bio && (
          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ marginBottom: '0.7rem' }}>About</h3>
            <p style={{ lineHeight: '1.6' }}>{user.bio || "No bio available."}</p>
          </div>
        )}
      </div>
      
      <div>
        <h2 style={{ marginBottom: '1.5rem' }}>Posts by {user.firstName}</h2>
        
        {posts.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '2rem', backgroundColor: 'var(--card-background)', borderRadius: '8px' }}>
            This user hasn't posted anything yet.
          </p>
        ) : (
          posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        )}
      </div>
    </div>
  )
}

export default UserProfile