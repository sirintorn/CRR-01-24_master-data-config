import type { Knex } from "knex";
import { TABLE_NAMES } from "../db";

export async function up(knex: Knex): Promise<void> {
    return knex.schema
    .createTable(TABLE_NAMES.DBVersions, function (table) {
        table.increments('id');
        table.integer('company_id').notNullable();
        table.string('name', 100).notNullable();
        table.string('db_version', 20).notNullable();
        table.integer('created_by');
        table.integer('updated_by');
        table.timestamps(true, true, false);
    })
    .createTable(TABLE_NAMES.CanSizes, function (table) {
        table.increments('id');
        table.integer('db_version_id').notNullable();
        table.integer('can_unit_id').notNullable();
        table.float('can_size').notNullable();
        table.string('display_name', 30).notNullable();
        table.integer('created_by');
        table.integer('updated_by');
        table.timestamps(true, true, false);
    })
    .createTable(TABLE_NAMES.CanUnits, function (table) {
        table.increments('id');
        table.integer('db_version_id').notNullable();
        table.string('name', 20).notNullable();
        table.float('as_ml').notNullable();
        table.integer('created_by');
        table.integer('updated_by');
        table.timestamps(true, true, false);
    })
    .createTable(TABLE_NAMES.ProductCanSizes, function (table) {
        table.increments('id');
        table.integer('db_version_id').notNullable();
        table.integer('can_size_id').notNullable();
        table.integer('product_id').notNullable();
        table.integer('created_by');
        table.integer('updated_by');
        table.timestamps(true, true, false);
    })
    .createTable(TABLE_NAMES.ProductGroups, function (table) {
        table.increments('id');
        table.integer('db_version_id').notNullable();
        table.string('name', 100).notNullable();
        table.integer('created_by');
        table.integer('updated_by');
        table.timestamps(true, true, false);
    })
    .createTable(TABLE_NAMES.Products, function (table) {
        table.increments('id');
        table.integer('db_version_id').notNullable();
        table.integer('product_group_id').notNullable();
        table.string('name', 100).notNullable();
        table.integer('created_by');
        table.integer('updated_by');
        table.timestamps(true, true, false);
    })
    .createTable(TABLE_NAMES.ProductBases, function (table) {
        table.increments('id');
        table.integer('db_version_id').notNullable();
        table.integer('product_id').notNullable();
        table.string('name', 100).notNullable();
        table.integer('created_by');
        table.integer('updated_by');
        table.timestamps(true, true, false);
    })
    .createTable(TABLE_NAMES.SubProducts, function (table) {
        table.increments('id');
        table.integer('db_version_id').notNullable();
        table.integer('product_id').notNullable();
        table.string('name', 100).notNullable();
        table.integer('created_by');
        table.integer('updated_by');
        table.timestamps(true, true, false);
    })
    .createTable(TABLE_NAMES.ProductShadeCodes, function (table) {
        table.increments('id');
        table.integer('db_version_id').notNullable();
        table.integer('product_id').notNullable();
        table.string('shade_code', 20).notNullable();
        table.string('shade_name', 100).notNullable();
        table.integer('product_base_id').notNullable();
        table.integer('sub_product_id').notNullable();
        table.integer('can_size_id').notNullable();
        table.tinyint('red').notNullable();
        table.tinyint('green').notNullable();
        table.tinyint('blue').notNullable();
        table.string('remark', 200).notNullable();
        table.integer('created_by');
        table.integer('updated_by');
        table.timestamps(true, true, false);
    })
    .createTable(TABLE_NAMES.ProductTinters, function (table) {
        table.increments('id');
        table.integer('db_version_id').notNullable();
        table.integer('product_shade_code_id').notNullable();
        table.string('tinter_code', 20).notNullable();
        table.float('amount').notNullable();
        table.float('sg');
        table.tinyint('red').notNullable();
        table.tinyint('green').notNullable();
        table.tinyint('blue').notNullable();
        table.integer('created_by');
        table.integer('updated_by');
        table.timestamps(true, true, false);
    })
    .createTable(TABLE_NAMES.ProductBasePricings, function (table) {
        table.increments('id');
        table.integer('db_version_id').notNullable();
        table.integer('product_base_id').notNullable();
        table.integer('can_size_id').notNullable();
        table.double('unit_price').notNullable();
        table.double('mark_up_price_01');
        table.double('mark_up_price_02');
        table.double('mark_up_price_03');
        table.double('default_mark_up_price').notNullable();
        table.integer('created_by');
        table.integer('updated_by');
        table.timestamps(true, true, false);
    })
    .createTable(TABLE_NAMES.GeneralPricings, function (table) {
        table.increments('id');
        table.integer('db_version_id').notNullable();
        table.integer('can_size_id').notNullable();
        table.double('price').notNullable();
        table.double('mark_up_price_01');
        table.double('mark_up_price_02');
        table.double('mark_up_price_03');
        table.double('default_mark_up_price').notNullable();
        table.integer('created_by');
        table.integer('updated_by');
        table.timestamps(true, true, false);
    })
    .createTable(TABLE_NAMES.TinterPricings, function (table) {
        table.increments('id');
        table.integer('db_version_id').notNullable();
        table.string('tinter_code', 20).notNullable();
        table.string('tinter_name', 30).notNullable();
        table.float('sg');
        table.tinyint('red').notNullable();
        table.tinyint('green').notNullable();
        table.tinyint('blue').notNullable();
        table.double('price').notNullable();
        table.double('mark_up_price_01');
        table.double('mark_up_price_02');
        table.double('mark_up_price_03');
        table.double('default_mark_up_price').notNullable();
        table.integer('created_by');
        table.integer('updated_by');
        table.timestamps(true, true, false);
    })
    .raw( //SET AUTO UPDATE TIMESTAMP
        `
        CREATE OR REPLACE FUNCTION update_timestamp() RETURNS TRIGGER
        LANGUAGE plpgsql
        AS
        $$
        BEGIN
            NEW.updated_at = CURRENT_TIMESTAMP;
            RETURN NEW;
        END;
        $$;
        `
    )
    .raw( //TRIGGER ON ALL TABLES
        `
        DO $$
        DECLARE
            t text;
        BEGIN
            FOR t IN
                SELECT table_name FROM information_schema.columns WHERE column_name = 'updated_at'
            LOOP
                EXECUTE format('CREATE TRIGGER trigger_update_timestamp
                            BEFORE UPDATE ON %I
                            FOR EACH ROW EXECUTE PROCEDURE update_timestamp()', t,t);
            END loop;
        END;
        $$ language 'plpgsql';
        `
    );
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTableIfExists(TABLE_NAMES.DBVersions)
        .dropTableIfExists(TABLE_NAMES.CanSizes)
        .dropTableIfExists(TABLE_NAMES.CanUnits)
        .dropTableIfExists(TABLE_NAMES.ProductCanSizes)
        .dropTableIfExists(TABLE_NAMES.ProductGroups)
        .dropTableIfExists(TABLE_NAMES.Products)
        .dropTableIfExists(TABLE_NAMES.ProductBases)
        .dropTableIfExists(TABLE_NAMES.SubProducts)
        .dropTableIfExists(TABLE_NAMES.ProductShadeCodes)
        .dropTableIfExists(TABLE_NAMES.ProductTinters)
        .dropTableIfExists(TABLE_NAMES.GeneralPricings)
        .dropTableIfExists(TABLE_NAMES.ProductBasePricings)
        .dropTableIfExists(TABLE_NAMES.TinterPricings)
        .raw( //remove auto update timestamp
            `
            DROP FUNCTION IF EXISTS update_timestamp() CASCADE;
            `
        );
}

