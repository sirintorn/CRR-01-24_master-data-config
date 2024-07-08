import type { Knex } from "knex";
import { TABLE_NAMES } from "../db";


export async function up(knex: Knex): Promise<void> {
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


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .alterTable(TABLE_NAMES.CanSizes, function(table){
            table.integer('db_version_id');
            table.integer('can_unit_id');
        })
        .alterTable(TABLE_NAMES.CanUnits, function(table){
            table.integer('db_version_id')
        })
        .alterTable(TABLE_NAMES.DBVersions, function(table){
            table.integer('company_id');
        })
        .alterTable(TABLE_NAMES.GeneralPricings, function(table){
            table.integer('db_version_id');
            table.integer('can_size_id');
        })
        .alterTable(TABLE_NAMES.ProductBasePricings, function(table){
            table.integer('db_version_id');
            table.integer('product_base_id');
            table.integer('can_size_id');
        })
        .alterTable(TABLE_NAMES.ProductBases, function(table){
            table.integer('db_version_id');
            table.integer('product_id');
        })
        .alterTable(TABLE_NAMES.ProductCanSizes, function(table){
            table.integer('db_version_id');
            table.integer('can_size_id');
            table.integer('product_id');
        })
        .alterTable(TABLE_NAMES.ProductGroups, function(table){
            table.integer('db_version_id');
        })
        .alterTable(TABLE_NAMES.ProductShadeCodes, function(table){
            table.integer('db_version_id');
            table.integer('product_id');
            table.integer('product_base_id');
            table.integer('sub_product_id');
            table.integer('can_size_id');
        })
        .alterTable(TABLE_NAMES.ProductTinters, function(table){
            table.integer('db_version_id');
            table.integer('product_shade_code_id');
        })
        .alterTable(TABLE_NAMES.Products, function(table){
            table.integer('db_version_id');
            table.integer('product_group_id');
        })
        .alterTable(TABLE_NAMES.SubProducts, function(table){
            table.integer('db_version_id');
        })
        .alterTable(TABLE_NAMES.TinterPricings, function(table){
            table.integer('db_version_id');
        })
}

