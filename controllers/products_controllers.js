const { currentUser } = require("../middlewares/allowLogin");
const {
  createProduct,
  allProducts,
  findProductById,
  deleteOneProduct,
  findProductBasedOn,
  updateProduct,
  updateLikes,
} = require("../models/productModel");

exports.product_create = async (req, res, next) => {
  let { prodName, prodPrice, prodDetails, prodSnippet } = req.body;
  let toDb = {
    prodName,
    prodPrice,
    prodDetails,
    prodSnippet,
  };
  createProduct(toDb)
    .then((rep) => {
      res.json({ status: "created", reply: rep });
    })
    .catch((err) => {
      res.json({ status: "failed", reply: err });
    });
};

exports.product_get_all = (req, res, next) => {
  allProducts()
    .then((rep) => {
      res.render("Products", {
        products: rep,
        user: currentUser.user,
        role: currentUser.role,
      });
    })
    .catch((err) => {
      res.json(err.message);
    });
};
exports.product_get_create = (req, res, next) => {
  res.render("createProduct", { user: "" });
};
exports.product_get_likes = (req, res, next) => {
  updateLikes({ id: req.params.id })
    .then((rep) => {
      allProducts()
        .then((rep) => {
          res.render("Products", { products: rep, user: currentUser.user });
        })
        .catch((err) => {
          res.json(err.message);
        });
    })
    .catch((err) => {
      res.json({ err: false });
    });
};
exports.product_post_single = async (req, res, next) => {
  let { id } = req.body;
  findProductById(id)
    .then((rep) => {
      res.json(rep);
    })
    .catch((err) => {
      res.json(err.message);
    });
};
exports.product_delete_single = async (req, res, next) => {
  let { id } = req.body;
  deleteOneProduct(id)
    .then((rep) => {
      res.json(rep);
    })
    .catch((err) => {
      res.json(err.message);
    });
};
exports.product_post_findMany = async (req, res, next) => {
  let obj = req.body;
  // res.json(obj);
  findProductBasedOn(obj)
    .then((rep) => {
      res.json(rep);
    })
    .catch((err) => {
      res.json(err.message);
    });
};
exports.product_post_update = async (req, res, next) => {
  let obj = req.body;
  // res.json(obj);
  updateProduct(obj)
    .then((rep) => {
      res.json(rep);
    })
    .catch((err) => {
      res.json(err.message);
    });
};
