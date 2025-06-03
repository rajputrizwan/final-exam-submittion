import express from "express";
import {
  getBooks,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/book.controller.js";

const router = express.Router();

// GET BOOKS
router.get("/", getBooks);

// Book CREATION
router.post("/", createBook);

// UPDATE Book
router.put("/:id", updateBook);

// DELETE BOOKS
router.delete("/:id", deleteBook);

export default router;
