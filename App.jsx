import { useState } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import TaskForm from './TaskForm.jsx'
import TaskFilters from './TaskFilters.jsx'
import TaskSummary from './TaskSummary.jsx'
import TaskList from './TaskList.jsx'
import TaskDetail from './TaskDetail.jsx'
import QuoteBanner from './QuoteBanner.jsx'
import { loadTasks, saveTasks } from './taskStorage.js'
import { normalizeTitle } from './validation.js'

function newId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

export default function App() {
  const [initial] = useState(loadTasks)
  const [tasks, setTasks] = useState(initial.tasks)
  const [storageError, setStorageError] = useState(initial.error)
  const [editingId, setEditingId] = useState(null)
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('todas')

  // Única fonte de verdade: atualiza o estado e persiste
  function commit(next) {
    setTasks(next)
    setStorageError(saveTasks(next))
  }

  function handleSubmit({ title, subject, priority }) {
    const data = { title: normalizeTitle(title), subject: subject.trim(), priority }
    if (editingId) {
      commit(tasks.map((t) => (t.id === editingId ? { ...t, ...data } : t)))
      setEditingId(null)
    } else {
      commit([...tasks, { id: newId(), done: false, ...data }])
    }
  }

  function handleToggle(id) {
    commit(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  function handleDelete(id) {
    const task = tasks.find((t) => t.id === id)
    if (!task || !window.confirm(`Excluir a tarefa "${task.title}"?`)) return false
    commit(tasks.filter((t) => t.id !== id))
    if (editingId === id) setEditingId(null)
    return true
  }

  // Valores derivados da coleção principal
  const visible = tasks.filter((t) => {
    const matchText = `${t.title} ${t.subject}`.toLowerCase().includes(query.trim().toLowerCase())
    const matchStatus =
      status === 'todas' || (status === 'concluidas' ? t.done : !t.done)
    return matchText && matchStatus
  })
  const done = tasks.filter((t) => t.done).length
  const editingTask = tasks.find((t) => t.id === editingId) ?? null

  return (
    <div className="container">
      <header>
        <h1>Organiza Estudos</h1>
        <p>Gerenciador acadêmico de tarefas feito com React.</p>
      </header>

      {storageError && (
        <div className="alert" role="alert">
          {storageError}
        </div>
      )}

      <QuoteBanner />

      <Routes>
        <Route
          path="/"
          element={
            <>
                    <TaskSummary total={tasks.length} pending={tasks.length - done} done={done} />

                    <section aria-labelledby="form-title" className="card">
                      <h2 id="form-title">{editingTask ? 'Editar tarefa' : 'Nova tarefa'}</h2>
                      <TaskForm
                        key={editingId ?? 'new'}
                        initialValues={editingTask}
                        onSubmit={handleSubmit}
                        onCancel={editingTask ? () => setEditingId(null) : null}
                      />
                    </section>

                    <section aria-labelledby="list-title" className="card">
                      <h2 id="list-title">Suas tarefas</h2>
                      <TaskFilters
                        query={query}
                        status={status}
                        onQueryChange={setQuery}
                        onStatusChange={setStatus}
                      />
                      <TaskList
                        tasks={visible}
                        hasAny={tasks.length > 0}
                        onToggle={handleToggle}
                        onEdit={setEditingId}
                        onDelete={handleDelete}
                      />
                    </section>
            </>
          }
        />
        <Route
          path="/tarefa/:id"
          element={
            <TaskDetail
              tasks={tasks}
              onToggle={handleToggle}
              onEdit={setEditingId}
              onDelete={handleDelete}
            />
          }
        />
        <Route
          path="*"
          element={
            <p className="card">
              Página não encontrada. <Link to="/">Voltar ao início</Link>
            </p>
          }
        />
      </Routes>
    </div>
  )
}
