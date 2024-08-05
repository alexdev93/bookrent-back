Database Schema
Users Table

id: Primary key
username: String
email: String
password: String (hashed)
role: Enum (admin, owner, renter)
status: Enum (active, disabled)
Books Table

id: Primary key
title: String
author: String
category: Foreign key to Categories
ownerId: Foreign key to Users (the owner of the book)
status: Enum (pending, approved, rented, unavailable)
rentPrice: Decimal
Categories Table

id: Primary key
name: String
Rentals Table

id: Primary key
bookId: Foreign key to Books
renterId: Foreign key to Users
rentDate: Date
returnDate: Date
Wallets Table

id: Primary key
ownerId: Foreign key to Users
balance: Decimal