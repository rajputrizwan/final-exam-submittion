import Book from "../models/book.model.js";
import mongoose from "mongoose";

export const getBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json({ success: true, data: books });
  } catch (error) {
    console.log("Error in fetching books:", error.message);
    res.status(404).json({ success: false, message: "Server Error" });
  }
};

export const createBook = async (req, res) => {
  const book = req.body;

  if (!book.name || !book.author) {
    return res
      .status(400)
      .json({ success: false, message: "Please provide all fields" });
  }

  const newBook = new Book(book);

  try {
    await newBook.save();
    res.status(201).json({ success: true, data: newBook });
  } catch (error) {
    console.log("Error in Create book:", error.message);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateBook = async (req, res) => {
  const { id } = req.params;
  const book = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Book ID" });
  }
  try {
    const updateBook = await Book.findByIdAndUpdate(id, book, {
      new: true,
    });
    if (!updateBook) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }
    res.status(200).json({ success: true, data: updateBook });
  } catch (error) {
    res.status(404).json({ success: false, message: "Server Error" });
  }
};

export const deleteBook = async (req, res) => {
  const { id } = req.params;
  console.log("id:", id);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ success: false, message: "Invalid Book ID" });
  }

  try {
    const deletedBook = await Book.findByIdAndDelete(id);
    if (!deletedBook) {
      return res
        .status(404)
        .json({ success: false, message: "Book not found" });
    }
    res.status(200).json({ success: true, message: "Book deleted" });
  } catch (error) {
    console.log("error in deleting Book:", error.message);
    res.status(500).json({ success: false, message: "Book not deleted" });
  }
};
