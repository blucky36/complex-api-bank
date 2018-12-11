const model = require("../model/accounts-model.js")

const getAllAccounts = (req,res,next) => {
  let all = model.getAllA()
  res.status(200).json({data:all})
}
const getOneAccount = (req,res,next) => {
  let one = model.getOneA(req.params.id)
  return one.error ? next({status:404,message:"Account ID doesn't exist",errors:one.error}) : res.status(200).json({data:one})
}
const createAccount = (req,res,next) => {
  let post = model.createA(req.body)
  return post.error ? next({status:400,message:"Failed to create new account",errors:post.error}) : res.status(201).json({data:post})
}
const updateAccount = (req,res,next) => {
  let put = model.updateA(req.params.id,req.body)
  return put.error ? next({status:400,message:"Failed to update account",errors:put.error}) : res.status(200).json({data:put})
}
const deleteAccount = (req,res,next) => {
  let del = model.deleteA(req.params.id)
  return del.error ? next({status:404,message:"Failed to delete account",errors:del.error}) : res.status(204).json({data:del})
}
const getAllTransactions = (req,res,next) => {
  let allT = model.getAllT(req.params.id)
  return res.status(200).json({data:allT})
}
const getOneTransaction = (req,res,next) => {
  let oneT = model.getOneT(req.params.id,req.params.tid)
  return oneT.error?next({status:404,message:"invalid",errors:oneT.error}):res.status(200).json({data:oneT})
}
const createTransacton = (req,res,next) => {
  let createT = model.createT(req.params.id,req.body)
  return createT.error?next({status:400,message:"Failed to create Transaction",errors:createT.error}):res.status(201).json({data:createT})
}
const updateTransaction = (req,res,next) => {
  let putT = model.updateT(req.params.id,req.params.tid,req.body)
  return putT.error?next({status:400,message:"Failed to update transaction",errors:putT.error}):res.status(200).json({data:putT})
}
const deleteTransaction = (req,res,next) => {
  let delT = model.deleteT(req.params.id,req.params.tid)
  return delT.error?next({status:404,message:"Failed to delete transaction",errors:delT.error}):res.status(204).json({data:delT})
}

module.exports = { getAllAccounts, getOneAccount, createAccount, updateAccount, deleteAccount, getAllTransactions, getOneTransaction, createTransacton, updateTransaction, deleteTransaction }
