import { useState, useCallback, useRef } from 'react'
export function useToast() {
  const [message, setMessage] = useState('')
  const [visible, setVisible] = useState(false)
  const timerRef = useRef(null)

  const showToast = useCallback((msg) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setMessage(msg)
    setVisible(true)
    timerRef.current = setTimeout(() => setVisible(false), 2600)
  }, [])

  return { message, visible, showToast }
}
