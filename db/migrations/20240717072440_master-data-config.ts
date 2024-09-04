import type { Knex } from "knex";
import { TABLE_NAMES } from "../db";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .alterTable(TABLE_NAMES.ProductShadeCodes, (table) => {
        table.string('product_group_id', 10)
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
    .alterTable(TABLE_NAMES.ProductShadeCodes, (table) => {
        table.dropColumn('product_group_id')
    });
}

