const express = require('express')

const router = express.Router();

const db = require('../data/db')


// create account
router.post('/', (req, res) => {
  const newAccount = req.body

  if (newAccount.name && newAccount.budget) {
    db.insert(newAccount)
      .then(() => { // SUCCESS
        res.status(201).json(newAccount)
      })
      .catch(err => { // saving account failed
        console.log(err)
        res.status(500).json({ error: "There was an error while saving the account to the database" })
      })
  } else { // info missing
    res.status(400).json({ errorMessage: "Please provide name and budget for the post." })
  }
})


// read all accounts
router.get('/', (req, res) => {
  db.find()
    .then(accounts => { // SUCCESS
      res.status(200).json(accounts)
    })
    .catch(err => { // can't find accounts
      console.log(err)
      res.status(500).json({ error: "The accounts could not be retrieved." })
    })
  })


// read account by id
router.get('/:id', (req, res) => {
  db.findById(req.params.id)
    .then(account => {
      if (account.length) {
        res.status(200).json(account)
      } else {
        res.status(404).json({ message: "The account with the specified ID does not exist." })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "The account could not be retrieved." })
    })})


// update account
router.put('/:id', (req, res) => {
  const updatedAccountInfo = req.body // set new account info

  if (updatedAccountInfo.name && updatedAccountInfo.budget) { // check for required info
    
    const requestedAccount = db.findById(req.params.id) // grab account

    if (requestedAccount) {
      db.update(req.params.id, req.body)
      .then(() => { // SUCCESS
        res.status(200).json(updatedAccountInfo)
      })
      .catch(err => { // if update fails
        console.log(err)
        res.status(500).json({ error: "The account information could not be modified." })
      })
    } else { // account id isn't valid
      res.status(404).json({ message: "The account with the specified ID does not exist." })
    }

  } else { // account missing info
    res.status(400).json({ errorMessage: "Please provide name and budget for the post." })
  }
})


// delete account
router.delete('/:id', (req, res) => {
  

  const accountToDelete = db.findById(req.params.postId) // grab relevant account

  if (accountToDelete) {
    db.remove(req.params.postId)
      .then(removedAccount => { // SUCCESS
        res.status(204).json(removedAccount)
      })
      .catch(err => { // if removing account fails
        res.status(500).json({ error: "The account could not be removed" })
      })
  } else { // if account isn't found
    res.status(404).json({ message: "The account with the specified ID does not exist." })
  }
})

// function checkAcctId () {
//   return (req, res, next) => {
//     db.findById(req.params.id)
//     .then(account => {
//       req.account = account
//       next()
//     })
//     .catch(err => {

//     })
//   }
// }

module.exports = router