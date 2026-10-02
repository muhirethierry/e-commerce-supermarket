import { useMemo, useState } from 'react'
import { MessageCircleMore, Send, Sparkles, X } from 'lucide-react'
import products from '../../data/products'

const quickQuestions = [
  'Recommend fresh fruits',
  'Best breakfast deals',
  'Budget-friendly items',
  'Need kitchen essentials',
]

function getAssistantReply(input) {
  const text = input.toLowerCase()
  const categorySuggestions = {
    fruit: ['Fresh Bananas', 'Fresh Apples', 'Fresh Oranges'],
    breakfast: ['Corn Flakes cereal', 'Instant oats original', 'Fresh Eggs'],
    kitchen: ['Electric kettle 1.7 L', 'Countertop blender', 'Hand blender set'],
    budget: ['Fresh Potatoes', 'Fresh Onions', 'Fresh Garlic'],
  }

  if (text.includes('fruit') || text.includes('vegetable')) {
    return `Fresh picks for you: ${categorySuggestions.fruit.join(', ')}. These are great for healthy meals and quick shopping.`
  }

  if (text.includes('breakfast') || text.includes('morning')) {
    return `For breakfast, I recommend: ${categorySuggestions.breakfast.join(', ')}. They are easy, filling, and popular with customers.`
  }

  if (text.includes('kitchen') || text.includes('home') || text.includes('appliance')) {
    return `Kitchen essentials to check: ${categorySuggestions.kitchen.join(', ')}. These are useful for everyday cooking and quick meals.`
  }

  if (text.includes('cheap') || text.includes('budget') || text.includes('low')) {
    return `Budget-friendly choices: ${categorySuggestions.budget.join(', ')}. They offer good value without compromising quality.`
  }

  if (text.includes('milk') || text.includes('dairy') || text.includes('egg')) {
    return 'Our dairy selection is strong right now. Try fresh whole milk, plain yogurt, and fresh eggs for everyday essentials.'
  }

  if (text.includes('snack') || text.includes('sweet')) {
    return 'Popular snack picks include mixed nuts, dried mango slices, and granola snack bars. They are easy to grab and great for lunchboxes.'
  }

  const featured = products.filter((item) => item.category === 'Fruits & Vegetables').slice(0, 3)
  const names = featured.map((item) => item.name).join(', ')

  return `I can help with fresh groceries, breakfast picks, kitchen essentials, and budget suggestions. Try asking about fruits, dairy, snacks, or deals. For example: ${names}.`
}

function Chatbot() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: 'Hi! I am your shopping assistant. Ask me for fruit ideas, breakfast picks, or budget-friendly items.',
    },
  ])

  const quickReplyText = useMemo(() => quickQuestions, [])

  function addMessage(text, sender = 'user') {
    const message = {
      id: Date.now() + Math.random(),
      sender,
      text,
    }

    setMessages((current) => [...current, message])
  }

  function handleSubmit(event) {
    event.preventDefault()

    const trimmed = input.trim()
    if (!trimmed) return

    addMessage(trimmed, 'user')
    setTimeout(() => {
      addMessage(getAssistantReply(trimmed), 'bot')
    }, 250)
    setInput('')
  }

  function handleQuickQuestion(question) {
    addMessage(question, 'user')
    setTimeout(() => {
      addMessage(getAssistantReply(question), 'bot')
    }, 250)
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
                <span>Shopping help</span>
              </div>
            </div>
            <button type="button" className="chatbot-close" aria-label="Close chat" onClick={() => setOpen(false)}>
              <X size={16} />
            </button>
          </div>

          <div className="chatbot-body">
            {messages.map((message) => (
              <div key={message.id} className={`chat-message ${message.sender}`}>
                {message.text}
              </div>
            ))}
          </div>

          <div className="chatbot-quick-actions">
            {quickReplyText.map((question) => (
              <button key={question} type="button" onClick={() => handleQuickQuestion(question)}>
                {question}
              </button>
            ))}
          </div>

          <form className="chatbot-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about groceries..."
              aria-label="Chat message"
            />
            <button type="submit" aria-label="Send message">
              <Send size={15} />
            </button>
          </form>
        </div>
      )}

      <button type="button" className="chatbot-fab" aria-label="Open AI assistant" onClick={() => setOpen((current) => !current)}>
        <MessageCircleMore size={24} />
      </button>
    </div>
  )
}

export default Chatbot
