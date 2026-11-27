// Autenticação de DEMONSTRAÇÃO, apenas no front-end.
// Em um sistema real, o usuário e a senha seriam validados por um servidor (API).
const SESSION_KEY = 'organiza-estudos:session'
const DEMO_USER = { username: 'aluno', password: 'react123', name: 'Aluno' }

export const DEMO_CREDENTIALS = { username: DEMO_USER.username, password: DEMO_USER.password }

export function login(username, password) {
  if (username.trim().toLowerCase() === DEMO_USER.username && password === DEMO_USER.password) {
    const user = { username: DEMO_USER.username, name: DEMO_USER.name }
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user))
    } catch {
      // sem armazenamento: a sessão vale apenas enquanto a página estiver aberta
    }
    return { ok: true, user }
  }
  return { ok: false, error: 'Usuário ou senha inválidos.' }
}

export function getSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY)
    if (!raw) return null
    const data = JSON.parse(raw)
    return data && typeof data.username === 'string' ? data : null
  } catch {
    return null
  }
}

export function logout() {
  try {
    localStorage.removeItem(SESSION_KEY)
  } catch {
    // nada a fazer
  }
}
