CREATE TABLE IF NOT EXISTS books (
    isbn VARCHAR(20) primary key,
    title VARCHAR(255),
    author VARCHAR(255),
    publication_year VARCHAR(255),
    publisher VARCHAR(255),
    genre VARCHAR(255),
    availability BOOLEAN
);

CREATE INDEX idx_title ON books (title); -- we can create more indexes to oprimize the fetch query


CREATE TABLE IF NOT EXISTS users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL
);


-- INSERT INTO books (title, author, publication_year, genre, availability, isbn, publisher)
-- VALUES
  -- ('To Kill a Mockingbird', 'Harper Lee', 1960, 'Fiction', true, '9780061120084', 'HarperCollins'),
  -- ('1984', 'George Orwell', 1949, 'Dystopian', true, '9780451524935', 'Penguin Books'),
  -- ('The Great Gatsby', 'F. Scott Fitzgerald', 1925, 'Classic', true, '9780743273565', 'Scribner'),
  -- ('The Catcher in the Rye', 'J.D. Salinger', 1951, 'Coming-of-age', false, '9780316769480', 'Little, Brown and Company'),
  -- ('Harry Potter and the Philosopher''s Stone', 'J.K. Rowling', 1997, 'Fantasy', true, '9780747532743', 'Bloomsbury'),
  -- ('The Hobbit', 'J.R.R. Tolkien', 1937, 'Fantasy', true, '9780547928227', 'Houghton Mifflin'),
  -- ('The Da Vinci Code', 'Dan Brown', 2003, 'Mystery', false, '9780307474278', 'Doubleday'),
  -- ('The Lord of the Rings', 'J.R.R. Tolkien', 1954, 'Fantasy', true, '9780544003415', 'Houghton Mifflin'),
  -- ('The Alchemist', 'Paulo Coelho', 1988, 'Fiction', true, '9780061122415', 'HarperOne'),
  -- ('Pride and Prejudice', 'Jane Austen', 1813, 'Romance', true, '9780486284736', 'Dover Publications');
  -- ('The Shining', 'Stephen King', 1977, 'Horror', true, '9780385121675', 'Doubleday'),
  -- ('Brave New World', 'Aldous Huxley', 1932, 'Dystopian', true, '9780060850524', 'Harper & Brothers'),
  -- ('The Hunger Games', 'Suzanne Collins', 2008, 'Science Fiction', true, '9780439023481', 'Scholastic'),
  -- ('The Girl with the Dragon Tattoo', 'Stieg Larsson', 2005, 'Mystery', true, '9780307454546', 'Knopf'),
  -- ('The Chronicles of Narnia', 'C.S. Lewis', 1950, 'Fantasy', true, '9780066238500', 'HarperCollins'),
  -- ('One Hundred Years of Solitude', 'Gabriel García Márquez', 1967, 'Magical Realism', true, '9780061120091', 'Harper & Row'),
  -- ('The Hitchhiker''s Guide to the Galaxy', 'Douglas Adams', 1979, 'Science Fiction', true, '9780345391803', 'Pan Books'),
  -- ('The Road', 'Cormac McCarthy', 2006, 'Post-apocalyptic', true, '9780307387899', 'Knopf'),
  -- ('Jane Eyre', 'Charlotte Brontë', 1847, 'Gothic', true, '9780141441146', 'Smith, Elder & Co.'),
  -- ('Slaughterhouse-Five', 'Kurt Vonnegut', 1969, 'Satire', true, '9780385333849', 'Delacorte Press');
  