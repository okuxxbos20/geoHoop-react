import React from 'react'

const ArrowLeftIcon = () => {
  const style = {
    width: '15px',
    height: '15px',
  }
  return (
    <div style={style}>
      <svg viewBox="0 0 16 16" className="bi bi-chevron-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
      </svg>
    </div>
  )
}

export default ArrowLeftIcon