import React from 'react'

const BookmarkIcon = () => {
  const style = {
    width: '20px',
    height: '20px',
  }
  return (
    <div style={style}>
      <svg viewBox="0 0 16 16" className="bi bi-bookmark-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M3 3a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12l-5-3-5 3V3z"/>
      </svg>
    </div>
  )
}

export default BookmarkIcon