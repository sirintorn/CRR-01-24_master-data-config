import type { Knex } from "knex";
import { TABLE_NAMES } from "../db";
import { IDGenerator } from "../../src/services/id_generator";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTableIfNotExists(TABLE_NAMES.CustomProductShadeCodes, (table) => {
            table.string('id', 10).notNullable().defaultTo(IDGenerator.newUUID());

            //indicators to know its origin creator
            table.string('machine_id', 10).notNullable();

            //product shade code stuff
            table.string('db_version_id', 10).notNullable();
            table.string('product_group_id', 10).notNullable();
            table.string('product_id', 10).notNullable();
            table.string('shade_code', 20).notNullable();

            //because user might put a long name for that
            table.string('shade_name', 100).notNullable(); 

            table.string('product_base_id', 10).notNullable();
            table.string('sub_product_id', 10).notNullable();
            table.string('can_size_id', 10); //can be nullable if came from manual dispense
            table.double('custom_can_size_ml').defaultTo(0);
            table.integer('red').notNullable().defaultTo(0);
            table.integer('green').notNullable().defaultTo(0);
            table.integer('blue').notNullable().defaultTo(0);
            table.string('remark', 200);

            table.timestamps(true, true, false);
            table.string('created_by', 10);
            table.string('updated_by', 10);
            table.string('deleted_by', 10);
            table.timestamp('deleted_at');
        })
        .createTableIfNotExists(TABLE_NAMES.CustomProductTinters, (table) => {
            table.string('id', 10).notNullable().defaultTo(IDGenerator.newUUID());

            //indicators to know its origin creator
            table.string('machine_id', 10).notNullable();

            //product tinters stuff
            table.string('db_version_id', 10).notNullable();
            table.string('product_shade_code_id', 10).notNullable();
            table.string('tinter_code', 20).notNullable();
            table.double('amount').notNullable().defaultTo(0);
            table.double('sg').notNullable().defaultTo(0);
            table.integer('red').notNullable().defaultTo(0);
            table.integer('green').notNullable().defaultTo(0);
            table.integer('blue').notNullable().defaultTo(0);

            table.timestamps(true, true, false);
            table.string('created_by', 10);
            table.string('updated_by', 10);
            table.string('deleted_by', 10);
            table.timestamp('deleted_at');
        });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
    .dropTableIfExists(TABLE_NAMES.CustomProductShadeCodes)
    .dropTableIfExists(TABLE_NAMES.CustomProductTinters);
}

