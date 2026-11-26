import { useState } from 'react'
import { validateTask } from './validation.js'

export default function TaskForm({ initialValues, onSubmit, onCancel }) {
  const [title, setTitle] = useState(initialValues?.title ?? '')
  const [subject, setSubject] = useState(initialValues?.subject ?? '')
  const [priority, setPriority] = useState(initialValues?.priority ?? 'Média')
  const [error, setError] = useState(null)

  function handleSubmit(e) {
    e.preventDefault()
    const problem = validateTask({ title })
    if (problem) {
      setError(problem)
      return
    }
    onSubmit({ title, subject, priority })
    if (!initialValues) {
      setTitle('')
      setSubject('')
      setPriority('Média')
    }
    setError(null)
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="field">
        <label htmlFor="title">Título *</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? 'title-error' : undefined}
          placeholder="Ex.: Estudar Hooks do React"
        />
        {error && (
          <p id="title-error" className="error" role="alert">
            {error}
          </p>
        )}
      </div>

      <div className="row">
        <div className="field">
          <label htmlFor="subject">Disciplina</label>
          <input
            id="subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Ex.: Desenvolvimento Web"
          />
        </div>
        <div className="field">
          <label htmlFor="priority">Prioridade</label>
          <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option>Baixa</option>
            <option>Média</option>
            <option>Alta</option>
          </select>
        </div>
      </div>

      <div className="actions">
        <button type="submit" className="primary">
          {initialValues ? 'Salvar alterações' : 'Adicionar tarefa'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}
