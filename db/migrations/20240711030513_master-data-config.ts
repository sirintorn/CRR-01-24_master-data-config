import type { Knex } from "knex";
import { IDGenerator } from "../../src/services/id_generator";
import { TABLE_NAMES } from "../db";
import { CONFIGS } from "../../src/configs/configs";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .createTable(TABLE_NAMES.DBConfigs, function(table) {
            table.string('id', 10).primary({
                constraintName: `${TABLE_NAMES.DBConfigs}_primary_key`,
                deferrable: 'deferred',
            })
            .notNullable()
            .defaultTo(IDGenerator.newUUID());

            table.string('db_version_id', 10).notNullable();
            table.string('can_size_lookup_mode', 20).notNullable().defaultTo(CONFIGS.dbConfig.canSizeLookupModes.all);
            table.string('can_size_lookup_key', 20).notNullable().defaultTo(CONFIGS.dbConfig.canSizeLookupKey.product);
            table.float('discount');
            table.boolean('discount_visible').notNullable().defaultTo(CONFIGS.dbConfig.discountVisible);
            table.float('vat');
            table.boolean('vat_visible').notNullable().defaultTo(CONFIGS.dbConfig.vatVisible);
            table.integer('total_price_rounding').notNullable().defaultTo(CONFIGS.dbConfig.totalPriceRounding);
            table.boolean('total_price_visible').notNullable().defaultTo(CONFIGS.dbConfig.totalPriceVisible);
            table.float('tinter_price_markup_price');
            table.string('tinter_price_markup_price_mode', 20).notNullable().defaultTo(CONFIGS.dbConfig.tinterPriceMarkupPriceModes.default);
            table.boolean('tinter_price_visible').notNullable().defaultTo(CONFIGS.dbConfig.tinterPriceVisible);
            table.string('base_price_lookup_mode', 20).notNullable().defaultTo(CONFIGS.dbConfig.basePriceLookupModes.productBasePricing);
            table.float('base_price_markup_price');
            table.string('base_price_markup_price_mode', 20).notNullable().defaultTo(CONFIGS.dbConfig.basePriceMarkupPriceModes.default);
            table.boolean('base_price_visible').notNullable().defaultTo(CONFIGS.dbConfig.basePriceVisible);
            table.string('display_unit', 20).notNullable().defaultTo(CONFIGS.dbConfig.displayUnits.ml);
            table.float('custom_ml_oz_unit');
            table.timestamps(true, true, false);
            table.string('created_by', 10);
            table.string('updated_by', 10)
            table.string('deleted_by', 10);
            table.timestamp('deleted_at');
        });
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .dropTableIfExists(TABLE_NAMES.DBConfigs);
}

