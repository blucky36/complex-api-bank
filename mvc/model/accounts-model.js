const path = require('path')
const JSONMecha = require('mecha-js').JSONMecha
const uuid = require('uuid/v4')
const accounts = new JSONMecha(path.join(__dirname, '../db/accounts.json'))

const getAllA =()=>{
  return accounts.get()
}
const getOneA =(id)=>{
  return !id ? {error:"That Account ID doesn't Exist"} : accounts.find({prop:['id',id]})
}
const createA =(body)=>{
  const {name,bankName,description} = body
  if(!name||!bankName||!description){
    return {error:"Field Required"}
  }else{
    let account = {id:uuid(),name,bankName,description,transactions:[]}
    return accounts.create(account)
  }
}
const updateA =(id,body)=>{
  const {name,bankName,description} = body
  if(!id){
    return {error:"account doesn't exist"}
  }else{
    if(!name||!bankName||!description){
      return {error:"Field Required"}
    }else{
      let transactions = accounts.find({prop:["id",id]}).transactions
      let account = {id,name,bankName,description,transactions}
      return accounts.update({prop:["id",id]},account)
    }
  }
}
const deleteA =(id)=>{
  return accounts.destroy({prop:["id",id]})
}
const getAllT =(idA)=>{
  return accounts.find({prop:["id",idA]}).transactions
}
const getOneT =(idA,idT)=>{
  return !idA || !idT ? {error:"invalid id"} : accounts.find({prop:["id",idA]}).transactions.find(e=>e.id==idT)
}
const createT =(id,body)=>{
  const {title,amount,pending} = body, {name, bankName, description} = accounts.find({prop:["id",id]})
  if(!title||!amount||!pending){
    return {error:"Fields Required"}
  }else if(title.length>8){
    return {error:"max length exceeded"}
  }else{
    let transactions = accounts.find({prop:["id",id]}).transactions, newTransaction = {id:uuid(),title,amount,pending}
    transactions.push(newTransaction)
    let updatedAccount = {id,name,bankName,description,transactions}
    accounts.update({prop:["id",id]},updatedAccount)
    return transactions
  }
}

const updateT =(id,idT,body)=>{
  let {title,amount,pending} = body, {name, bankName, description} = accounts.find({prop:["id",id]}), transactions = accounts.find({prop:["id",id]}).transactions, newTransaction = {id:idT,title,amount,pending}, found = transactions.find(e=>e.id === idT), i = transactions.indexOf(found)
  if(!title||!amount||!pending){
    return {error:"Fields Required"}
  }else if(title.length>8){
    return {error:"max length exceeded"}
  }else if(!found){
    return {error:"cannot find"}
  }
  else{
    transactions.splice(i,1,newTransaction)
    let updatedAccount = {id,name,bankName,description,transactions}
    accounts.update({prop:["id",id]},updatedAccount)
    return transactions
  }
}
const deleteT =(id,idT)=>{
  let {name, bankName, description} = accounts.find({prop:["id",id]}), transactions = accounts.find({prop:["id",id]}).transactions, found = transactions.find(e=>e.id === idT), i = transactions.indexOf(found)
  if(!found){
    return {error:"cannot find"}
  }
  else{
    transactions.splice(i,1)
    let updatedAccount = {id,name,bankName,description,transactions}
    accounts.update({prop:["id",id]},updatedAccount)
    return transactions
  }
}
module.exports = { getAllA, getOneA, createA, updateA, deleteA, getAllT, getOneT, createT, updateT, deleteT }
