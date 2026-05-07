import React from 'react'
import './Toast.css'
export default function Toast({ message, visible }) {
  return (
    <div className={`toast${visible ? ' show' : ''}`}>
      {message}
    </div>
  )
}
