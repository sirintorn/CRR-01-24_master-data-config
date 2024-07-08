import type { Knex } from "knex";
import { TABLE_NAMES } from "../db";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .alterTable(TABLE_NAMES.CanSizes, function(table){
            table.dropColumn('db_version_id');
            table.dropColumn('can_unit_id');
        });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .alterTable(TABLE_NAMES.CanSizes, function(table){
            table.integer('db_version_id');
            table.integer('can_unit_id');
        })
}

