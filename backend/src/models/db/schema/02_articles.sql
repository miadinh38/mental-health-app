DROP TABLE IF EXISTS articles CASCADE;

CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    source_name VARCHAR(255),
    author VARCHAR(255),
    title TEXT,
    description TEXT,
    url TEXT UNIQUE,
    url_to_image TEXT,
    published_at TIMESTAMP,
    content TEXT
);