import type { Knex } from "knex";
import { TABLE_NAMES } from "../db";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .alterTable(TABLE_NAMES.CanSizes, function(table){
            table.string('db_version_id', 10);
            table.string('can_unit_id', 10);
        })
        .alterTable(TABLE_NAMES.CanUnits, function(table){
            table.string('db_version_id', 10);
        })
        .alterTable(TABLE_NAMES.DBVersions, function(table){
            table.string('company_id', 10);
        })
        .alterTable(TABLE_NAMES.GeneralPricings, function(table){
            table.string('db_version_id', 10);
            table.string('can_size_id', 10);
        })
        .alterTable(TABLE_NAMES.ProductBasePricings, function(table){
            table.string('db_version_id', 10);
            table.string('product_base_id', 10);
            table.string('can_size_id', 10);
        })
        .alterTable(TABLE_NAMES.ProductBases, function(table){
            table.string('db_version_id', 10);
            table.string('product_id', 10);
        })
        .alterTable(TABLE_NAMES.ProductCanSizes, function(table){
            table.string('db_version_id', 10);
            table.string('can_size_id', 10);
            table.string('product_id', 10);
        })
        .alterTable(TABLE_NAMES.ProductGroups, function(table){
            table.string('db_version_id', 10);
        })
        .alterTable(TABLE_NAMES.ProductShadeCodes, function(table){
            table.string('db_version_id', 10);
            table.string('product_id', 10);
            table.string('product_base_id', 10);
            table.string('sub_product_id', 10);
            table.string('can_size_id', 10);
        })
        .alterTable(TABLE_NAMES.ProductTinters, function(table){
            table.string('db_version_id', 10);
            table.string('product_shade_code_id', 10);
        })
        .alterTable(TABLE_NAMES.Products, function(table){
            table.string('db_version_id', 10);
            table.string('product_group_id', 10);
        })
        .alterTable(TABLE_NAMES.SubProducts, function(table){
            table.string('db_version_id', 10);
        })
        .alterTable(TABLE_NAMES.TinterPricings, function(table){
            table.string('db_version_id', 10);
        })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .alterTable(TABLE_NAMES.CanSizes, function(table){
            table.dropColumn('db_version_id');
            table.dropColumn('can_unit_id');
        })
        .alterTable(TABLE_NAMES.CanUnits, function(table){
            table.dropColumn('db_version_id');
        })
        .alterTable(TABLE_NAMES.DBVersions, function(table){
            table.dropColumn('company_id');
        })
        .alterTable(TABLE_NAMES.GeneralPricings, function(table){
            table.dropColumn('db_version_id');
            table.dropColumn('can_size_id');
        })
        .alterTable(TABLE_NAMES.ProductBasePricings, function(table){
            table.dropColumn('db_version_id');
            table.dropColumn('product_base_id');
            table.dropColumn('can_size_id');
        })
        .alterTable(TABLE_NAMES.ProductBases, function(table){
            table.dropColumn('db_version_id');
            table.dropColumn('product_id');
        })
        .alterTable(TABLE_NAMES.ProductCanSizes, function(table){
            table.dropColumn('db_version_id');
            table.dropColumn('can_size_id');
            table.dropColumn('product_id');
        })
        .alterTable(TABLE_NAMES.ProductGroups, function(table){
            table.dropColumn('db_version_id');
        })
        .alterTable(TABLE_NAMES.ProductShadeCodes, function(table){
            table.dropColumn('db_version_id');
            table.dropColumn('product_id');
            table.dropColumn('product_base_id');
            table.dropColumn('sub_product_id');
            table.dropColumn('can_size_id');
        })
        .alterTable(TABLE_NAMES.ProductTinters, function(table){
            table.dropColumn('db_version_id');
            table.dropColumn('product_shade_code_id');
        })
        .alterTable(TABLE_NAMES.Products, function(table){
            table.dropColumn('db_version_id');
            table.dropColumn('product_group_id');
        })
        .alterTable(TABLE_NAMES.SubProducts, function(table){
            table.dropColumn('db_version_id');
        })
        .alterTable(TABLE_NAMES.TinterPricings, function(table){
            table.dropColumn('db_version_id');
        })
}

