import { useState } from 'react'
import { ArrowLeft, Leaf } from 'lucide-react'

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api'

function ResetPassword() {
	const token = new URLSearchParams(window.location.search).get('token') || ''
	const [status, setStatus] = useState({ type: '', text: '' })
	const [loading, setLoading] = useState(false)

	async function handleSubmit(event) {
		event.preventDefault()
		const form = new FormData(event.currentTarget)
		const password = form.get('password')
		const confirm = form.get('confirm')
		if (password !== confirm) {
			setStatus({ type: 'error', text: 'The two passwords do not match.' })
			return
		}
		setLoading(true)
		setStatus({ type: '', text: '' })
		try {
			const res = await fetch(`${API_BASE}/auth/password-reset/complete`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ token, password }),
			})
			const body = await res.json().catch(() => ({}))
			if (!res.ok) {
				setStatus({ type: 'error', text: body.error || 'Something went wrong. Please try again.' })
			} else {
				setStatus({ type: 'success', text: 'Your password has been changed. You can now sign in.' })
			}
		} catch {
			setStatus({ type: 'error', text: 'Could not reach the server. Please try again.' })
		} finally {
			setLoading(false)
		}
	}

	return (
		<main className="login-page">
			<section className="login-panel" aria-labelledby="reset-title">
				<a className="login-home-link" href="/login"><ArrowLeft aria-hidden="true" size={16} />Back to sign in</a>
				<a className="login-brand" href="/" aria-label="FreshMart home">
					<span><Leaf aria-hidden="true" size={21} /></span>FreshMart
				</a>
				<span className="login-eyebrow">ACCOUNT HELP</span>
				<h1 id="reset-title">Choose a new password.</h1>
				{!token ? (
					<p className="login-message" role="status">This reset link is missing or invalid. <a href="/forgot-password">Request a new one</a>.</p>
				) : (
					<form className="login-form" onSubmit={handleSubmit}>
						<label htmlFor="reset-password">New password</label>
						<input id="reset-password" name="password" type="password" autoComplete="new-password" minLength={8} maxLength={128} required />
						<label htmlFor="reset-confirm">Confirm new password</label>
						<input id="reset-confirm" name="confirm" type="password" autoComplete="new-password" minLength={8} maxLength={128} required />
						<button className="login-submit" type="submit" disabled={loading}>
							{loading ? 'Saving...' : 'Change password'}
						</button>
						{status.text && <p className="login-message" role="status">{status.text}</p>}
						{status.type === 'success' && <a href="/login">Go to sign in</a>}
					</form>
				)}
			</section>
		</main>
	)
}

export default ResetPassword