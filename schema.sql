CREATE DATABASE IF NOT EXISTS caritas_db;
USE caritas_db;

CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    cargo ENUM('Coordenador', 'Assistente Social', 'Psicologo', 'Voluntario') NOT NULL
);

CREATE TABLE IF NOT EXISTS assistidos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    data_nascimento DATE,
    cpf VARCHAR(14) UNIQUE,
    telefone VARCHAR(20),
    endereco VARCHAR(255),
    bairro VARCHAR(100),
    composicao_familiar INT DEFAULT 1,
    renda_familiar DECIMAL(10,2) DEFAULT 0.00,
    necessidade_principal VARCHAR(100),
    observacoes_sociais TEXT,
    observacoes_psicologicas TEXT,
    cadastrado_por VARCHAR(100),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO usuarios (nome, email, senha, cargo) VALUES 
('Diretoria Cáritas', 'coordenador@caritas.org', 'teste123', 'Coordenador'),
('Serviço Social', 'social@caritas.org', 'teste123', 'Assistente Social'),
('Atendimento Clínico', 'psicologo@caritas.org', 'teste123', 'Psicologo')
ON DUPLICATE KEY UPDATE senha='teste123';
