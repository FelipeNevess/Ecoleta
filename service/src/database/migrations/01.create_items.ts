import { Knex } from 'knex';

exports.up = async (knex: Knex) => {
  return knex.schema.createTable('items', table => {
    table.increments('id').primary();
    table.string('image').notNullable();
    table.string('title').notNullable();
  });
};

exports.down = async (knex: Knex) => {
  return knex.schema.dropTable('items');
};
