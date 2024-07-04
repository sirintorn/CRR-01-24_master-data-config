import type { Knex } from "knex";
import { TABLE_NAMES } from "../db";

export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .alterTable(TABLE_NAMES.SubProducts, function(table){
        table.dropColumn('product_id');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .alterTable(TABLE_NAMES.SubProducts, function(table){
            table.integer('product_id').notNullable();
        });
}

