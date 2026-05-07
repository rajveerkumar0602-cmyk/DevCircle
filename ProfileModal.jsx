import React from 'react'
import './Modals.css'
export default function ProfileModal({ isOpen, onClose, onShowToast, onOpenMsg }) {
  const profile = {
    name:      'Your Profile',
    handle:    '@yourhandle',
    initials:  'YO',
    color:     'linear-gradient(135deg,#4f46e5,#ec4899)',
    hacks:     7,
    following: 24,
    followers: 61,
  }

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div
      className={`modal-overlay${isOpen ? ' open' : ''}`}
      onClick={handleOverlayClick}
    >
      <div className="modal">
        <button className="modal-close-btn" onClick={onClose}>✕</button>
        <div className="modal-banner" style={{ background: profile.color }} />

        <div className="modal-body">
          <div className="modal-avatar-wrap">
            <div className="modal-avatar" style={{ background: profile.color }}>
              {profile.initials}
            </div>
          </div>

          <div className="modal-name">{profile.name}</div>
          <div className="modal-handle">{profile.handle}</div>
          <div className="modal-stats">
            <div className="modal-stat">
              <div className="n">{profile.hacks}</div>
              <div className="l">Hackathons</div>
            </div>
            <div className="modal-stat">
              <div className="n">{profile.following}</div>
              <div className="l">Following</div>
            </div>
            <div className="modal-stat">
              <div className="n">{profile.followers}</div>
              <div className="l">Followers</div>
            </div>
          </div>
          <div className="modal-actions">
            <button
              className="btn-sm btn-primary"
              onClick={() => { onShowToast('✅ Following!'); onClose() }}
            >
              Follow
            </button>
            <button
              className="btn-sm btn-outline"
              onClick={() => { onOpenMsg(); onClose() }}
            >
              Message
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
