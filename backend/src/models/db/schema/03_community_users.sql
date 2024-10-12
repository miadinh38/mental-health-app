DROP TABLE IF EXISTS community_users CASCADE;

CREATE TABLE community_users (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  nickname VARCHAR(25) NOT NULL,
  agreement_signed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);