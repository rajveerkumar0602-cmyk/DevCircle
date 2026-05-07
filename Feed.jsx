import React from 'react'
import { HACKATHONS, FRIENDS_DATA } from '../../data/mockData'
import HackCard from './HackCard'
import './Feed.css'

const TABS = [
  { key: 'all',     label: 'All' },
  { key: 'upcoming',label: 'Upcoming' },
  { key: 'open',    label: 'Open Now' },
  { key: 'friends', label: "Friends' Picks" },
]

const VIEW_TITLES = {
  feed:    '🏠 Feed',
  explore: '🔍 Explore',
  collab:  '⚡ Collab Match',
  saved:   '🔖 Saved',
  friends: '👥 Friends',
}
export default function Feed({
  currentView,
  currentTab,
  savedHacks,
  followedFriends,
  onTabChange,
  onToggleSave,
  onToggleFollow,
  onShowToast,
  onOpenMsg,
  onOpenHack,
  onSwitchView,
  onOpenHostHack,
}) {
  const title = VIEW_TITLES[currentView] || '🏠 Feed'
  const filteredHacks = () => {
    if (currentTab === 'upcoming') return HACKATHONS.filter(h => h.category === 'upcoming')
    if (currentTab === 'open')     return HACKATHONS.filter(h => h.category === 'open')
    if (currentTab === 'friends')  return HACKATHONS.filter(h => h.friends.length > 0)
    return HACKATHONS
  }

  const hackCards = (hacks) => hacks.map(h => (
    <HackCard
      key={h.id}
      hack={h}
      isSaved={savedHacks.has(h.id)}
      onToggleSave={onToggleSave}
      onShowToast={onShowToast}
      onOpenHack={onOpenHack}
    />
  ))
  const renderSavedView = () => {
    const saved = HACKATHONS.filter(h => savedHacks.has(h.id))
    if (saved.length === 0) {
      return (
        <div className="empty-state">
          <div className="empty-state-icon">🔖</div>
          <div className="empty-state-title">No saved hackathons yet</div>
          <div className="empty-state-sub">Save events to find them here</div>
        </div>
      )
    }
    return hackCards(saved)
  }

  const renderCollabView = () => (
    <>
      <div className="collab-view-header">
        <div className="collab-view-title">⚡ Your Collab Matches</div>
        <div className="collab-view-sub">Hackathons where you and your friends can team up</div>
      </div>
      {hackCards(HACKATHONS)}
    </>
  )

  const renderFriendsView = () => (
    <>
      <div className="friends-view-title">👥 Your Circle</div>
      {FRIENDS_DATA.map(f => (
        <div className="friend-full-card" key={f.handle}>
          <div className="friend-full-inner">
            <div className="friend-full-avatar" style={{ background: f.color }}>{f.initials}</div>
            <div className="friend-full-info">
              <div className="friend-full-name">{f.name}</div>
              <div className="friend-full-meta">{f.handle} · {f.hacks} hackathons</div>
              <div className="friend-full-match-row">
                <div className="friend-full-match-label">⚡ Collab Match</div>
                <div className="friend-full-bar-track">
                  <div className="friend-full-bar-fill" style={{ width: `${f.match}%` }} />
                </div>
                <div className="friend-full-pct">{f.match}%</div>
              </div>
            </div>
            <div className="friend-full-actions">
              <button
                className={`btn-follow ${followedFriends.has(f.handle) ? 'following' : ''}`}
                onClick={() => onToggleFollow(f.handle)}
              >
                {followedFriends.has(f.handle) ? '✓ Following' : '+ Follow'}
              </button>
              <button
                className="btn-sm btn-outline"
                style={{ fontSize: '0.72rem', padding: '0.3rem 0.7rem' }}
                onClick={onOpenMsg}
              >
                Message
              </button>
            </div>
          </div>
        </div>
      ))}
    </>
  )

  const renderFeedView = () => (
    <>
      {currentTab === 'all' && (
        <div className="announce">
          <div className="announce-icon">⚡</div>
          <div>
            <div className="announce-title">3 friends active in hackathons!</div>
            <div className="announce-sub">Aarav, Riya &amp; Neha are competing this week</div>
          </div>
          <button className="announce-btn" onClick={() => onTabChange('friends')}>See →</button>
        </div>
      )}
      {hackCards(filteredHacks())}
    </>
  )
  const renderBody = () => {
    if (currentView === 'saved')   return renderSavedView()
    if (currentView === 'collab')  return renderCollabView()
    if (currentView === 'friends') return renderFriendsView()
    return renderFeedView()
  }

  const showTabs = !['saved', 'collab', 'friends'].includes(currentView)

  return (
    <main className="main-feed">
      <div className="feed-header">
        <div className="feed-title">{title}</div>
        <div className="feed-header-actions">
          <button className="btn-sm btn-outline" onClick={() => onShowToast('🔔 Notifications')}>🔔</button>
          <button className="btn-sm btn-primary" onClick={onOpenHostHack}>+ Submit Hackathon</button>
        </div>
      </div>
      {showTabs && (
        <div className="tab-row">
          {TABS.map(t => (
            <button
              key={t.key}
              className={`tab${currentTab === t.key ? ' active' : ''}`}
              onClick={() => onTabChange(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>
      )}
      <div className="feed-body">
        {renderBody()}
      </div>
    </main>
  )
}
