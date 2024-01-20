const express = require("express");
const { getBooks, getBooksCount } = require("../model/book");

const router = express.Router();

router.get("/", async (req, res, next)=> {
  try{
    console.log(req.query);
    const books = await getBooks(req.query);
    console.log(books);
    res.status(200).json(books)
  }catch(error){
    next(error);
  }
})

router.get("/count", async (req, res, next)=> {
  try{
    console.log(req.query);
    const bookCount = await getBooksCount(req.query);
    console.log(bookCount);
    res.status(200).json(bookCount[0])
  }catch(error){
    next(error);
  }
})

module.exports = router;