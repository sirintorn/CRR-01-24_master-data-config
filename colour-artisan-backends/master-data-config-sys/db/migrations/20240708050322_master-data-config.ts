import type { Knex } from "knex";
import { TABLE_NAMES } from "../db";


export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .alterTable(TABLE_NAMES.DBVersions, function(table){
            table.timestamp('deleted_at');
            table.string('deleted_by', 10);
        })
        .alterTable(TABLE_NAMES.CanSizes, function(table){
            table.timestamp('deleted_at');
            table.string('deleted_by', 10);
        })
        .alterTable(TABLE_NAMES.CanUnits, function(table){
            table.timestamp('deleted_at');
            table.string('deleted_by', 10);
        })
        .alterTable(TABLE_NAMES.ProductCanSizes, function(table){
            table.timestamp('deleted_at');
            table.string('deleted_by', 10);
        })
        .alterTable(TABLE_NAMES.ProductGroups, function(table){
            table.timestamp('deleted_at');
            table.string('deleted_by', 10);
        })
        .alterTable(TABLE_NAMES.Products, function(table){
            table.timestamp('deleted_at');
            table.string('deleted_by', 10);
        })
        .alterTable(TABLE_NAMES.ProductBases, function(table){
            table.timestamp('deleted_at');
            table.string('deleted_by', 10);
        })
        .alterTable(TABLE_NAMES.SubProducts, function(table){
            table.timestamp('deleted_at');
            table.string('deleted_by', 10);
        })
        .alterTable(TABLE_NAMES.ProductShadeCodes, function(table){
            table.timestamp('deleted_at');
            table.string('deleted_by', 10);
        })
        .alterTable(TABLE_NAMES.ProductTinters, function(table){
            table.timestamp('deleted_at');
            table.string('deleted_by', 10);
        })
        .alterTable(TABLE_NAMES.GeneralPricings, function(table){
            table.timestamp('deleted_at');
            table.string('deleted_by', 10);
        })
        .alterTable(TABLE_NAMES.ProductBasePricings, function(table){
            table.timestamp('deleted_at');
            table.string('deleted_by', 10);
        })
        .alterTable(TABLE_NAMES.TinterPricings, function(table){
            table.timestamp('deleted_at');
            table.string('deleted_by', 10);
        })
        //NEW REQUIREMENT ---> add deleted_at and deleted_by to every table
        //NEW REQUIREMENT ---> change ID column to custom UUID
        //ref: https://www.npmjs.com/package/custom-uuid
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .alterTable(TABLE_NAMES.DBVersions, function(table){
            table.dropColumn('deleted_at');
            table.dropColumn('deleted_by');
        })
        .alterTable(TABLE_NAMES.CanSizes, function(table){
            table.dropColumn('deleted_at');
            table.dropColumn('deleted_by');
        })
        .alterTable(TABLE_NAMES.CanUnits, function(table){
            table.dropColumn('deleted_at');
            table.dropColumn('deleted_by');
        })
        .alterTable(TABLE_NAMES.ProductCanSizes, function(table){
            table.dropColumn('deleted_at');
            table.dropColumn('deleted_by');
        })
        .alterTable(TABLE_NAMES.ProductGroups, function(table){
            table.dropColumn('deleted_at');
            table.dropColumn('deleted_by');
        })
        .alterTable(TABLE_NAMES.Products, function(table){
            table.dropColumn('deleted_at');
            table.dropColumn('deleted_by');
        })
        .alterTable(TABLE_NAMES.ProductBases, function(table){
            table.dropColumn('deleted_at');
            table.dropColumn('deleted_by');
        })
        .alterTable(TABLE_NAMES.SubProducts, function(table){
            table.dropColumn('deleted_at');
            table.dropColumn('deleted_by');
        })
        .alterTable(TABLE_NAMES.ProductShadeCodes, function(table){
            table.dropColumn('deleted_at');
            table.dropColumn('deleted_by');
        })
        .alterTable(TABLE_NAMES.ProductTinters, function(table){
            table.dropColumn('deleted_at');
            table.dropColumn('deleted_by');
        })
        .alterTable(TABLE_NAMES.GeneralPricings, function(table){
            table.dropColumn('deleted_at');
            table.dropColumn('deleted_by');
        })
        .alterTable(TABLE_NAMES.ProductBasePricings, function(table){
            table.dropColumn('deleted_at');
            table.dropColumn('deleted_by');
        })
        .alterTable(TABLE_NAMES.TinterPricings, function(table){
            table.dropColumn('deleted_at');
            table.dropColumn('deleted_by');
        })
}

