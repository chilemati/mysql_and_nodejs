const express = require("express");
const {
  book_create,
  book_get_all,
  book_post_single,
  book_delete_single,
  book_post_findMany,
} = require("../controllers/book_controlles");
const {
  product_create,
  product_get_all,
  product_post_single,
  product_delete_single,
  product_post_findMany,
  product_post_update,
} = require("../controllers/products_controllers");
const {
  user_create,
  user_get_all,
  user_post_login,
  user_get_logout,
  user_post_single,
  user_delete_single,
  user_post_findMany,
  user_post_update,
  user_get_login,
  home,
} = require("../controllers/user_controllers");
const { allowLogin } = require("../middlewares/allowLogin");
const { onlyAdmins } = require("../middlewares/onlyAdmins");
const {
  onlyAdmins_and_subAdmins,
} = require("../middlewares/onlyAdmin_and_subAdmins");
const routes = express.Router();

// module.exports = bookRoutes;
routes.get("/", home);
routes.post("/create", onlyAdmins_and_subAdmins, book_create);
routes.get("/books", book_get_all);
routes.post("/single", book_post_single);
routes.delete("/delete", onlyAdmins, book_delete_single);
routes.post("/findMany", book_post_findMany);

// module.exports = productRoutes;
routes.post("/createProduct", product_create);
routes.get("/allProducts", allowLogin, product_get_all);
routes.post("/singleProducts", product_post_single);
routes.delete("/deleteProduct", product_delete_single);
routes.post("/findManyProduct", product_post_findMany);
routes.post("/updateProduct", product_post_update);

// module.exports = userRoutes;
routes.post("/createuser", user_create);
routes.get("/allusers", allowLogin, onlyAdmins, user_get_all);
routes.post("/loginPost", user_post_login);
routes.get("/loginGet", user_get_login);
routes.get("/logout", user_get_logout);
routes.post("/singleusers", onlyAdmins_and_subAdmins, user_post_single);
routes.delete("/deleteuser", user_delete_single);
routes.post("/findManyuser", user_post_findMany);
routes.post("/updateuser", onlyAdmins, user_post_update);

module.exports = routes;
