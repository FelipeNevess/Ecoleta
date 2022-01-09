import { Knex } from 'knex';

exports.up = async (knex: Knex) => {
  return knex.schema.createTable('point_items', table => {
    table.increments('id').unsigned().primary();
  
    table.integer('point_id')
      .notNullable()
      .references('id')
      .inTable('points');
  
    table.integer('item_id')
      .notNullable()
      .references('id')
      .inTable('items');
  });
};

exports.down = async (knex: Knex) => {
  return knex.schema.dropTable('point_items');
};
