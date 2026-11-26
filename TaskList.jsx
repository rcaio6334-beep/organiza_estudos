import TaskItem from './TaskItem.jsx'

export default function TaskList({ tasks, hasAny, onToggle, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return (
      <p className="empty">
        {hasAny ? 'Nenhuma tarefa corresponde aos filtros.' : 'Nenhuma tarefa cadastrada ainda.'}
      </p>
    )
  }
  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}
