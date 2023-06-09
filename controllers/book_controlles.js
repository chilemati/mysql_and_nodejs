const { currentUser } = require("../middlewares/allowLogin");
const {
  createBook,
  allBooks,
  findById,
  deleteOne,
  findBaseOn,
} = require("../models/bookModel");

exports.book_create = async (req, res, next) => {
  let { title, subject, release_date, author } = req.body;
  let toDb = {
    title,
    subject,
    release_date: new Date().toDateString(),
    author,
  };
  createBook(toDb)
    .then((rep) => {
      res.json({ status: "created", reply: rep });
    })
    .catch((err) => {
      res.json({ status: "failed", reply: err });
    });
};

exports.book_get_all = (req, res, next) => {
  allBooks()
    .then((rep) => {
      res.render("Books", {
        books: rep,
        user: currentUser.user,
      });
    })
    .catch((err) => {
      res.json(err.message);
    });
};
exports.book_post_single = async (req, res, next) => {
  let { id } = req.body;
  findById(id)
    .then((rep) => {
      res.json(rep);
    })
    .catch((err) => {
      res.json(err.message);
    });
};
exports.book_delete_single = async (req, res, next) => {
  let { id } = req.body;
  deleteOne(id)
    .then((rep) => {
      res.json(rep);
    })
    .catch((err) => {
      res.json(err.message);
    });
};
exports.book_post_findMany = async (req, res, next) => {
  let obj = req.body;
  // res.json(obj);
  findBaseOn(obj)
    .then((rep) => {
      res.json(rep);
    })
    .catch((err) => {
      res.json(err.message);
    });
};
