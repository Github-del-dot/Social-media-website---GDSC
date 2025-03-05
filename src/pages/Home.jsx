import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import PostCard from '../components/PostCard'
import Loader from '../components/Loader'

const Home = () => {
  const [posts, setPosts] = useState([])
  const [filteredPosts, setFilteredPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTag, setSelectedTag] = useState('')
  const [sortBy, setSortBy] = useState('default')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [allTags, setAllTags] = useState([])
  const postsPerPage = 10

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true)
        const response = await axios.get('https://dummyjson.com/posts?limit=100')
        setPosts(response.data.posts)
        
        // Extract all unique tags
        const tags = new Set()
        response.data.posts.forEach(post => {
          post.tags.forEach(tag => tags.add(tag))
        })
        setAllTags(Array.from(tags))
        
        setTotalPages(Math.ceil(response.data.posts.length / postsPerPage))
      } catch (err) {
        setError('Failed to fetch posts. Please try again later.')
        console.error(err)
      } finally {
        console.log("done fetching data")
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  useEffect(() => {
    // Filter and sort posts
    let result = [...posts]
    
    // Filter by search term
    if (searchTerm) {
      result = result.filter(post => 
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        post.body.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Filter by tag
    if (selectedTag) {
      result = result.filter(post => post.tags.includes(selectedTag))
    }
    
    // Sort posts
    switch (sortBy) {
      case 'likes':
        result.sort((a, b) => b.reactions.likes - a.reactions.likes)
        break
      case 'title':
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      default:
        // Default sorting (by id)
        result.sort((a, b) => a.id - b.id)
    }
    
    setFilteredPosts(result)
    setTotalPages(Math.ceil(result.length / postsPerPage))
    setCurrentPage(1) // Reset to first page when filters change
  }, [posts, searchTerm, selectedTag, sortBy])

  // Get current posts for pagination
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber)
    window.scrollTo(0, 0)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedTag('')
    setSortBy('default')
  }

  if (loading) return <Loader />
  
  if (error) return <div style={{ textAlign: 'center', marginTop: '2rem' }}>{error}</div>

  return (
    <div>
      <h1>Social Feed</h1>
      
      <div style={{ 
        backgroundColor: 'var(--card-background)',
        padding: '1rem',
        borderRadius: '8px',
        marginBottom: '2rem'
      }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <div style={{ flex: '1', minWidth: '200px' }}>
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: '100%' }}
            />
          </div>
          
          <div style={{ flex: '1', minWidth: '200px' }}>
            <select 
              value={selectedTag} 
              onChange={(e) => setSelectedTag(e.target.value)}
              style={{ 
                width: '100%',
                padding: '0.6em 1.2em',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--input-background)',
                color: 'var(--input-text)'
              }}
            >
              <option value="">All Tags</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
          
          <div style={{ flex: '1', minWidth: '200px' }}>
            <select 
              value={sortBy} 
              onChange={(e) => setSortBy(e.target.value)}
              style={{ 
                width: '100%',
                padding: '0.6em 1.2em',
                borderRadius: '8px',
                border: '1px solid var(--border-color)',
                backgroundColor: 'var(--input-background)',
                color: 'var(--input-text)'
              }}
            >
              <option value="default">Sort by: Default</option>
              <option value="likes">Sort by: Most Likes</option>
              <option value="title">Sort by: Title</option>
            </select>
          </div>
        </div>
        
        {(searchTerm || selectedTag || sortBy !== 'default') && (
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button onClick={clearFilters}>Clear Filters</button>
          </div>
        )}
      </div>
      
      {filteredPosts.length === 0 ? (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <p>No posts found matching your criteria.</p>
          <button onClick={clearFilters} style={{ marginTop: '1rem' }}>Clear Filters</button>
        </div>
      ) : (
        <>
          <div>
            {currentPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
          
          {/* Pagination */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            marginTop: '2rem',
            gap: '0.5rem',
            flexWrap: 'wrap'
          }}>
            <button 
              onClick={() => handlePageChange(1)} 
              disabled={currentPage === 1}
              style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
            >
              First
            </button>
            
            <button 
              onClick={() => handlePageChange(currentPage - 1)} 
              disabled={currentPage === 1}
              style={{ opacity: currentPage === 1 ? 0.5 : 1 }}
            >
              Previous
            </button>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Show 5 page numbers centered around current page
              let pageNum
              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (currentPage <= 3) {
                pageNum = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = currentPage - 2 + i
              }
              
              return (
                <button 
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  style={{ 
                    backgroundColor: currentPage === pageNum ? 'var(--primary-color)' : 'var(--button-background)',
                    color: currentPage === pageNum ? 'white' : 'var(--button-text)'
                  }}
                >
                  {pageNum}
                </button>
              )
            })}
            
            <button 
              onClick={() => handlePageChange(currentPage + 1)} 
              disabled={currentPage === totalPages}
              style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
            >
              Next
            </button>
            
            <button 
              onClick={() => handlePageChange(totalPages)} 
              disabled={currentPage === totalPages}
              style={{ opacity: currentPage === totalPages ? 0.5 : 1 }}
            >
              Last
            </button>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            Page {currentPage} of {totalPages}
          </div>
        </>
      )}
    </div>
  )
}

export default Home