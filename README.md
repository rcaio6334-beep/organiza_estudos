# Organiza Estudos

Gerenciador acadêmico de tarefas feito com **React + Vite**.
Trabalho do Grupo 1 — Desenvolvimento Web (ADS).

## Funcionalidades
- Tela de login (conta de demonstração: usuário `aluno`, senha `react123`) e cabeçalho com "Sair" em todas as telas
- Cadastrar tarefa (título obrigatório, disciplina e prioridade)
- Editar, marcar como concluída e excluir (com confirmação)
- Filtrar por texto e por situação
- Painel com total, pendentes e concluídas
- Página de detalhe de cada tarefa (rota `#/tarefa/:id`, com React Router)
- Frase do dia consumida de uma API pública (dummyjson.com), com tratamento de carregamento, erro e nova tentativa
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
  components/             TaskForm, TaskList, TaskItem, TaskFilters, TaskSummary, TaskDetail, QuoteBanner, Login, AppHeader
  services/taskStorage.js leitura e gravação (trocável por uma API)
  utils/validation.js     validação e normalização do título
```

## Publicar no GitHub Pages
1. Crie um repositório no GitHub e envie o código para a branch `main`.
2. Em **Settings → Pages**, em *Source*, escolha **GitHub Actions**.
3. A cada push, o workflow em `.github/workflows/deploy.yml` publica o site.

## Limitações
O login é apenas de demonstração, feito no front-end: as credenciais ficam no código e não oferecem segurança real. Em um sistema de verdade, a validação e a autorização precisam ser feitas por um servidor.

O `localStorage` não sincroniza entre dispositivos nem tem controle de acesso.

## Equipe
Mauro César Maia Reis · Eduardo Gabriel Soares Ferreira · Patrick de Oliveira Almeida · Caio Renato Nascimento Donati · Luís Mário Marques Costa
