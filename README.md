# SIGHAS - Cáritas (Vanilla HTML/CSS/JS + Node.js Backend)

A pedido, a arquitetura React foi convertida para HTML/CSS/JS puros e nativos, mantendo 100% do layout desenhado e das funcionalidades. A edição direta ("in-line") na tabela agora usa dropdowns exatos conforme a inserção.

## Estrutura do Projeto
- `backend/` -> Contém a API em Node.js (`server.js`)
- `frontend/` -> Contém a Interface (`index.html`, `style.css`, `app.js`)

## Como Executar

### 1. Banco de Dados
- Execute o script `schema.sql` no MySQL Workbench.

### 2. Backend (Servidor)
1. No terminal, entre na pasta `backend`: `cd backend`
2. Instale as bibliotecas: `npm install`
3. Inicie o servidor: `npm start`
   - O backend rodará na porta 3000.

### 3. Frontend (Interface Web)
1. Não há mais necessidade de rodar `npm run dev` ou Vite.
2. Basta abrir a pasta `frontend` e dar **dois cliques** no arquivo `index.html`. 
3. O sistema abrirá diretamente no seu navegador nativo e fará as requisições para o backend localmente.

### 4. Acesso ao Sistema
As contas de teste já estão inseridas no SQL original:
- **Email:** coordenador@caritas.org 
- **Senha:** teste123
