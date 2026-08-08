-- SISTEMA SKILL
-- Script de criação do banco de dados

-- SEQUENCES

CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1;

CREATE SEQUENCE skills_id_seq
    START WITH 1
    INCREMENT BY 1;

CREATE SEQUENCE user_skills_id_seq
    START WITH 1
    INCREMENT BY 1;

-- TABELA: users

CREATE TABLE users (
    id BIGINT PRIMARY KEY DEFAULT nextval('users_id_seq'),
    login VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

-- TABELA: skills

CREATE TABLE skills (
    id BIGINT PRIMARY KEY DEFAULT nextval('skills_id_seq'),
    name VARCHAR(100) NOT NULL,
    description VARCHAR(500),
    image_url VARCHAR(500)
);

-- TABELA: user_skills

CREATE TABLE user_skills (
    id BIGINT PRIMARY KEY DEFAULT nextval('user_skills_id_seq'),

    user_id BIGINT NOT NULL,
    skill_id BIGINT NOT NULL,
    level INTEGER NOT NULL,

    CONSTRAINT fk_user_skills_user
        FOREIGN KEY (user_id)
        REFERENCES users(id),

    CONSTRAINT fk_user_skills_skill
        FOREIGN KEY (skill_id)
        REFERENCES skills(id),

    CONSTRAINT uk_user_skill
        UNIQUE (user_id, skill_id),

    CONSTRAINT chk_user_skills_level
        CHECK (level BETWEEN 1 AND 5)
);

-- SKILLS INICIAIS

INSERT INTO skills (name, description, image_url)
VALUES
    (
        'React',
        'Biblioteca JavaScript para construção de interfaces.',
        NULL
    ),
    (
        'React Native',
        'Framework para desenvolvimento de aplicações mobile.',
        NULL
    ),
    (
        'Java',
        'Linguagem de programação orientada a objetos.',
        NULL
    ),
    (
        'Spring Boot',
        'Framework para desenvolvimento de aplicações Java.',
        NULL
    ),
    (
        'TypeScript',
        'Superset do JavaScript com tipagem estática.',
        NULL
    ),
    (
        'PostgreSQL',
        'Sistema gerenciador de banco de dados relacional.',
        NULL
    ),
    (
        'Git',
        'Sistema de controle de versão distribuído.',
        NULL
    ),
    (
        'Docker',
        'Plataforma para criação e execução de containers.',
        NULL
    );