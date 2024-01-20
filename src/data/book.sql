CREATE TABLE IF NOT EXISTS books (
    isbn VARCHAR(20) primary key,
    title VARCHAR(255),
    author VARCHAR(255),
    publication_year VARCHAR(255),
    publisher VARCHAR(255),
    genre VARCHAR(255),
    availability BOOLEAN
);

CREATE INDEX idx_title ON books (title);


CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);