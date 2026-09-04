import { useState, useRef, useEffect } from 'react'
import api from '../api/axios'

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi, I'm here to help you report a civic issue or check how the portal works. What's going on?" }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, open])

  const sendMessage = async () => {
    const trimmed = input.trim()
    if (!trimmed || loading) return

    setMessages((prev) => [...prev, { from: 'user', text: trimmed }])
    setInput('')
    setLoading(true)

    try {
      const res = await api.post('/chatbot/ask', { message: trimmed })
      setMessages((prev) => [...prev, { from: 'bot', text: res.data.reply }])
    } catch (err) {
      setMessages((prev) => [...prev, { from: 'bot', text: "Sorry, I couldn't reach the assistant just now." }])
    } finally {
      setLoading(false)
    }
  }

  const onKeyDown = (e) => { if (e.key === 'Enter') sendMessage() }

  if (!open) {
    return (
      <button onClick={() => setOpen(true)} className="chat-launcher">
        Need help?
      </button>
    )
  }

  return (
    <div className="chat-panel">
      <div className="chat-header">
        <span>Grievance Assistant</span>
        <button onClick={() => setOpen(false)} className="chat-close">✕</button>
      </div>

      <div className="chat-body">
        {messages.map((m, i) => (
          <div key={i} className={'chat-bubble ' + (m.from === 'user' ? 'chat-bubble-user' : 'chat-bubble-bot')}>
            {m.text}
          </div>
        ))}
        {loading && <div className="chat-bubble chat-bubble-bot">Typing…</div>}
        <div ref={bottomRef} />
      </div>

      <div className="chat-input-row">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Describe your issue…"
          className="chat-input"
        />
        <button onClick={sendMessage} className="chat-send">Send</button>
      </div>
    </div>
  )
}
