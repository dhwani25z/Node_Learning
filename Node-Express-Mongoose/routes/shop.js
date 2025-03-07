const express = require("express");
const router = express.Router();
const path = require("path");

const shopController = require("../controllers/shop");

router.get("/", shopController.getIndex);
router.get("/products", shopController.getProducts);
router.get("/products/:productId", shopController.getProduct );//for single product
router.get("/cart", shopController.getCart); // for more than one product
router.post("/cart", shopController.postCart);
router.post("/cart-delete-item", shopController.postCartDeleteProducts);
router.post("/create-order", shopController.postOrder);
router.get("/orders", shopController.getOrders);

module.exports = router;
