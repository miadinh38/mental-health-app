DROP TABLE IF EXISTS community_users CASCADE;

CREATE TABLE community_users (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER UNIQUE REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  nickname VARCHAR(25) NOT NULL UNIQUE,
  agreement_signed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);