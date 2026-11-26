export function normalizeTitle(title) {
  return title.trim().replace(/\s+/g, ' ')
}

// Retorna uma mensagem de erro, ou null se os dados forem válidos
export function validateTask({ title }) {
  const normalized = normalizeTitle(title)
  if (!normalized) return 'Informe um título para a tarefa.'
  if (normalized.length > 100) return 'O título deve ter no máximo 100 caracteres.'
  return null
}
