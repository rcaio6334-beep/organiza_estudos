import { Link } from 'react-router-dom'

// Seção exibida no topo de TODAS as telas (login, lista e detalhe)
export default function AppHeader({ user, onLogout }) {
  return (
    <header className="app-header">
      <div>
        <h1>Organiza Estudos</h1>
        <p>Gerenciador acadêmico de tarefas feito com React.</p>
      </div>
      {user && (
        <nav className="user-box" aria-label="Menu do usuário">
          <Link to="/" className="btn-link">Tarefas</Link>
          <span>Olá, {user.name}</span>
          <button type="button" onClick={onLogout}>Sair</button>
        </nav>
      )}
    </header>
  )
}
