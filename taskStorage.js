// Camada de persistência: concentra leitura e gravação.
// Para trocar o localStorage por uma API no futuro, basta alterar este arquivo.
const KEY = 'organiza-estudos:tasks'

export function loadTasks() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return { tasks: [], error: null }
    const data = JSON.parse(raw)
    if (!Array.isArray(data)) throw new Error('formato inválido')
    const tasks = data
      .filter((t) => t && typeof t.id === 'string' && typeof t.title === 'string')
      .map((t) => ({
        id: t.id,
        title: t.title,
        subject: typeof t.subject === 'string' ? t.subject : '',
        priority: ['Baixa', 'Média', 'Alta'].includes(t.priority) ? t.priority : 'Média',
        done: Boolean(t.done),
      }))
    return { tasks, error: null }
  } catch {
    return { tasks: [], error: 'Não foi possível ler os dados salvos. Você pode continuar usando o app.' }
  }
}

export function saveTasks(tasks) {
  try {
    localStorage.setItem(KEY, JSON.stringify(tasks))
    return null
  } catch {
    return 'Não foi possível salvar no navegador. Suas alterações valem apenas nesta sessão.'
  }
}
