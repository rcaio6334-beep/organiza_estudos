import { Link, useNavigate, useParams } from 'react-router-dom'

export default function TaskDetail({ tasks, onToggle, onEdit, onDelete }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const task = tasks.find((t) => t.id === id)

  if (!task) {
    return (
      <section className="card">
        <h2>Tarefa não encontrada</h2>
        <p>Ela pode ter sido excluída.</p>
        <Link to="/" className="btn-link">Voltar para a lista</Link>
      </section>
    )
  }

  function handleEdit() {
    onEdit(task.id)
    navigate('/')
  }

  function handleDelete() {
    if (onDelete(task.id)) navigate('/')
  }

  return (
    <section className="card detail" aria-labelledby="detail-title">
      <Link to="/" className="btn-link">← Voltar</Link>
      <h2 id="detail-title">{task.title}</h2>
      <dl>
        <dt>Disciplina</dt>
        <dd>{task.subject || 'Não informada'}</dd>
        <dt>Prioridade</dt>
        <dd><span className={`badge ${task.priority}`}>{task.priority}</span></dd>
        <dt>Situação</dt>
        <dd>{task.done ? 'Concluída' : 'Pendente'}</dd>
      </dl>
      <div className="actions">
        <button type="button" className="primary" onClick={() => onToggle(task.id)}>
          {task.done ? 'Marcar como pendente' : 'Marcar como concluída'}
        </button>
        <button type="button" onClick={handleEdit}>Editar</button>
        <button type="button" className="danger" onClick={handleDelete}>Excluir</button>
      </div>
    </section>
  )
}
