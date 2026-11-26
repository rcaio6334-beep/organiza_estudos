import { useEffect, useState } from 'react'

const API_URL = 'https://dummyjson.com/quotes/random'

// Consome uma API pública e trata carregamento, erro e sucesso
export default function QuoteBanner() {
  const [state, setState] = useState({ status: 'loading', quote: null })
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    setState({ status: 'loading', quote: null })

    fetch(API_URL, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error('Resposta inválida')
        return res.json()
      })
      .then((data) =>
        setState({ status: 'ok', quote: { text: data.quote, author: data.author } })
      )
      .catch((err) => {
        if (err.name === 'AbortError') return
        setState({ status: 'error', quote: null })
      })

    return () => controller.abort()
  }, [attempt])

  return (
    <aside className="quote" aria-live="polite">
      {state.status === 'loading' && <p>Carregando frase do dia...</p>}
      {state.status === 'ok' && (
        <p>
          “{state.quote.text}” <span className="quote-author">— {state.quote.author}</span>
        </p>
      )}
      {state.status === 'error' && (
        <p>
          Não foi possível carregar a frase do dia.{' '}
          <button type="button" onClick={() => setAttempt((n) => n + 1)}>
            Tentar de novo
          </button>
        </p>
      )}
    </aside>
  )
}
