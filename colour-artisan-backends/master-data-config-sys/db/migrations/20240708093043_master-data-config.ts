import type { Knex } from "knex";
import { TABLE_NAMES } from "../db";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .alterTable(TABLE_NAMES.CanSizes, function(table){
            table.string('created_by', 10);
            table.string('updated_by', 10);
        });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .alterTable(TABLE_NAMES.CanSizes, function(table){
            table.dropColumn('created_by');
            table.dropColumn('updated_by');
        });
}

