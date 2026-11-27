import { useState } from 'react'
import { Link, Navigate, Route, Routes } from 'react-router-dom'
import TaskForm from './TaskForm.jsx'
import TaskFilters from './TaskFilters.jsx'
import TaskSummary from './TaskSummary.jsx'
import TaskList from './TaskList.jsx'
import TaskDetail from './TaskDetail.jsx'
import QuoteBanner from './QuoteBanner.jsx'
import AppHeader from './AppHeader.jsx'
import Login from './Login.jsx'
import { getSession, logout } from './authService.js'
import { loadTasks, saveTasks } from './taskStorage.js'
import { normalizeTitle } from './validation.js'

function newId() {
  return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

// Protege as telas: sem login, redireciona para /login
function RequireAuth({ user, children }) {
  return user ? children : <Navigate to="/login" replace />
}

export default function App() {
  const [user, setUser] = useState(getSession)
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

  function handleLogout() {
    logout()
    setUser(null)
    setEditingId(null)
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
      <AppHeader user={user} onLogout={handleLogout} />

      {storageError && (
        <div className="alert" role="alert">
          {storageError}
        </div>
      )}

      {user && <QuoteBanner />}

      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" replace /> : <Login onLogin={setUser} />}
        />
        <Route
          path="/"
          element={
            <RequireAuth user={user}>
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
            </RequireAuth>
          }
        />
        <Route
          path="/tarefa/:id"
          element={
            <RequireAuth user={user}>
              <TaskDetail
                tasks={tasks}
                onToggle={handleToggle}
                onEdit={setEditingId}
                onDelete={handleDelete}
              />
            </RequireAuth>
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
