import { useState } from 'react'
import { ArrowLeft, Leaf } from 'lucide-react'

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api'

function ForgotPassword() {
	const [status, setStatus] = useState({ type: '', text: '' })
	const [loading, setLoading] = useState(false)

	async function handleSubmit(event) {
		event.preventDefault()
		const email = new FormData(event.currentTarget).get('email')
		setLoading(true)
		setStatus({ type: '', text: '' })
		try {
			const res = await fetch(`${API_BASE}/auth/password-reset/request`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ email }),
			})
			const body = await res.json().catch(() => ({}))
			if (!res.ok) {
				setStatus({ type: 'error', text: body.error || 'Something went wrong. Please try again.' })
			} else {
				setStatus({ type: 'success', text: body.data?.message || 'If an account exists for that email, a reset link will be sent.' })
			}
		} catch {
			setStatus({ type: 'error', text: 'Could not reach the server. Please try again.' })
		} finally {
			setLoading(false)
		}
	}

	return (
		<main className="login-page">
			<section className="login-panel" aria-labelledby="forgot-title">
				<a className="login-home-link" href="/login"><ArrowLeft aria-hidden="true" size={16} />Back to sign in</a>
				<a className="login-brand" href="/" aria-label="FreshMart home">
					<span><Leaf aria-hidden="true" size={21} /></span>FreshMart
				</a>
				<span className="login-eyebrow">ACCOUNT HELP</span>
				<h1 id="forgot-title">Reset your password.</h1>
				<p className="login-intro">Enter your email and we’ll send you a link to choose a new password.</p>
				<form className="login-form" onSubmit={handleSubmit}>
					<label htmlFor="forgot-email">Email address</label>
					<input id="forgot-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
					<button className="login-submit" type="submit" disabled={loading}>
						{loading ? 'Sending...' : 'Request reset link'}
					</button>
					{status.text && <p className="login-message" role="status">{status.text}</p>}
				</form>
			</section>
		</main>
	)
}

export default ForgotPassword