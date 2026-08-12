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
        https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2P6O9BjxsipxU33iW0pvgaWWRhNjkd4LGSB3vHnGkwQ&s=10
    ),
    (
        'React Native',
        'Framework para desenvolvimento de aplicações mobile.',
        https://thumbs.dreamstime.com/b/react-native-blue-vector-d-sign-isolated-white-background-react-native-blue-vector-d-sign-isolated-white-background-210422190.jpg
    ),
    (
        'Java',
        'Linguagem de programação orientada a objetos.',
        https://cdn-icons-png.flaticon.com/512/3664/3664909.png
    ),
    (
        'Spring Boot',
        'Framework para desenvolvimento de aplicações Java.',
        https://img-c.udemycdn.com/course/480x270/2919556_498a.jpg
    ),
    (
        'TypeScript',
        'Superset do JavaScript com tipagem estática.',
        https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/960px-Typescript_logo_2020.svg.png
    ),
    (
        'PostgreSQL',
        'Sistema gerenciador de banco de dados relacional.',
        https://images.seeklogo.com/logo-png/32/1/postgresql-logo-png_seeklogo-320016.png
    ),
    (
        'Git',
        'Sistema de controle de versão distribuído.',
        https://static.vecteezy.com/system/resources/previews/016/833/872/non_2x/github-logo-git-hub-icon-on-white-background-free-vector.jpg
    ),
    (
        'Docker',
        'Plataforma para criação e execução de containers.',
        https://stickersdevs.com.br/wp-content/uploads/2022/01/docker-adesivo-sticker.png
    );