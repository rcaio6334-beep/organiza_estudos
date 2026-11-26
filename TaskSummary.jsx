export default function TaskSummary({ total, pending, done }) {
  return (
    <section className="summary" aria-label="Resumo das tarefas">
      <div><strong>{total}</strong><span>Total</span></div>
      <div><strong>{pending}</strong><span>Pendentes</span></div>
      <div><strong>{done}</strong><span>Concluídas</span></div>
    </section>
  )
}
