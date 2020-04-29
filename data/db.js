const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
};

function find() {
  return db('accounts');
}

function findById(id) {
  return db('accounts').where({ id: Number(id) });
}

function insert(account) {
  return db('accounts')
    .insert(account, 'id')
    .then(ids => ({ id: ids[0] }));
}

function update(id, account) {
  return db('accounts')
    .where('id', Number(id))
    .update(account);
}

function remove(id) {
  return db('accounts')
    .where('id', Number(id))
    .del();
}