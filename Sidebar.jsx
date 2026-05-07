import React from 'react'
import './Sidebar.css'


export default function Sidebar({ currentView, onSwitchView, onOpenMsg, onOpenProfile, onShowToast }) {
  const navItem = (view, icon, label, badge = null, dot = false, customAction = null) => {
    const isActive = currentView === view && !customAction
    const handleClick = customAction ?? (() => onSwitchView(view))
    return (
      <button
        className={`nav-item${isActive ? ' active' : ''}`}
        onClick={handleClick}
      >
        <span className="nav-icon">{icon}</span>
        {label}
        {badge && <span className="nav-badge">{badge}</span>}
        {dot && <div className="notif-dot" />}
      </button>
    )
  }

  return (
    <aside className="sidebar">

      <a href="#" className="sidebar-logo">
        <div className="logo-mark">D●</div>
        <span className="logo-text">Dev-Circle</span>
      </a>


      {navItem('feed', '🏠', 'Feed')}
      {navItem('explore', '🔍', 'Explore')}
      {navItem('collab', '⚡', 'Collab Match', 3)}
      {navItem('saved', '🔖', 'Saved')}
      {navItem('notif', '🔔', 'Notifications', null, true, () => onShowToast('📬 3 new notifications'))}


      <div className="sidebar-section">Social</div>
      {navItem('friends', '👥', 'Friends')}
      {navItem('messages', '💬', 'Messages', 2, false, onOpenMsg)}
      {navItem('teams', '🏆', 'My Teams', null, false, () => onShowToast('🏆 Your teams & squads'))}


      <div className="sidebar-section">Account</div>
      {navItem('profile', '👤', 'Profile', null, false, () => onOpenProfile('you'))}
      {navItem('settings', '⚙️', 'Settings', null, false, () => onShowToast('⚙️ Settings coming soon'))}


      <div className="sidebar-bottom">
        <div className="user-pill" onClick={() => onOpenProfile('you')}>
          <div className="user-avatar">YO</div>
          <div>
            <div className="user-name">You</div>
            <div className="user-handle">@yourhandle</div>
          </div>
        </div>
      </div>
    </aside>
  )
}
