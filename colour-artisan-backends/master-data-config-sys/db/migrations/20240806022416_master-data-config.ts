import type { Knex } from "knex";
import { TABLE_NAMES } from "../db";
import { IDGenerator } from "../../src/services/id_generator";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTableIfNotExists(TABLE_NAMES.DispenseHistory, (table) => {
            table.string('id', 10).notNullable().defaultTo(IDGenerator.newUUID());
            table.string('company_id', 10).notNullable();
            table.string('machine_id', 10).notNullable();
            table.string('source', 50);
            table.string('status', 20);
            table.string('db_version', 100);
            table.string('shade_code', 20);

            table.timestamps(true, true, false);
            table.string('created_by', 10);
            table.string('updated_by', 10)
            table.string('deleted_by', 10);
            table.timestamp('deleted_at');
        }).createTableIfNotExists(TABLE_NAMES.DispenseHistoryTinters, (table) => {
            table.string('id', 10).notNullable().defaultTo(IDGenerator.newUUID());
            table.string('company_id', 10).notNullable();
            table.string('machine_id', 10).notNullable();
            table.string('dispense_history_id', 10).notNullable();
            table.string('tinter_code', 20);
            table.float('amount');

            table.timestamps(true, true, false);
            table.string('created_by', 10);
            table.string('updated_by', 10)
            table.string('deleted_by', 10);
            table.timestamp('deleted_at');
        });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTableIfExists(TABLE_NAMES.DispenseHistory)
        .dropTableIfExists(TABLE_NAMES.DispenseHistoryTinters);
}

