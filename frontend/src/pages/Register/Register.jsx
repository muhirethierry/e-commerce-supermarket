import { useState } from 'react'
import { ArrowLeft, Leaf } from 'lucide-react'

function Register() {
	const [message, setMessage] = useState('')

	function handleSubmit(event) {
		event.preventDefault()
		const formData = new FormData(event.currentTarget)
		if (formData.get('password') !== formData.get('confirmPassword')) {
			setMessage('The passwords do not match. Please check them and try again.')
			return
		}
		setMessage('Account creation is not connected yet. Your details were not saved.')
	}

	return (
		<main className="login-page">
			<section className="login-panel" aria-labelledby="register-title">
				<a className="login-home-link" href="/"><ArrowLeft aria-hidden="true" size={16} />Back to FreshMart</a>
				<a className="login-brand" href="/" aria-label="FreshMart home">
					<span><Leaf aria-hidden="true" size={21} /></span>FreshMart
				</a>
				<span className="login-eyebrow">JOIN FRESHMART</span>
				<h1 id="register-title">Create your account.</h1>
				<p className="login-intro">Keep your shopping details together for a smoother checkout.</p>
				<form className="login-form" onSubmit={handleSubmit}>
					<label htmlFor="register-name">Full name</label>
					<input id="register-name" name="name" autoComplete="name" required />
					<label htmlFor="register-email">Email address</label>
					<input id="register-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
					<label htmlFor="register-password">Password</label>
					<input id="register-password" name="password" type="password" autoComplete="new-password" minLength="8" required />
					<label htmlFor="register-confirm-password">Confirm password</label>
					<input id="register-confirm-password" name="confirmPassword" type="password" autoComplete="new-password" minLength="8" required />
					<button className="login-submit" type="submit">Create account</button>
					{message && <p className="login-message" role="status">{message}</p>}
				</form>
				<p className="login-switch">Already have an account? <a href="/login">Sign in</a></p>
				<p className="login-demo-note">Frontend preview only. Account details are not sent or stored.</p>
			</section>
		</main>
	)
}

export default Register