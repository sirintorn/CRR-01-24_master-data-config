import type { Knex } from "knex";
import { TABLE_NAMES } from "../db";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .alterTable(TABLE_NAMES.Machine, table => {
        table.string('tinting_profile_id', 10);
        table.string('db_version_id', 10);
        table.boolean('visible').defaultTo(true);
        table.renameColumn('bluetooh_mac_address', 'bluetooth_mac_address');
    });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
    .alterTable(TABLE_NAMES.Machine, table => {
        table.dropColumn('tinting_profile_id');
        table.dropColumn('db_version_id');
        table.dropColumn('visible');
        table.renameColumn('bluetooth_mac_address', 'bluetooh_mac_address');
    });
}

