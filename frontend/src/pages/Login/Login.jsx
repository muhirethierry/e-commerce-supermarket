import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, CheckCircle2, Eye, EyeOff, Leaf, LockKeyhole } from 'lucide-react'
import { signIn, signInWithGoogle } from '../../api/catalog'

function getPostLoginPath() {
	const next = new URLSearchParams(window.location.search).get('next')
	return next?.startsWith('/') && !next.startsWith('//') ? next : '/'
}

function Login() {
	const [showPassword, setShowPassword] = useState(false)
	const [message, setMessage] = useState('')
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [loginSuccess, setLoginSuccess] = useState(false)
	const googleButtonRef = useRef(null)

	useEffect(() => {
		const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
		if (!clientId) {
			setMessage('Google sign-in needs VITE_GOOGLE_CLIENT_ID in the frontend and the matching GOOGLE_CLIENT_ID in the backend.')
			return
		}

		let cancelled = false
		const renderGoogleButton = () => {
			if (cancelled || !window.google?.accounts?.id || !googleButtonRef.current) return

			window.google.accounts.id.initialize({
				client_id: clientId,
				callback: async (response) => {
					if (!response.credential) {
						setMessage('Google sign-in did not return a credential.')
						return
					}
					setIsSubmitting(true)
					try {
						await signInWithGoogle(response.credential)
						setMessage('')
						setLoginSuccess(true)
					} catch (error) {
						setMessage(error.message)
					} finally {
						setIsSubmitting(false)
					}
				},
			})
			window.google.accounts.id.renderButton(googleButtonRef.current, {
				theme: 'outline',
				size: 'large',
				shape: 'rectangular',
				text: 'continue_with',
				width: googleButtonRef.current.clientWidth,
			})
		}

		const script = document.getElementById('google-identity-services')
		if (window.google?.accounts?.id) {
			renderGoogleButton()
		} else if (script) {
			script.addEventListener('load', renderGoogleButton, { once: true })
		} else {
			const googleScript = document.createElement('script')
			googleScript.id = 'google-identity-services'
			googleScript.src = 'https://accounts.google.com/gsi/client'
			googleScript.async = true
			googleScript.defer = true
			googleScript.onload = renderGoogleButton
			googleScript.onerror = () => setMessage('Google sign-in could not load. Check your connection and try again.')
			document.head.appendChild(googleScript)
		}

		return () => {
			cancelled = true
			script?.removeEventListener('load', renderGoogleButton)
		}
	}, [])

	function handleSubmit(event) {
		event.preventDefault()
		const formData = new FormData(event.currentTarget)
		setIsSubmitting(true)
		setMessage('')
		signIn({ email: formData.get('email'), password: formData.get('password') })
			.then(() => setLoginSuccess(true))
			.catch((error) => setMessage(error.message))
			.finally(() => setIsSubmitting(false))
	}

	return (
		<main className="login-page">
			<section className="login-panel" aria-labelledby="login-title">
				<a className="login-home-link" href="/">
					<ArrowLeft aria-hidden="true" size={16} />
					Back to FreshMart
				</a>

				<a className="login-brand" href="/" aria-label="FreshMart home">
					<span><Leaf aria-hidden="true" size={21} /></span>
					FreshMart
				</a>

				<span className="login-eyebrow">YOUR EVERYDAY SHOP, MADE EASY</span>
				<h1 id="login-title">Welcome back.</h1>
				<p className="login-intro">Sign in to continue your fresh grocery routine.</p>
				{loginSuccess && (
					<div className="auth-success auth-success-compact" role="status">
						<CheckCircle2 aria-hidden="true" size={22} />
						<div>
							<strong>Login successful.</strong>
							<p>You’re signed in to FreshMart.</p>
						</div>
						<a className="auth-success-link" href={getPostLoginPath()}>Continue</a>
					</div>
				)}

				<form className="login-form" onSubmit={handleSubmit}>
					<label htmlFor="login-email">Email address</label>
					<input
						id="login-email"
						name="email"
						type="email"
						autoComplete="email"
						placeholder="you@example.com"
												required
					/>

					<div className="login-password-label">
						<label htmlFor="login-password">Password</label>
						<a href="/forgot-password" className="login-link">Forgot password?</a>
					</div>
					<div className="login-password-field">
						<LockKeyhole aria-hidden="true" size={17} />
						<input
							id="login-password"
							name="password"
							type={showPassword ? 'text' : 'password'}
							autoComplete="current-password"
							placeholder="Enter your password"
							required
						/>
						<button
							type="button"
							className="login-password-toggle"
							aria-label={showPassword ? 'Hide password' : 'Show password'}
							aria-pressed={showPassword}
							onClick={() => setShowPassword((visible) => !visible)}
						>
							{showPassword ? <EyeOff aria-hidden="true" size={18} /> : <Eye aria-hidden="true" size={18} />}
						</button>
					</div>

					<div className="login-remember-row">
						<label className="login-checkbox">
							<input type="checkbox" />
							<span>Remember me</span>
						</label>
					</div>

					<button className="login-submit" type="submit" disabled={isSubmitting}>
						{isSubmitting ? 'Signing in…' : 'Sign in'}
					</button>

					<div className="login-divider"><span>or continue with</span></div>
					<div className="login-google" ref={googleButtonRef} />
					{message && <p className="login-message" role="status">{message}</p>}
				</form>

				<p className="login-switch">
					Don’t have an account? <a href={`/register${window.location.search}`}>Sign up</a>
				</p>
				<p className="login-demo-note">Your session is protected by a server-set HttpOnly cookie.</p>
			</section>
		</main>
	)
}

export default Login
