# Organiza Estudos

Gerenciador acadêmico de tarefas feito com **React + Vite**.
Trabalho do Grupo 1 — Desenvolvimento Web (ADS).

## Funcionalidades
- Cadastrar tarefa (título obrigatório, disciplina e prioridade)
- Editar, marcar como concluída e excluir (com confirmação)
- Filtrar por texto e por situação
- Painel com total, pendentes e concluídas
- Dados salvos no `localStorage` do navegador

## Como rodar
Requisito: Node.js 18 ou superior.

```bash
npm install
npm run dev      # servidor de desenvolvimento
npm run build    # gera a pasta dist
npm run preview  # testa o build
```

## Estrutura
```
src/
  App.jsx                 estado compartilhado (fonte de verdade)
  components/             TaskForm, TaskList, TaskItem, TaskFilters, TaskSummary
  services/taskStorage.js leitura e gravação (trocável por uma API)
  utils/validation.js     validação e normalização do título
```

## Publicar no GitHub Pages
1. Crie um repositório no GitHub e envie o código para a branch `main`.
2. Em **Settings → Pages**, em *Source*, escolha **GitHub Actions**.
3. A cada push, o workflow em `.github/workflows/deploy.yml` publica o site.

## Limitações
O `localStorage` não sincroniza entre dispositivos nem tem controle de acesso.

## Equipe
Mauro César Maia Reis · Eduardo Gabriel Soares Ferreira · Patrick de Oliveira Almeida · Caio Renato Nascimento Donati · Luís Mário Marques Costa
