import { useState } from 'react'
import { ArrowLeft, Leaf } from 'lucide-react'

function ForgotPassword() {
	const [submitted, setSubmitted] = useState(false)

	function handleSubmit(event) {
		event.preventDefault()
		setSubmitted(true)
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
				<p className="login-intro">Enter your email and we’ll show the next step when password recovery is connected.</p>
				<form className="login-form" onSubmit={handleSubmit}>
					<label htmlFor="forgot-email">Email address</label>
					<input id="forgot-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
					<button className="login-submit" type="submit">Request reset link</button>
					{submitted && <p className="login-message" role="status">Password reset is not connected yet. No email was sent.</p>}
				</form>
				<p className="login-demo-note">Frontend preview only. Your email is not sent or stored.</p>
			</section>
		</main>
	)
}

export default ForgotPassword