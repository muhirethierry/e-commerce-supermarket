import { useEffect, useRef, useState } from 'react'

const imageCache = new Map()
const ignoredTerms = new Set([
  'fresh', 'product', 'classic', 'original', 'pack', 'small', 'large', 'regular',
  'ready', 'daily', 'style', 'size', 'with', 'and', 'the', 'for', 'of',
  'food', 'foods', 'care', 'items', 'demo', 'sample', 'set', 'piece',
  'ply', 'ml', 'kg', 'cm', 'inch', 'inches', 'packets', 'package',
])
let requestsInFlight = 0
const requestQueue = []

function meaningfulWords(value) {
  return value.toLowerCase().match(/[a-z0-9]+/g)
    ?.filter((word) => word.length > 2 && !ignoredTerms.has(word)) || []
}

function normalizeText(value = '') {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()
}

function buildSearchTerms(productName, category) {
  const productTerms = meaningfulWords(productName)
  const categoryTerms = meaningfulWords(category || '')
  const combined = [...productTerms, ...categoryTerms]
  const unique = [...new Set(combined)].filter(Boolean)

  return unique.slice(0, 6)
}

function buildProductNameImage(productName, category) {
  const label = (productName || category || 'Product').trim().slice(0, 28)
  const words = label.split(/\s+/).filter(Boolean)
  const initials = words.slice(0, 3).map((word) => word[0]?.toUpperCase() || '').join('') || 'P'
  const palette = ['#0d8c52', '#1ab26b', '#f59e0b', '#2563eb', '#7c3aed', '#ef4444']
  const color = palette[Math.abs(label.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0)) % palette.length]

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="800" viewBox="0 0 800 800">
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stop-color="#f4fff7"/>
          <stop offset="100%" stop-color="${color}"/>
        </linearGradient>
      </defs>
      <rect width="800" height="800" fill="url(#g)"/>
      <circle cx="650" cy="150" r="120" fill="rgba(255,255,255,0.18)"/>
      <circle cx="180" cy="650" r="150" fill="rgba(255,255,255,0.12)"/>
      <text x="50%" y="42%" text-anchor="middle" fill="#ffffff" font-size="180" font-family="Arial, Helvetica, sans-serif" font-weight="700">${initials}</text>
      <text x="50%" y="66%" text-anchor="middle" fill="#ffffff" font-size="34" font-family="Arial, Helvetica, sans-serif" font-weight="700">${label.replace(/&/g, '&amp;')}</text>
    </svg>
  `.trim()

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

function textFromMetadata(value = '') {
  return value
    .replace(/<[^>]*>/g, ' ')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim()
}

function runNextRequest() {
  if (requestsInFlight >= 3 || requestQueue.length === 0) return
  requestsInFlight += 1

  const task = requestQueue.shift()
  task().finally(() => {
    requestsInFlight -= 1
    window.setTimeout(runNextRequest, 180)
  })

  if (requestsInFlight < 3) runNextRequest()
}

function getCommonsImage(productName, category) {
  const cacheKey = `${productName}|${category}`.toLowerCase()
  if (imageCache.has(cacheKey)) return imageCache.get(cacheKey)

  const lookup = new Promise((resolve) => {
    requestQueue.push(async () => {
      const queryTerms = buildSearchTerms(productName, category)
      const query = queryTerms.join(' ') || meaningfulWords(productName).slice(0, 3).join(' ')
      const params = new URLSearchParams({
        action: 'query',
        generator: 'search',
        gsrsearch: query,
        gsrnamespace: '6',
        gsrlimit: '8',
        prop: 'imageinfo|info',
        inprop: 'url',
        iiprop: 'url|extmetadata|mime',
        iiurlwidth: '500',
        format: 'json',
        origin: '*',
      })

      try {
        const response = await fetch(`https://commons.wikimedia.org/w/api.php?${params}`)
        if (!response.ok) return resolve(null)

        const data = await response.json()
        const productNameText = normalizeText(productName)
        const productWords = [...new Set(meaningfulWords(productName))]
        const categoryText = normalizeText(category || '')

        const candidates = Object.values(data.query?.pages || [])
          .map((page) => {
            const info = page.imageinfo?.[0]
            if (!info?.thumburl || !info.extmetadata?.LicenseShortName?.value) return null
            if (info.mimetype && !info.mimetype.startsWith('image/')) return null
            if (/(?:\.pdf|\.webm|\.ogv|\.ogg)(?:\/|$|\?|#)/i.test(info.thumburl)) return null

            const titleText = normalizeText(textFromMetadata(page.title.replace(/^File:/, '')))
            const titleWords = new Set(meaningfulWords(page.title))
            const matchingWords = productWords.filter((word) => titleWords.has(word)).length
            const titleWordMatches = productWords.filter((word) => titleText.includes(word)).length
            const categoryBoost = categoryText && titleText.includes(categoryText) ? 0.4 : 0
            const exactMatch = productNameText && titleText.includes(productNameText) ? 1.2 : 0
            const partialMatch = productNameText && titleText.includes(productNameText.split(' ')[0]) ? 0.2 : 0
            const score = (matchingWords / Math.max(productWords.length, 1)) + (titleWordMatches / Math.max(productWords.length, 1)) + categoryBoost + exactMatch + partialMatch

            return {
              image: info.thumburl,
              pageUrl: page.fullurl,
              title: textFromMetadata(page.title.replace(/^File:/, '')),
              creator: textFromMetadata(info.extmetadata.Artist?.value) || 'Wikimedia Commons contributor',
              license: textFromMetadata(info.extmetadata.LicenseShortName.value),
              score,
            }
          })
          .filter(Boolean)
          .sort((first, second) => second.score - first.score)

        const bestCandidate = candidates[0]
        const enoughMatch = bestCandidate && (
          bestCandidate.score >= 0.75 ||
          productWords.some((word) => bestCandidate.title.toLowerCase().includes(word))
        )

        resolve(enoughMatch ? bestCandidate : null)
      } catch {
        resolve(null)
      }
    })

    runNextRequest()
  })

  imageCache.set(cacheKey, lookup)
  return lookup
}

function ProductImage({ product }) {
  const containerRef = useRef(null)
  const [photo, setPhoto] = useState(null)
  const [failedImage, setFailedImage] = useState(false)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    if (!containerRef.current || !('IntersectionObserver' in window)) return

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      observer.disconnect()
      getCommonsImage(product.name, product.category).then(setPhoto)
    }, { rootMargin: '220px' })

    observer.observe(containerRef.current)
    return () => observer.disconnect()
  }, [product.category, product.name])

  useEffect(() => {
    if (!expanded) return

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setExpanded(false)
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [expanded])

  const fallbackImage = product.demoProduct
    ? (product.image || buildProductNameImage(product.name, product.category))
    : product.image
  const activeImage = failedImage || (!photo && product.demoProduct)
    ? fallbackImage
    : photo?.image || product.image || fallbackImage

  return (
    <>
      <div ref={containerRef} className="product-photo-frame">
        <button
          type="button"
          className="product-photo-trigger"
          aria-label={`Enlarge image of ${product.name}`}
          onClick={() => setExpanded(true)}
        >
          <img
            src={activeImage}
            alt={product.name}
            loading="lazy"
            onError={(event) => {
              if (photo && event.currentTarget.src === photo.image) setFailedImage(true)
            }}
          />
        </button>
        {photo && !failedImage && (
          <a
            className="product-image-credit"
            href={photo.pageUrl}
            target="_blank"
            rel="noreferrer"
            aria-label={`Photo ${photo.title} by ${photo.creator}, ${photo.license}, opens Wikimedia Commons`}
            onClick={(event) => event.stopPropagation()}
          >
            Photo: {photo.creator} · {photo.license}
          </a>
        )}
      </div>

      {expanded && (
        <div className="product-image-lightbox" onClick={() => setExpanded(false)} role="dialog" aria-modal="true" aria-label={`${product.name} enlarged image`}>
          <div className="product-image-lightbox-content" onClick={(event) => event.stopPropagation()}>
            <button
              type="button"
              className="product-image-close"
              aria-label="Close enlarged product image"
              onClick={() => setExpanded(false)}
            >
              ×
            </button>
            <img src={activeImage} alt={product.name} />
            <div className="product-image-lightbox-meta">
              <strong>{product.name}</strong>
              {photo && !failedImage && <span>Source: {photo.creator}</span>}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ProductImage