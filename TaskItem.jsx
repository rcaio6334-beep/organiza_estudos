import { Link } from 'react-router-dom'

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const checkId = `check-${task.id}`
  return (
    <li className={`task ${task.done ? 'done' : ''}`}>
      <input
        id={checkId}
        type="checkbox"
        checked={task.done}
        onChange={() => onToggle(task.id)}
      />
      <label htmlFor={checkId} className="task-info">
        <span className="task-title">{task.title}</span>
        <span className="task-meta">
          {task.subject && `${task.subject} · `}
          <span className={`badge ${task.priority}`}>{task.priority}</span>
        </span>
      </label>
      <div className="task-actions">
        <Link to={`/tarefa/${task.id}`} className="btn-link" aria-label={`Ver detalhes de ${task.title}`}>
          Detalhes
        </Link>
        <button type="button" onClick={() => onEdit(task.id)} aria-label={`Editar ${task.title}`}>
          Editar
        </button>
        <button
          type="button"
          className="danger"
          onClick={() => onDelete(task.id)}
          aria-label={`Excluir ${task.title}`}
        >
          Excluir
        </button>
      </div>
    </li>
  )
}
