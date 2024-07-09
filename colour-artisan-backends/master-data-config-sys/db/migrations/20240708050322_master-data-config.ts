import type { Knex } from "knex";
import { TABLE_NAMES } from "../db";

export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .alterTable(TABLE_NAMES.DBVersions, function (table) {
            table.dropColumn('id');
            table.timestamp('deleted_at');
            table.string('deleted_by', 10);
        })
        .alterTable(TABLE_NAMES.CanSizes, function (table) {
            table.dropColumn('id');
            table.timestamp('deleted_at');
            table.string('deleted_by', 10);
        })
        .alterTable(TABLE_NAMES.CanUnits, function (table) {
            table.dropColumn('id');
            table.timestamp('deleted_at');
            table.string('deleted_by', 10);
        })
        .alterTable(TABLE_NAMES.ProductCanSizes, function (table) {
            table.dropColumn('id');
            table.timestamp('deleted_at');
            table.string('deleted_by', 10);
        })
        .alterTable(TABLE_NAMES.ProductGroups, function (table) {
            table.dropColumn('id');
            table.timestamp('deleted_at');
            table.string('deleted_by', 10);
        })
        .alterTable(TABLE_NAMES.Products, function (table) {
            table.dropColumn('id');
            table.timestamp('deleted_at');
            table.string('deleted_by', 10);
        })
        .alterTable(TABLE_NAMES.ProductBases, function (table) {
            table.dropColumn('id');
            table.timestamp('deleted_at');
            table.string('deleted_by', 10);
        })
        .alterTable(TABLE_NAMES.SubProducts, function (table) {
            table.dropColumn('id');
            table.timestamp('deleted_at');
            table.string('deleted_by', 10);
        })
        .alterTable(TABLE_NAMES.ProductShadeCodes, function (table) {
            table.dropColumn('id');
            table.timestamp('deleted_at');
            table.string('deleted_by', 10);
        })
        .alterTable(TABLE_NAMES.ProductTinters, function (table) {
            table.dropColumn('id');
            table.timestamp('deleted_at');
            table.string('deleted_by', 10);
        })
        .alterTable(TABLE_NAMES.GeneralPricings, function (table) {
            table.dropColumn('id');
            table.timestamp('deleted_at');
            table.string('deleted_by', 10);
        })
        .alterTable(TABLE_NAMES.ProductBasePricings, function (table) {
            table.dropColumn('id');
            table.timestamp('deleted_at');
            table.string('deleted_by', 10);
        })
        .alterTable(TABLE_NAMES.TinterPricings, function (table) {
            table.dropColumn('id');
            table.timestamp('deleted_at');
            table.string('deleted_by', 10);
        })
    //NEW REQUIREMENT ---> add deleted_at and deleted_by to every table
    //NEW REQUIREMENT ---> change ID column to custom UUID
    //ref: https://www.npmjs.com/package/custom-uuid
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .alterTable(TABLE_NAMES.DBVersions, function (table) {
            table.increments('id');
        })
        .alterTable(TABLE_NAMES.CanSizes, function (table) {
            table.increments('id');
        })
        .alterTable(TABLE_NAMES.CanUnits, function (table) {
            table.increments('id');
        })
        .alterTable(TABLE_NAMES.ProductCanSizes, function (table) {
            table.increments('id');
        })
        .alterTable(TABLE_NAMES.ProductGroups, function (table) {
            table.increments('id');
        })
        .alterTable(TABLE_NAMES.Products, function (table) {
            table.increments('id');
        })
        .alterTable(TABLE_NAMES.ProductBases, function (table) {
            table.increments('id');
        })
        .alterTable(TABLE_NAMES.SubProducts, function (table) {
            table.increments('id');
        })
        .alterTable(TABLE_NAMES.ProductShadeCodes, function (table) {
            table.increments('id');
        })
        .alterTable(TABLE_NAMES.ProductTinters, function (table) {
            table.increments('id');
        })
        .alterTable(TABLE_NAMES.GeneralPricings, function (table) {
            table.increments('id');
        })
        .alterTable(TABLE_NAMES.ProductBasePricings, function (table) {
            table.increments('id');
        })
        .alterTable(TABLE_NAMES.TinterPricings, function (table) {
            table.increments('id');
        })
}

