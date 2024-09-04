import type { Knex } from "knex";
import { TABLE_NAMES } from "../db";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .alterTable(TABLE_NAMES.DBConfigs, (table) => {
        table.double('general_price_markup_price').defaultTo(0);
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
    .alterTable(TABLE_NAMES.DBConfigs, (table) => {
        table.dropColumn('general_price_markup_price');
    });
}

