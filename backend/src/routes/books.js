const express = require("express");
const { getBooks, getBooksCount } = require("../model/book");

const router = express.Router();

router.get("/", async (req, res, next)=> {
  try{
    console.info("query", req.query);
    const books = await getBooks(req.query);
    res.status(200).json(books)
  }catch(error){
    next(error);
  }
})

router.get("/count", async (req, res, next)=> {
  try{
    console.info("query", req.query);
    const bookCount = await getBooksCount(req.query);
    res.status(200).json(bookCount[0])
  }catch(error){
    next(error);
  }
})

module.exports = router;