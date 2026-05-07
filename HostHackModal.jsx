import React, { useState } from 'react'
import './Modals.css'
export default function HostHackModal({ isOpen, onClose, onShowToast }) {
  const [form, setForm] = useState({
    name: '', description: '', date: '', prize: '', organizer: '',
  })

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = () => {
    onClose()
    onShowToast('🚀 Hackathon submitted for review!')
    setForm({ name: '', description: '', date: '', prize: '', organizer: '' })
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
        <div
          className="modal-banner"
          style={{ background: 'linear-gradient(135deg,#4f46e5,#ec4899)', fontSize: '3rem' }}
        >
          🚀
        </div>

        <div className="modal-body" style={{ paddingTop: '1.25rem' }}>
          <div className="modal-name">Submit a Hackathon</div>
          <div className="host-subtitle">Share an opportunity with the DabCircle community</div>

          <div className="host-form">
            <input
              name="name"
              className="host-input"
              placeholder="Hackathon / Competition name"
              value={form.name}
              onChange={handleChange}
            />
            <textarea
              name="description"
              className="host-input host-textarea"
              rows={2}
              placeholder="Short description"
              value={form.description}
              onChange={handleChange}
            />
            <div className="host-row">
              <input
                name="date"
                type="date"
                className="host-input"
                value={form.date}
                onChange={handleChange}
              />
              <input
                name="prize"
                className="host-input"
                placeholder="Prize pool (e.g. ₹1L)"
                value={form.prize}
                onChange={handleChange}
              />
            </div>
            <input
              name="organizer"
              className="host-input"
              placeholder="Organizer / Company"
              value={form.organizer}
              onChange={handleChange}
            />
          </div>

          <div className="host-submit-row">
            <button className="btn-sm btn-primary" onClick={handleSubmit}>🚀 Submit</button>
            <button className="btn-sm btn-outline" onClick={onClose}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  )
}
