import type { Knex } from "knex";
import { TABLE_NAMES } from "../db";

//EDIT SubProduct and ProductBase to relate to Product and ProductGroup to make hierachical structure.

export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .alterTable(TABLE_NAMES.SubProducts, function(table){
        table.string('product_id', 10);
        table.string('product_group_id', 10);
    })
    .alterTable(TABLE_NAMES.ProductBases, function(table){
        table.string('product_group_id', 10);
        table.string('sub_product_id', 10);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
    .alterTable(TABLE_NAMES.SubProducts, function(table){
        table.dropColumn('product_id');
        table.dropColumn('product_group_id');
    })
    .alterTable(TABLE_NAMES.ProductBases, function(table){
        table.dropColumn('product_group_id');
        table.dropColumn('sub_product_id');
    });
}

