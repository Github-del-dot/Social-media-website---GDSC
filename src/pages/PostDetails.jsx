import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { FaHeart, FaUser, FaArrowLeft } from 'react-icons/fa'
import Loader from '../components/Loader'

const PostDetails = () => {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [user, setUser] = useState(null)
  const [comments, setComments] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        setLoading(true)
        
        // Fetch post
        const postResponse = await axios.get(`https://dummyjson.com/posts/${id}`)
        setPost(postResponse.data)
        
        // Fetch user
        const userResponse = await axios.get(`https://dummyjson.com/users/${postResponse.data.userId}`)
        setUser(userResponse.data)
        
        // Fetch comments
        const commentsResponse = await axios.get(`https://dummyjson.com/posts/${id}/comments`)
        setComments(commentsResponse.data.comments)
        
      } catch (err) {
        setError('Failed to fetch post details. Please try again later.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchPostDetails()
  }, [id])

  if (loading) return <Loader />
  
  if (error) return <div style={{ textAlign: 'center', marginTop: '2rem' }}>{error}</div>
  
  if (!post) return <div style={{ textAlign: 'center', marginTop: '2rem' }}>Post not found</div>

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
        padding: '1.5rem',
        marginBottom: '2rem',
        boxShadow: '0 2px 4px var(--shadow-color)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem' }}>
          <Link to={`/user/${user?.id}`}>
            <img 
              src={user?.image || 'https://via.placeholder.com/50'} 
              alt={user?.firstName} 
              style={{ 
                width: '50px', 
                height: '50px', 
                borderRadius: '50%', 
                objectFit: 'cover',
                marginRight: '1rem'
              }}
            />
          </Link>
          
          <div>
            <Link to={`/user/${user?.id}`} style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>
              {user?.firstName} {user?.lastName}
            </Link>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-color)', opacity: 0.8 }}>
              @{user?.username}
            </p>
          </div>
        </div>
        
        <h1 style={{ marginBottom: '1rem' }}>{post.title}</h1>
        
        <p style={{ 
          marginBottom: '1.5rem', 
          lineHeight: '1.6',
          fontSize: '1.1rem'
        }}>
          {post.body}
        </p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {post.tags.map(tag => (
            <span 
              key={tag} 
              style={{ 
                backgroundColor: 'var(--primary-color)',
                color: 'white',
                padding: '0.3rem 0.7rem',
                borderRadius: '4px',
                fontSize: '0.9rem',
                marginRight: '0.7rem',
                marginBottom: '0.7rem'
              }}
            >
              #{tag}
            </span>
          ))}
        </div>
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center',
          padding: '0.7rem',
          backgroundColor: 'var(--background-color)',
          borderRadius: '4px'
        }}>
          <FaHeart style={{ color: 'var(--error-color)', marginRight: '0.5rem', fontSize: '1.2rem' }} />
          <span style={{ fontSize: '1.1rem' }}>{post.reactions.likes} likes</span>
        </div>
      </div>
      
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>Comments ({comments.length})</h2>
        
        {comments.length === 0 ? (
          <p style={{ textAlign: 'center', padding: '1.5rem', backgroundColor: 'var(--card-background)', borderRadius: '8px' }}>
            No comments yet.
          </p>
        ) : (
          comments.map(comment => (
            <div 
              key={comment.id} 
              style={{ 
                backgroundColor: 'var(--card-background)',
                borderRadius: '8px',
                padding: '1.2rem',
                marginBottom: '1rem',
                boxShadow: '0 1px 3px var(--shadow-color)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.7rem' }}>
                <Link to={`/user/${comment.user.id}`}>
                  <div style={{ 
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--primary-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '0.7rem',
                    color: 'white'
                  }}>
                    <FaUser />
                  </div>
                </Link>
                
                <div>
                  <Link to={`/user/${comment.user.id}`} style={{ fontWeight: 'bold' }}>
                    {comment.user.username}
                  </Link>
                </div>
              </div>
              
              <p style={{ lineHeight: '1.5' }}>{comment.body}</p>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default PostDetails