-- Creating Categories Table
CREATE TABLE "Category" (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

-- Creating Users Table
CREATE TABLE "Users" (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255) NOT NULL,
  location VARCHAR(255),
  role VARCHAR(50) CHECK (role IN ('admin', 'owner', 'renter')) NOT NULL,
  status VARCHAR(50) CHECK (status IN ('active', 'disabled')) NOT NULL DEFAULT 'active',
  isApproved BOOLEAN NOT NULL DEFAULT false
);

-- Creating Books Table
CREATE TABLE "Books" (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  categoryId INTEGER REFERENCES "Category"(id) ON DELETE CASCADE,
  isApproved BOOLEAN DEFAULT false,
  ownerId INTEGER REFERENCES "Users"(id) ON DELETE CASCADE
);

-- Creating Rentals Table
CREATE TABLE "Rentals" (
  id SERIAL PRIMARY KEY,
  bookId INTEGER REFERENCES "Books"(id) ON DELETE CASCADE,
  renterId INTEGER REFERENCES "Users"(id) ON DELETE CASCADE,
  rentalDate DATE NOT NULL,
  returnDate DATE
);

-- Creating Wallets Table
CREATE TABLE "Wallets" (
  id SERIAL PRIMARY KEY,
  userId INTEGER REFERENCES "Users"(id) ON DELETE CASCADE,
  balance NUMERIC(10, 2) NOT NULL DEFAULT 0.00
);

-- Seed categories
INSERT INTO category (name) VALUES
('Science Fiction'),
('Fantasy'),
('Mystery'),
('Biography'),
('History');
