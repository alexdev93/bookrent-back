const { Book, Category, User } = require("../models");
const { ForbiddenError } = require("@casl/ability");
const _ = require("lodash");

const getAllBooks = async (req, res) => {
  try {
    const books =
      req.user.role === "admin"
        ? await Book.findAll({ include: [Category, User] }) 
        : await Book.findAll({
            where: { ownerId: req.user.id },
            include: [Category, User],
          });
    const mappedBooks = books.map((book) => ({
      ..._.pick(book, [
        "id",
        "title",
        "author",
        "isApproved",
        "status",
        "price",
        "createdAt",
        "updatedAt",
      ]),
      category: {
        ..._.pick(book.Category, ["id", "name"]),
      },
      owner: {
        ..._.pick(book.User, ["id", "username", "email", "location"]),
      },
    }));

    res.json(books);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const createBook = async (req, res) => {
  try {
    ForbiddenError.from(req.ability).throwUnlessCan("create", "Book");

    const category = await Category.findOne({
      where: { name: req.body.category },
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const newBook = await Book.create({
      ...req.body,
      ownerId: req.user.id,
      categoryId: category.id,
    });

    res.status(201).json(newBook);
  } catch (error) {
    if (error instanceof ForbiddenError) {
      res
        .status(403)
        .json({ message: "You do not have permission to create a book." });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
};

const approveBook = async (req, res) => {
  try {
    ForbiddenError.from(req.ability).throwUnlessCan("update", "Book");

    const book = await Book.findByPk(req.params.bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    book.approved = true;
    await book.save();
    res.json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const disableBook = async (req, res) => {
  try {
    ForbiddenError.from(req.ability).throwUnlessCan("update", "Book");

    const book = await Book.findByPk(req.params.bookId);
    if (!book) return res.status(404).json({ message: "Book not found" });

    book.available = false;
    await book.save();
    res.json(book);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getFilteredBooks = async (req, res) => {
  try {
    const { categoryId, author, ownerId } = req.query;

    const filterCriteria = {};

    if (categoryId) {
      filterCriteria.categoryId = categoryId;
    }
    if (author) {
      filterCriteria.author = {
        [Op.iLike]: `%${author}%`,
      };
    }
    if (ownerId) {
      filterCriteria.ownerId = ownerId;
    }

    const books = await Book.findAll({
      where: filterCriteria,
      include: [
        { model: Category, attributes: ["name"] },
        { model: User, attributes: ["username"] },
      ],
    });

    res.json(books);
  } catch (error) {
    console.error("Error fetching filtered books:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getAllBooks,
  createBook,
  approveBook,
  disableBook,
  getFilteredBooks,
};
