const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || '/api').replace(/\/$/, '')

async function request(path, options = {}) {
	const response = await fetch(`${apiBaseUrl}${path}`, {
		credentials: 'include',
		...options,
	})
	const payload = await response.json().catch(() => null)

	if (!response.ok) {
	const error = new Error(payload?.error || `Request failed (${response.status}).`)
		error.status = response.status
		error.code = payload?.code
		throw error
	}

	return payload
}

export async function getProducts(filters, { signal } = {}) {
	const params = new URLSearchParams()
	for (const [key, value] of Object.entries(filters)) {
		if (value !== undefined && value !== null && value !== '') params.set(key, String(value))
	}

	return request(`/products?${params.toString()}`, { signal })
}

export async function getProduct(productId, { signal } = {}) {
	return request(`/products/${encodeURIComponent(productId)}`, { signal })
}

export async function getCategories({ signal } = {}) {
	return request('/categories', { signal })
}

export async function getSubcategories(category, { signal } = {}) {
	const params = new URLSearchParams()
	if (category) params.set('category', category)
	return request(`/subcategories?${params.toString()}`, { signal })
}

export async function registerAccount(details) {
	return request('/auth/register', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(details),
	})
}

export async function signIn(details) {
	return request('/auth/login', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(details),
	})
}

export async function signInWithGoogle(credential) {
	return request('/auth/google', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ credential }),
	})
}

export async function getCurrentUser({ signal } = {}) {
	return request('/auth/me', { signal })
}

export async function signOut() {
	return request('/auth/logout', { method: 'POST' })
}

export async function createOrder(order) {
	return request('/orders', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(order),
	})
}

export async function askShoppingAssistant(message, history) {
	return request('/chat', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ message, history }),
	})
}

export async function getAdminSummary() {
	return request('/admin/summary')
}

export async function getAdminProducts(filters = {}) {
	const params = new URLSearchParams()
	for (const [key, value] of Object.entries(filters)) {
		if (value !== undefined && value !== null && value !== '') params.set(key, String(value))
	}
	return request(`/admin/products?${params.toString()}`)
}

export async function saveAdminProduct(product, productId) {
	return request(productId ? `/admin/products/${productId}` : '/admin/products', {
		method: productId ? 'PATCH' : 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(product),
	})
}

export async function archiveAdminProduct(productId) {
	return request(`/admin/products/${productId}`, { method: 'DELETE' })
}

export async function restoreAdminProduct(productId) {
	return request(`/admin/products/${productId}/restore`, { method: 'POST' })
}

export async function getAdminOrders(status = '') {
	const params = new URLSearchParams()
	if (status) params.set('status', status)
	return request(`/admin/orders?${params.toString()}`)
}

export async function updateAdminOrderStatus(orderId, status) {
	return request(`/admin/orders/${orderId}`, {
		method: 'PATCH',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ status }),
	})
}