"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class FavoriteSchema extends Schema {
  up() {
    this.create("favorites", table => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onDelete()
      table
        .integer("post_id")
        .unsigned()
        .references("id")
        .inTable("posts")
        .onDelete()
      table.timestamps();
    });
  }

  down() {
    this.drop("favorites");
  }
}

module.exports = FavoriteSchema;
