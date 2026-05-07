import React, { useState } from 'react'
import { MESSAGES } from '../../data/mockData'
import './Messages.css'
export default function MessagesPanel({ isOpen, onOpen, onClose, onShowToast }) {
  const [inputVal, setInputVal] = useState('')

  const handleSend = () => {
    if (!inputVal.trim()) return
    setInputVal('')
    onShowToast('💬 Message sent!')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSend()
  }

  return (
    <>
      <button className="msg-fab" onClick={onOpen} title="Messages">
        💬
      </button>
      <div className={`msg-panel${isOpen ? ' open' : ''}`}>
        <div className="msg-header">
          <span className="msg-header-title">💬 Messages</span>
          <button className="msg-close" onClick={onClose}>✕</button>
        </div>

        <div className="msg-list">
          {MESSAGES.map((m, idx) => (
            <div
              key={idx}
              className="msg-row"
              onClick={() => onShowToast(`Opening chat with ${m.name}…`)}
            >
              <div className="msg-av" style={{ background: m.color }}>{m.initials}</div>
              <div className="msg-info">
                <div className="msg-name">{m.name}</div>
                <div className="msg-preview">{m.preview}</div>
              </div>
              <div className="msg-meta">
                <div className="msg-time">{m.time}</div>
                {m.unread && <div className="msg-unread" />}
              </div>
            </div>
          ))}
        </div>

        <div className="msg-input-row">
          <input
            className="msg-input"
            type="text"
            placeholder="Send a message…"
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="msg-send" onClick={handleSend}>➤</button>
        </div>
      </div>
    </>
  )
}
