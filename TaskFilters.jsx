export default function TaskFilters({ query, status, onQueryChange, onStatusChange }) {
  return (
    <div className="row filters">
      <div className="field">
        <label htmlFor="search">Buscar</label>
        <input
          id="search"
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder="Título ou disciplina"
        />
      </div>
      <div className="field">
        <label htmlFor="status">Situação</label>
        <select id="status" value={status} onChange={(e) => onStatusChange(e.target.value)}>
          <option value="todas">Todas</option>
          <option value="pendentes">Pendentes</option>
          <option value="concluidas">Concluídas</option>
        </select>
      </div>
    </div>
  )
}
