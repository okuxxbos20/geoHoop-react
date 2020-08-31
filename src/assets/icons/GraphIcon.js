import React from 'react'

const GraphIcon = () => {
  const style = {
    width: '25px',
    height: '25px',
  }
  return (
    <div style={style}>
      <svg viewBox="0 0 16 16" className="bi bi-graph-up" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M0 0h1v16H0V0zm1 15h15v1H1v-1z"/>
        <path fill-rule="evenodd" d="M14.39 4.312L10.041 9.75 7 6.707l-3.646 3.647-.708-.708L7 5.293 9.959 8.25l3.65-4.563.781.624z"/>
        <path fill-rule="evenodd" d="M10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4h-3.5a.5.5 0 0 1-.5-.5z"/>
      </svg>
    </div>
  )
}

export default GraphIcon