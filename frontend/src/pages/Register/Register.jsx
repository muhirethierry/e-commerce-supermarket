import { useState } from 'react'
import { ArrowLeft, CheckCircle2, Leaf } from 'lucide-react'
import { registerAccount } from '../../api/catalog'

function getPostRegistrationPath() {
	const next = new URLSearchParams(window.location.search).get('next')
	return next?.startsWith('/') && !next.startsWith('//') ? next : '/'
}

function Register() {
	const [message, setMessage] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [createdAccount, setCreatedAccount] = useState(null)

	function handleSubmit(event) {
		event.preventDefault()
		const formData = new FormData(event.currentTarget)
		if (formData.get('password') !== formData.get('confirmPassword')) {
			setMessage('The passwords do not match. Please check them and try again.')
			return
		}
		setIsSubmitting(true)
		setMessage('')
		registerAccount({
			name: formData.get('name'),
			email: formData.get('email'),
			password: formData.get('password'),
		})
			.then((response) => setCreatedAccount({ ...response.data, welcomeEmailSent: response.welcomeEmailSent }))
			.catch((error) => setMessage(error.message))
			.finally(() => setIsSubmitting(false))
	}

	return (
		<main className="login-page">
			<section className="login-panel" aria-labelledby="register-title">
				{createdAccount ? (
					<div className="auth-success" role="status">
						<CheckCircle2 aria-hidden="true" size={38} />
						<span className="login-eyebrow">ACCOUNT READY</span>
						<h1 id="register-title">Registration successful, {createdAccount.name}.</h1>
						<p>Your FreshMart account has been created successfully.</p>
						<p>{createdAccount.welcomeEmailSent
							? `We sent a welcome and thank-you email to ${createdAccount.email}.`
							: `Your account is ready, but we could not send the welcome email to ${createdAccount.email}. You can continue using FreshMart.`}</p>
						<a className="auth-success-link" href={getPostRegistrationPath()}>Continue to FreshMart</a>
						<p className="login-demo-note">You are signed in. Your password is protected and was not sent by email.</p>
					</div>
				) : <>
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
					<button className="login-submit" type="submit" disabled={isSubmitting}>
						{isSubmitting ? 'Creating account…' : 'Create account'}
					</button>
					{message && <p className="login-message" role="status">{message}</p>}
				</form>
				<p className="login-switch">Already have an account? <a href={`/login${window.location.search}`}>Sign in</a></p>
				<p className="login-demo-note">Your password is securely hashed by the server and is never stored as plain text.</p>
				</>}
			</section>
		</main>
	)
}

export default Register