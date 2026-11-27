import { useState } from 'react'
import { DEMO_CREDENTIALS, login } from './authService.js'

export default function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    if (!username.trim() || !password) {
      setError('Informe o usuário e a senha.')
      return
    }
    const result = login(username, password)
    if (!result.ok) {
      setError(result.error)
      return
    }
    setError(null)
    onLogin(result.user)
  }

  return (
    <section className="card login" aria-labelledby="login-title">
      <h2 id="login-title">Entrar</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div className="field">
          <label htmlFor="username">Usuário</label>
          <input
            id="username"
            type="text"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="password">Senha</label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && (
          <p className="error" role="alert">
            {error}
          </p>
        )}
        <div className="actions">
          <button type="submit" className="primary">Entrar</button>
        </div>
      </form>
      <p className="hint">
        Conta de demonstração: usuário <strong>{DEMO_CREDENTIALS.username}</strong> e senha{' '}
        <strong>{DEMO_CREDENTIALS.password}</strong>.
      </p>
    </section>
  )
}
