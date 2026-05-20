const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'alunolab',
    database: 'caritas_db',
    port: 3303,
    waitForConnections: true,
    connectionLimit: 10
});

// LOGIN
app.post('/api/login', (req, res) => {
    const { email, senha } = req.body;
    db.query('SELECT * FROM usuarios WHERE email = ? AND senha = ?', [email, senha], (err, results) => {
        if (err || results.length === 0) return res.status(401).json({ erro: 'Credenciais inválidas.' });
        res.json({ sucesso: true, usuario: results[0] });
    });
});

// DASHBOARD
app.get('/api/dashboard', (req, res) => {
    db.query('SELECT COUNT(*) AS total FROM assistidos', (err, totalResult) => {
        db.query('SELECT necessidade_principal, COUNT(*) as qtd FROM assistidos GROUP BY necessidade_principal', (err, necessidades) => {
            res.json({ total: totalResult[0].total, necessidades: necessidades || [] });
        });
    });
});

// GET ASSISTIDOS (Com filtro de LGPD simples na query params)
app.get('/api/assistidos', (req, res) => {
    const cargo = req.query.cargo;
    db.query('SELECT * FROM assistidos ORDER BY id DESC', (err, results) => {
        const dados = results.map(a => {
            if (cargo !== 'Psicologo' && cargo !== 'Coordenador') a.observacoes_psicologicas = '[SIGILO]';
            return a;
        });
        res.json(dados);
    });
});

// POST ASSISTIDOS
app.post('/api/assistidos', (req, res) => {
    const { nome, cpf, telefone, endereco, bairro, composicao_familiar, renda_familiar, necessidade_principal, observacoes_sociais, observacoes_psicologicas, cadastrado_por, cargo } = req.body;
    
    // Verificação de Duplicidade
    db.query('SELECT cpf, nome FROM assistidos WHERE cpf = ? OR nome = ?', [cpf, nome], (err, results) => {
        if (results.length > 0) {
            let duplicados = [];
            if (results.find(r => r.cpf === cpf)) duplicados.push('CPF');
            if (results.find(r => r.nome.toLowerCase() === nome.toLowerCase())) duplicados.push('Nome');
            return res.status(400).json({ erro: `Atenção: ${duplicados.join(' e ')} já cadastrado(s) no sistema!` });
        }

        const anotacaoPsico = (cargo === 'Psicologo' || cargo === 'Coordenador') ? observacoes_psicologicas : null;
        const sql = `INSERT INTO assistidos (nome, cpf, telefone, endereco, bairro, composicao_familiar, renda_familiar, necessidade_principal, observacoes_sociais, observacoes_psicologicas, cadastrado_por) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        db.query(sql, [nome, cpf, telefone, endereco, bairro, composicao_familiar || 1, renda_familiar || 0, necessidade_principal, observacoes_sociais, anotacaoPsico, cadastrado_por], (err) => {
            if (err) return res.status(500).json({ erro: err.message });
            res.json({ sucesso: true });
        });
    });
});

// PUT ASSISTIDOS (Edição)
app.put('/api/assistidos/:id', (req, res) => {
    const id = req.params.id;
    const { nome, bairro, necessidade_principal, observacoes_sociais, observacoes_psicologicas, cargo } = req.body;
    const anotacaoPsico = (cargo === 'Psicologo' || cargo === 'Coordenador') ? observacoes_psicologicas : null;
    
    const sql = `UPDATE assistidos SET nome=?, bairro=?, necessidade_principal=?, observacoes_sociais=?, observacoes_psicologicas=? WHERE id=?`;
    db.query(sql, [nome, bairro, necessidade_principal, observacoes_sociais, anotacaoPsico, id], (err) => {
        if (err) return res.status(500).json({ erro: err.message });
        res.json({ sucesso: true });
    });
});

app.listen(3000, () => console.log(`🚀 Servidor rodando na porta 3000.`));
