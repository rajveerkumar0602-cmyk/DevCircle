import React from 'react'
import { HACKATHONS, FRIENDS_DATA, TAGS } from '../../data/mockData'
import './RightPanel.css'
export default function RightPanel({ followedFriends, onToggleFollow, onShowToast, onSwitchView }) {
  const handleSearch = (e) => {
    if (e.key === 'Enter') onShowToast(`🔍 Searching: ${e.target.value}`)
  }

  return (
    <aside className="right-panel">
      <div className="search-box">
        <span>🔍</span>
        <input
          type="text"
          placeholder="Search hackathons, people…"
          onKeyDown={handleSearch}
        />
      </div>
      <div className="panel-card">
        <div className="panel-title">⚡ Collab Match</div>
        {HACKATHONS.slice(0, 3).map(h => (
          <div className="collab-match-row" key={h.id}>
            <span className="cm-emoji">{h.emoji}</span>
            <div className="cm-info">
              <div className="cm-event">{h.title}</div>
              <div className="cm-friends">
                {h.friends.length > 0
                  ? h.friends.map(f => f.i).join(', ') + ' interested'
                  : 'No friends yet'}
              </div>
            </div>
            <div className="cm-score">{h.collab}%</div>
          </div>
        ))}
        <button
          className="btn-sm btn-outline panel-see-all"
          onClick={() => onSwitchView('collab')}
        >
          See all matches →
        </button>
      </div>
      <div className="panel-card">
        <div className="panel-title">👥 People You May Know</div>
        {FRIENDS_DATA.slice(0, 4).map(f => (
          <div className="friend-row" key={f.handle}>
            <div className="fr-avatar" style={{ background: f.color }}>{f.initials}</div>
            <div>
              <div className="fr-name">{f.name}</div>
              <div className="fr-handle">{f.mutual} mutual friends</div>
            </div>
            <div className="fr-action">
              <button
                className={`btn-follow ${followedFriends.has(f.handle) ? 'following' : ''}`}
                onClick={() => onToggleFollow(f.handle)}
              >
                {followedFriends.has(f.handle) ? '✓ Following' : '+ Follow'}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="panel-card">
        <div className="panel-title">🔥 Trending Tags</div>
        <div className="tag-cloud">
          {TAGS.map(t => (
            <button
              key={t}
              className="tag-chip"
              onClick={() => onShowToast(`Showing ${t} hackathons`)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

    </aside>
  )
}
