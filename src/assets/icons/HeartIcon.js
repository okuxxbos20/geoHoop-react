import React from 'react'

const HeartIcon = () => {
  const style = {
    width: '20px',
    height: '20px',
  }
  return (
    <div style={style}>
      <svg viewBox="0 0 16 16" className="bi bi-heart-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
      </svg>
    </div>
  )
}

export default HeartIcon