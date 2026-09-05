import { useState, useRef, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

export default function ChatbotWidget() {

  const { t, i18n } = useTranslation()

  const [open, setOpen] = useState(false)

  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: t('chatbotWelcome')
    }
  ])

  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const bottomRef = useRef(null)

  const location = useLocation()
  const navigate = useNavigate()

  const { user } = useAuth()

  useEffect(() => {

    setMessages((prev) => {

      if (
        prev.length === 1 &&
        prev[0].from === 'bot'
      ) {
        return [
          {
            from: 'bot',
            text: t('chatbotWelcome')
          }
        ]
      }

      return prev
    })

  }, [i18n.language, t])

  useEffect(() => {

    bottomRef.current?.scrollIntoView({
      behavior: 'smooth'
    })

  }, [messages, open])

  const sendMessage = async () => {

    const trimmed = input.trim()

    if (!trimmed || loading) {
      return
    }

    setMessages((prev) => [
      ...prev,
      {
        from: 'user',
        text: trimmed
      }
    ])

    setInput('')
    setLoading(true)

    try {

      const res = await api.post(
        '/chatbot/ask',
        {
          message: trimmed,
          currentPath: location.pathname,
          role: user?.role || null,
          language: i18n.language
        }
      )

      const {
        reply,
        actionRoute,
        actionLabel
      } = res.data

      setMessages((prev) => [
        ...prev,
        {
          from: 'bot',
          text: reply,
          actionRoute,
          actionLabel
        }
      ])

    } catch (err) {

      console.error(
        'Chatbot request failed:',
        err
      )

      setMessages((prev) => [
        ...prev,
        {
          from: 'bot',
          text: t('chatbotConnectionError')
        }
      ])

    } finally {

      setLoading(false)
    }
  }

  const onKeyDown = (e) => {

    if (e.key === 'Enter') {
      sendMessage()
    }
  }

  const goTo = (route) => {

    navigate(route)
    setOpen(false)
  }

  if (!open) {

    return (
      <button
        onClick={() => setOpen(true)}
        className="chat-launcher"
      >
        {t('needHelp')}
      </button>
    )
  }

  return (
    <div className="chat-panel">

      <div className="chat-header">

        <span>
          {t('chatbotName')}
        </span>

        <button
          onClick={() => setOpen(false)}
          className="chat-close"
          aria-label={t('close')}
        >
          ✕
        </button>

      </div>

      <div className="chat-body">

        {messages.map((m, i) => (

          <div
            key={i}
            className={
              'chat-bubble ' +
              (
                m.from === 'user'
                  ? 'chat-bubble-user'
                  : 'chat-bubble-bot'
              )
            }
          >

            <div>
              {m.text}
            </div>

            {m.actionRoute && (

              <button
                className="chat-action-btn"
                onClick={() =>
                  goTo(m.actionRoute)
                }
              >
                {m.actionLabel ||
                  t('takeMeThere')}
              </button>

            )}

          </div>

        ))}

        {loading && (

          <div className="chat-bubble chat-bubble-bot">
            {t('typing')}
          </div>

        )}

        <div ref={bottomRef} />

      </div>

      <div className="chat-input-row">

        <input
          value={input}
          onChange={(e) =>
            setInput(e.target.value)
          }
          onKeyDown={onKeyDown}
          placeholder={t('chatbotPlaceholder')}
          className="chat-input"
        />

        <button
          onClick={sendMessage}
          className="chat-send"
          disabled={loading}
        >
          {t('send')}
        </button>

      </div>

    </div>
  )
}