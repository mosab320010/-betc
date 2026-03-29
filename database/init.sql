CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  display_name TEXT NOT NULL,
  role TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  instructor_id UUID NOT NULL,
  status TEXT NOT NULL
);
