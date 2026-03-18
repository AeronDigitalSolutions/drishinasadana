const API_BASE_URL = import.meta.env.DEV ? '' : import.meta.env.VITE_API_BASE_URL || ''
const getApiUrl = (path) => `${API_BASE_URL}${path}`

let razorpayScriptPromise = null

const loadRazorpayScript = () => {
  if (window.Razorpay) return Promise.resolve(true)
  if (razorpayScriptPromise) return razorpayScriptPromise

  razorpayScriptPromise = new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.async = true
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })

  return razorpayScriptPromise
}

const callApi = async (path, payload) => {
  try {
    const response = await fetch(getApiUrl(path), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    const raw = await response.text()
    const isHtml = raw.trim().startsWith('<!DOCTYPE') || raw.trim().startsWith('<html')
    if (isHtml) {
      throw new Error('Payments API returned HTML instead of JSON. Restart `npm run dev` and hard refresh browser.')
    }
    const data = raw ? JSON.parse(raw) : {}
    if (!response.ok) {
      throw new Error(data?.error || 'Payment request failed.')
    }
    return data
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error('Payments server is not reachable. Start with: npm run dev')
    }
    throw error
  }
}

export const startRazorpayPayment = async ({ workshop, customer, onSuccess }) => {
  const scriptLoaded = await loadRazorpayScript()
  if (!scriptLoaded) {
    throw new Error('Unable to load Razorpay checkout. Please check internet and retry.')
  }

  const orderData = await callApi('/api/payments/create-order', {
    workshopId: workshop.id,
    customer,
  })

  return new Promise((resolve, reject) => {
    const razorpay = new window.Razorpay({
      key: orderData.keyId,
      amount: orderData.amount,
      currency: orderData.currency,
      name: 'Ishinna Sadana',
      description: orderData.workshop.title,
      order_id: orderData.orderId,
      prefill: {
        name: [customer?.firstName, customer?.lastName].filter(Boolean).join(' ').trim(),
        email: customer?.email || '',
        contact: customer?.phone || '',
      },
      theme: {
        color: '#f97316',
      },
      handler: async (paymentResponse) => {
        try {
          await callApi('/api/payments/verify', {
            ...paymentResponse,
            workshopId: workshop.id,
            amountPaise: orderData.amount,
            customer,
          })
          if (onSuccess) {
            await onSuccess({
              paymentId: paymentResponse.razorpay_payment_id,
              orderId: paymentResponse.razorpay_order_id,
            })
          }
          resolve(paymentResponse)
        } catch (error) {
          reject(error)
        }
      },
      modal: {
        ondismiss: () => reject(new Error('Payment cancelled.')),
      },
    })

    razorpay.open()
  })
}
