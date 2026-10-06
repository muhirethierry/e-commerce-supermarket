import { useState } from 'react'
import { MessageCircleMore, Send, Sparkles, X } from 'lucide-react'
import { askShoppingAssistant } from '../../api/catalog'

const quickQuestions = [
  'What fruit is in stock?',
  'Suggest a low-cost breakfast',
  'Do you have kitchen essentials?',
]

function Chatbot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hi, I can help you find items in the current FreshMart catalog. What are you shopping for?',
    },
  ])

  async function sendMessage(text) {
    const trimmed = text.trim()
    if (!trimmed || isSending) return

    const history = messages
      .filter((message) => message.sender === 'user' || message.sender === 'bot')
      .slice(-8)
      .map((message) => ({ role: message.sender === 'bot' ? 'assistant' : 'user', content: message.text }))
    const userMessage = { id: `${Date.now()}-user`, sender: 'user', text: trimmed }
    setMessages((current) => [...current, userMessage])
    setInput('')
    setIsSending(true)

    try {
      const response = await askShoppingAssistant(trimmed, history)
      setMessages((current) => [...current, {
        id: `${Date.now()}-assistant`,
        sender: 'bot',
        text: response.data.reply,
      }])
    } catch (error) {
      setMessages((current) => [...current, {
        id: `${Date.now()}-error`,
        sender: 'bot',
        text: error.message,
        error: true,
      }])
    } finally {
      setIsSending(false)
    }
  }

  function handleSubmit(event) {
    event.preventDefault()
    sendMessage(input)
  }

  return (
    <div className="chatbot-widget">
      {open && (
        <div className="chatbot-panel" role="dialog" aria-label="AI shopping assistant">
          <div className="chatbot-header">
            <div className="chatbot-title-wrap">
              <div className="chatbot-icon"><Sparkles size={16} /></div>
              <div>
                <h3>AI Assistant</h3>
                <span>Catalog-aware shopping help</span>
              </div>
            </div>
            <button type="button" className="chatbot-close" aria-label="Close chat" onClick={() => setOpen(false)}>
              <X size={16} />
            </button>
          </div>

          <div className="chatbot-body" aria-live="polite" aria-busy={isSending}>
            {messages.map((message) => (
              <div key={message.id} className={`chat-message ${message.sender}${message.error ? ' error' : ''}`}>
                {message.text}
              </div>
            ))}
            {isSending && <div className="chat-message bot" role="status">Checking the catalog…</div>}
          </div>

          {!isSending && messages.length === 1 && (
            <div className="chatbot-quick-actions">
              {quickQuestions.map((question) => (
                <button key={question} type="button" onClick={() => sendMessage(question)}>
                  {question}
                </button>
              ))}
            </div>
          )}

          <form className="chatbot-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about groceries…"
              aria-label="Chat message"
              maxLength={1000}
              disabled={isSending}
            />
            <button type="submit" aria-label="Send message" disabled={isSending || !input.trim()}>
              <Send size={15} />
            </button>
          </form>
        </div>
      )}

      <button type="button" className="chatbot-fab" aria-label={open ? 'Close AI assistant' : 'Open AI assistant'} onClick={() => setOpen((current) => !current)}>
        {open ? <X size={22} /> : <MessageCircleMore size={24} />}
      </button>
    </div>
  )
}

export default Chatbot
