const express = require('express');
const router = express.Router();
const controller = require("../controller/accounts-controller.js")

router.get("/", controller.getAllAccounts)
router.get("/:id", controller.getOneAccount)
router.post("/", controller.createAccount)
router.put("/:id", controller.updateAccount)
router.delete("/:id", controller.deleteAccount)
router.get("/:id/transactions", controller.getAllTransactions)
router.get("/:id/transactions/:tid", controller.getOneTransaction)
router.post("/:id/transactions", controller.createTransacton)
router.put("/:id/transactions/:tid", controller.updateTransaction)
router.delete("/:id/transactions/:tid", controller.deleteTransaction)

module.exports = router;
