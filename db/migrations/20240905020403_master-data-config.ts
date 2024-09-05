import type { Knex } from "knex";
import { TABLE_NAMES } from "../db";
import { table } from "console";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .alterTable(TABLE_NAMES.Machine, table => {
        table.string('bluetooth_no', 3).defaultTo('000');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
    .alterTable(TABLE_NAMES.Machine, table => {
        table.dropColumn('bluetooth_no');
    });
}

