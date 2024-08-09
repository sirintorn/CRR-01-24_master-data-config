import type { Knex } from "knex";
import { TABLE_NAMES } from "../db";
import { IDGenerator } from "../../src/services/id_generator";

export async function up(knex: Knex): Promise<void> {
    //CREATE TABLES RELATED TO CALIBRATION SYSTEM
    return knex.schema
        .createTableIfNotExists(TABLE_NAMES.TintingProfile, (table) => {
            table.string('id', 10).notNullable().defaultTo(IDGenerator.newUUID());

            table.string('company_id', 10).notNullable();
            table.string('machine_serial_no', 20).notNullable(); //20 byte ascii
            table.string('bluetooh_mac_address', 17).notNullable();

            table.timestamps(true, true, false);
            table.string('created_by', 10);
            table.string('updated_by', 10);
            table.string('deleted_by', 10);
            table.timestamp('deleted_at');
        })
        .createTableIfNotExists(TABLE_NAMES.AccuracyTestTarget, (table) => {
            table.string('id', 10).notNullable().defaultTo(IDGenerator.newUUID());
            table.string('tinting_profile_id', 10).notNullable();

            table.double('target_ml').defaultTo(0);
            table.integer('repeat').defaultTo(0);

            table.timestamps(true, true, false);
            table.string('created_by', 10);
            table.string('updated_by', 10);
            table.string('deleted_by', 10);
            table.timestamp('deleted_at');
        })
        .createTableIfNotExists(TABLE_NAMES.CalibrationInfo, (table) => {
            table.string('id', 10).notNullable().defaultTo(IDGenerator.newUUID());
            table.string('tinting_profile_id', 10).notNullable();

            table.integer('index').notNullable().defaultTo(0);
            table.string('tinter_code', 20).notNullable();
            table.string('tinter_name', 30).notNullable();
            table.double('target_ml').defaultTo(0);
            table.float('target_err_rate').defaultTo(0);
            table.integer('repeat').defaultTo(0);
            table.integer('result_step').defaultTo(0);
            table.double('result_ml').defaultTo(0);
            table.double('result_g').defaultTo(0);
            table.float('result_err_rate').defaultTo(0);
            table.string('status', 10).defaultTo(0);
            table.double('created').defaultTo(0);
            table.double('modified').defaultTo(0);

            table.timestamps(true, true, false);
            table.string('created_by', 10);
            table.string('updated_by', 10);
            table.string('deleted_by', 10);
            table.timestamp('deleted_at');
        })
        .createTableIfNotExists(TABLE_NAMES.CircuitInfo, (table) => {
            table.string('id', 10).notNullable().defaultTo(IDGenerator.newUUID());
            table.string('tinting_profile_id', 10).notNullable();

            table.boolean('enabled').defaultTo(false);
            table.integer('index').defaultTo(0);
            table.string('tinter_code', 20).notNullable();
            table.string('tinter_name', 30).notNullable();
            table.integer('r').defaultTo(0);
            table.integer('g').defaultTo(0);
            table.integer('b').defaultTo(0);
            table.double('sg').defaultTo(0);
            table.double('max_level').defaultTo(0);
            table.double('refill_level').defaultTo(0);
            table.double('cutoff_level').defaultTo(0);
            table.double('current_level').defaultTo(0);

            table.timestamps(true, true, false);
            table.string('created_by', 10);
            table.string('updated_by', 10);
            table.string('deleted_by', 10);
            table.timestamp('deleted_at');
        })
        .createTableIfNotExists(TABLE_NAMES.StepCalibrationTarget, (table) => {
            table.string('id', 10).notNullable().defaultTo(IDGenerator.newUUID());
            table.string('tinting_profile_id', 10).notNullable();

            table.integer('target_step').defaultTo(0);
            table.float('target_err_rate').defaultTo(0);
            table.integer('repeat').defaultTo(0);

            table.timestamps(true, true, false);
            table.string('created_by', 10);
            table.string('updated_by', 10);
            table.string('deleted_by', 10);
            table.timestamp('deleted_at');
        })
        .createTableIfNotExists(TABLE_NAMES.VolumeCalibrationTarget, (table) => {
            table.string('id', 10).notNullable().defaultTo(IDGenerator.newUUID());
            table.string('tinting_profile_id', 10).notNullable();

            table.double('target_ml').defaultTo(0);
            table.float('target_err_rate').defaultTo(0);
            table.integer('repeat').defaultTo(0);

            table.timestamps(true, true, false);
            table.string('created_by', 10);
            table.string('updated_by', 10);
            table.string('deleted_by', 10);
            table.timestamp('deleted_at');
        });
}


export async function down(knex: Knex): Promise<void> {
    //DROP TABLES RELATED TO CALIBRATION SYSTEM
    return knex.schema
        .dropTableIfExists(TABLE_NAMES.TintingProfile)
        .dropTableIfExists(TABLE_NAMES.AccuracyTestTarget)
        .dropTableIfExists(TABLE_NAMES.CalibrationInfo)
        .dropTableIfExists(TABLE_NAMES.CircuitInfo)
        .dropTableIfExists(TABLE_NAMES.StepCalibrationTarget)
        .dropTableIfExists(TABLE_NAMES.VolumeCalibrationTarget);
}

