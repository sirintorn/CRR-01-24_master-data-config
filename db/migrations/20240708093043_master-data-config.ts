import type { Knex } from "knex";
import { TABLE_NAMES } from "../db";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .alterTable(TABLE_NAMES.CanSizes, function(table){
            table.string('created_by', 10);
            table.string('updated_by', 10);
        })
        .alterTable(TABLE_NAMES.CanUnits, function(table){
            table.string('created_by', 10);
            table.string('updated_by', 10);
        })
        .alterTable(TABLE_NAMES.DBVersions, function(table){
            table.string('created_by', 10);
            table.string('updated_by', 10);
        })
        .alterTable(TABLE_NAMES.GeneralPricings, function(table){
            table.string('created_by', 10);
            table.string('updated_by', 10);
        })
        .alterTable(TABLE_NAMES.ProductBasePricings, function(table){
            table.string('created_by', 10);
            table.string('updated_by', 10);
        })
        .alterTable(TABLE_NAMES.ProductBases, function(table){
            table.string('created_by', 10);
            table.string('updated_by', 10);
        })
        .alterTable(TABLE_NAMES.ProductCanSizes, function(table){
            table.string('created_by', 10);
            table.string('updated_by', 10);
        })
        .alterTable(TABLE_NAMES.ProductGroups, function(table){
            table.string('created_by', 10);
            table.string('updated_by', 10);
        })
        .alterTable(TABLE_NAMES.ProductShadeCodes, function(table){
            table.string('created_by', 10);
            table.string('updated_by', 10);
        })
        .alterTable(TABLE_NAMES.ProductTinters, function(table){
            table.string('created_by', 10);
            table.string('updated_by', 10);
        })
        .alterTable(TABLE_NAMES.Products, function(table){
            table.string('created_by', 10);
            table.string('updated_by', 10);
        })
        .alterTable(TABLE_NAMES.SubProducts, function(table){
            table.string('created_by', 10);
            table.string('updated_by', 10);
        })
        .alterTable(TABLE_NAMES.TinterPricings, function(table){
            table.string('created_by', 10);
            table.string('updated_by', 10);
        })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .alterTable(TABLE_NAMES.CanSizes, function(table){
            table.dropColumn('created_by');
            table.dropColumn('updated_by');
        })
        .alterTable(TABLE_NAMES.CanUnits, function(table){
            table.dropColumn('created_by');
            table.dropColumn('updated_by');
        })
        .alterTable(TABLE_NAMES.DBVersions, function(table){
            table.dropColumn('created_by');
            table.dropColumn('updated_by');
        })
        .alterTable(TABLE_NAMES.GeneralPricings, function(table){
            table.dropColumn('created_by');
            table.dropColumn('updated_by');
        })
        .alterTable(TABLE_NAMES.ProductBasePricings, function(table){
            table.dropColumn('created_by');
            table.dropColumn('updated_by');
        })
        .alterTable(TABLE_NAMES.ProductBases, function(table){
            table.dropColumn('created_by');
            table.dropColumn('updated_by');
        })
        .alterTable(TABLE_NAMES.ProductCanSizes, function(table){
            table.dropColumn('created_by');
            table.dropColumn('updated_by');
        })
        .alterTable(TABLE_NAMES.ProductGroups, function(table){
            table.dropColumn('created_by');
            table.dropColumn('updated_by');
        })
        .alterTable(TABLE_NAMES.ProductShadeCodes, function(table){
            table.dropColumn('created_by');
            table.dropColumn('updated_by');
        })
        .alterTable(TABLE_NAMES.ProductTinters, function(table){
            table.dropColumn('created_by');
            table.dropColumn('updated_by');
        })
        .alterTable(TABLE_NAMES.Products, function(table){
            table.dropColumn('created_by');
            table.dropColumn('updated_by');
        })
        .alterTable(TABLE_NAMES.SubProducts, function(table){
            table.dropColumn('created_by');
            table.dropColumn('updated_by');
        })
        .alterTable(TABLE_NAMES.TinterPricings, function(table){
            table.dropColumn('created_by');
            table.dropColumn('updated_by');
        })
}

