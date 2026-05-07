import React, { useState } from 'react'

import Sidebar       from './components/Sidebar/Sidebar'
import Feed          from './components/Feed/Feed'
import RightPanel    from './components/RightPanel/RightPanel'
import MessagesPanel from './components/Messages/MessagesPanel'
import ProfileModal  from './components/Modals/ProfileModal'
import HostHackModal from './components/Modals/HostHackModal'
import Toast         from './components/Toast/Toast'
import { useToast }  from './hooks/useToast'
export default function App() {
  const [currentView, setCurrentView] = useState('feed')
  const [currentTab,  setCurrentTab]  = useState('all')
  const [savedHacks,      setSavedHacks]      = useState(new Set())
  const [followedFriends, setFollowedFriends] = useState(new Set())
  const [msgPanelOpen,   setMsgPanelOpen]   = useState(false)
  const [profileOpen,    setProfileOpen]    = useState(false)
  const [hostHackOpen,   setHostHackOpen]   = useState(false)
  const { message: toastMsg, visible: toastVisible, showToast } = useToast()
  const handleSwitchView = (view) => {
    setCurrentView(view)
    setCurrentTab('all')
  }

  const handleTabChange = (tab) => {
    setCurrentTab(tab)
    setCurrentView('feed')
  }

  const handleToggleSave = (id) => {
    setSavedHacks(prev => {
      const next = new Set(prev)
      if (next.has(id)) { next.delete(id); showToast('Removed from saved') }
      else              { next.add(id);    showToast('🔖 Hackathon saved!') }
      return next
    })
  }

  const handleToggleFollow = (handle) => {
    setFollowedFriends(prev => {
      const next = new Set(prev)
      if (next.has(handle)) { next.delete(handle); showToast('Unfollowed') }
      else                  { next.add(handle);    showToast('✅ Now following!') }
      return next
    })
  }

  const handleOpenHack = (id) => {
    const h = [
      { id:1, title:'Google AI Hackathon 2025' },
      { id:2, title:'ETHIndia Hackathon' },
      { id:3, title:'GameJam India — 48hr Sprint' },
      { id:4, title:'HackHealth — Medical AI Challenge' },
      { id:5, title:'Climate Hack 2025' },
    ].find(x => x.id === id)
    if (h) showToast(`Opening ${h.title}…`)
  }

  return (
    <>
      <div className="app-shell">
        <Sidebar
          currentView={currentView}
          onSwitchView={handleSwitchView}
          onOpenMsg={() => setMsgPanelOpen(true)}
          onOpenProfile={() => setProfileOpen(true)}
          onShowToast={showToast}
        />

        <Feed
          currentView={currentView}
          currentTab={currentTab}
          savedHacks={savedHacks}
          followedFriends={followedFriends}
          onTabChange={handleTabChange}
          onToggleSave={handleToggleSave}
          onToggleFollow={handleToggleFollow}
          onShowToast={showToast}
          onOpenMsg={() => setMsgPanelOpen(true)}
          onOpenHack={handleOpenHack}
          onSwitchView={handleSwitchView}
          onOpenHostHack={() => setHostHackOpen(true)}
        />

        <RightPanel
          followedFriends={followedFriends}
          onToggleFollow={handleToggleFollow}
          onShowToast={showToast}
          onSwitchView={handleSwitchView}
        />
      </div>
      <MessagesPanel
        isOpen={msgPanelOpen}
        onOpen={() => setMsgPanelOpen(true)}
        onClose={() => setMsgPanelOpen(false)}
        onShowToast={showToast}
      />
      <ProfileModal
        isOpen={profileOpen}
        onClose={() => setProfileOpen(false)}
        onShowToast={showToast}
        onOpenMsg={() => { setMsgPanelOpen(true); setProfileOpen(false) }}
      />
      <HostHackModal
        isOpen={hostHackOpen}
        onClose={() => setHostHackOpen(false)}
        onShowToast={showToast}
      />
      <Toast message={toastMsg} visible={toastVisible} />
    </>
  )
}
