import React, { useEffect, useRef } from 'react'
import './Feed.css'
export default function HackCard({ hack: h, isSaved, onToggleSave, onShowToast, onOpenHack }) {
  const cardRef = useRef(null)
  useEffect(() => {
    const fill = cardRef.current?.querySelector('.bar-fill')
    if (fill) {
      const timer = setTimeout(() => { fill.style.width = `${h.collab}%` }, 120)
      return () => clearTimeout(timer)
    }
  }, [h.collab])

  return (
    <div className="hack-card" ref={cardRef} onClick={() => onOpenHack(h.id)}>
      <div className="hack-banner" style={{ background: h.bg }}>
        <div style={{ fontSize: '3rem' }}>{h.emoji}</div>
        <div className="hack-banner-text" style={{ justifyContent: 'flex-end', gap: 6 }}>
          <span className="hack-tag" style={{ background: h.tagBg, color: h.tagColor }}>{h.tag}</span>
          {isSaved && (
            <span className="hack-tag" style={{ background: '#fef3c7', color: '#b45309' }}>🔖 Saved</span>
          )}
        </div>
      </div>
      <div className="hack-body">
        <div className="hack-title">{h.title}</div>
        <div className="hack-org">by {h.org}</div>

        <div className="hack-meta">
          <div className="meta-chip">📅 {h.deadline}</div>
          <div className="meta-chip">🌐 {h.mode}</div>
          <div className="meta-chip">👥 {h.team}</div>
          {h.tags.map(t => <div className="meta-chip" key={t}>{t}</div>)}
        </div>

        {h.friends.length > 0 && (
          <div className="hack-friends">
            <div className="friend-avatars">
              {h.friends.map(f => (
                <div className="friend-av" key={f.i} style={{ background: f.c }}>{f.i}</div>
              ))}
            </div>
            <div className="friend-text">✨ {h.friendText}</div>
          </div>
        )}
        <div className="collab-bar">
          <div className="collab-label">
            <span>⚡ Collab Match</span>
            <span className="score">{h.collab}%</span>
          </div>
          <div className="bar-track">
            <div className="bar-fill" style={{ width: '0%' }} />
          </div>
        </div>
        <div className="hack-footer">
          <div className="hack-prize">🏆 {h.prize} <span>Prize Pool</span></div>
          <div className="hack-actions" onClick={e => e.stopPropagation()}>
            <button
              className={`btn-sm ${isSaved ? 'btn-saved' : 'btn-outline'}`}
              onClick={() => onToggleSave(h.id)}
            >
              {isSaved ? '🔖 Saved' : '🔖 Save'}
            </button>
            <button
              className="btn-sm btn-primary"
              onClick={() => onShowToast('🚀 Opening registration…')}
            >
              Apply →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
