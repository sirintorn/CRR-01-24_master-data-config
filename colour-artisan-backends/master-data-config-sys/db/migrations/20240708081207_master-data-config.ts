import type { Knex } from "knex";
import { TABLE_NAMES } from "../db";
import { IDGenerator } from "../../src/services/id_generator";

export async function up(knex: Knex): Promise<void> {
    return knex.schema
        .alterTable(TABLE_NAMES.DBVersions, function (table) {
            table.string('id', 10).primary({
                constraintName: `${TABLE_NAMES.DBVersions}_primary_key`,
                deferrable: 'deferred',
            })
            .notNullable()
            .defaultTo(IDGenerator.newUUID());
        })
        .alterTable(TABLE_NAMES.CanSizes, function (table) {
            table.string('id', 10).primary({
                constraintName: `${TABLE_NAMES.CanSizes}_primary_key`,
                deferrable: 'deferred',
            })
            .notNullable()
            .defaultTo(IDGenerator.newUUID());
        })
        .alterTable(TABLE_NAMES.CanUnits, function (table) {
            table.string('id', 10).primary({
                constraintName: `${TABLE_NAMES.CanUnits}_primary_key`,
                deferrable: 'deferred',
            })
            .notNullable()
            .defaultTo(IDGenerator.newUUID());
        })
        .alterTable(TABLE_NAMES.ProductCanSizes, function (table) {
            table.string('id', 10).primary({
                constraintName: `${TABLE_NAMES.ProductCanSizes}_primary_key`,
                deferrable: 'deferred',
            })
            .notNullable()
            .defaultTo(IDGenerator.newUUID());
        })
        .alterTable(TABLE_NAMES.ProductGroups, function (table) {
            table.string('id', 10).primary({
                constraintName: `${TABLE_NAMES.ProductGroups}_primary_key`,
                deferrable: 'deferred',
            })
            .notNullable()
            .defaultTo(IDGenerator.newUUID());
        })
        .alterTable(TABLE_NAMES.Products, function (table) {
            table.string('id', 10).primary({
                constraintName: `${TABLE_NAMES.Products}_primary_key`,
                deferrable: 'deferred',
            })
            .notNullable()
            .defaultTo(IDGenerator.newUUID());
        })
        .alterTable(TABLE_NAMES.ProductBases, function (table) {
            table.string('id', 10).primary({
                constraintName: `${TABLE_NAMES.ProductBases}_primary_key`,
                deferrable: 'deferred',
            })
            .notNullable()
            .defaultTo(IDGenerator.newUUID());
        })
        .alterTable(TABLE_NAMES.SubProducts, function (table) {
            table.string('id', 10).primary({
                constraintName: `${TABLE_NAMES.SubProducts}_primary_key`,
                deferrable: 'deferred',
            })
            .notNullable()
            .defaultTo(IDGenerator.newUUID());
        })
        .alterTable(TABLE_NAMES.ProductShadeCodes, function (table) {
            table.string('id', 10).primary({
                constraintName: `${TABLE_NAMES.ProductShadeCodes}_primary_key`,
                deferrable: 'deferred',
            })
            .notNullable()
            .defaultTo(IDGenerator.newUUID());
        })
        .alterTable(TABLE_NAMES.ProductTinters, function (table) {
            table.string('id', 10).primary({
                constraintName: `${TABLE_NAMES.ProductTinters}_primary_key`,
                deferrable: 'deferred',
            })
            .notNullable()
            .defaultTo(IDGenerator.newUUID());
        })
        .alterTable(TABLE_NAMES.GeneralPricings, function (table) {
            table.string('id', 10).primary({
                constraintName: `${TABLE_NAMES.GeneralPricings}_primary_key`,
                deferrable: 'deferred',
            })
            .notNullable()
            .defaultTo(IDGenerator.newUUID());
        })
        .alterTable(TABLE_NAMES.ProductBasePricings, function (table) {
            table.string('id', 10).primary({
                constraintName: `${TABLE_NAMES.ProductBasePricings}_primary_key`,
                deferrable: 'deferred',
            })
            .notNullable()
            .defaultTo(IDGenerator.newUUID());
        })
        .alterTable(TABLE_NAMES.TinterPricings, function (table) {
            table.string('id', 10).primary({
                constraintName: `${TABLE_NAMES.TinterPricings}_primary_key`,
                deferrable: 'deferred',
            })
            .notNullable()
            .defaultTo(IDGenerator.newUUID());
        })
    //NEW REQUIREMENT ---> add deleted_at and deleted_by to every table
    //NEW REQUIREMENT ---> change ID column to custom UUID
    //ref: https://www.npmjs.com/package/custom-uuid
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema
        .alterTable(TABLE_NAMES.DBVersions, function (table) {
            table.dropColumn('id');

            table.dropColumn('deleted_at');
            table.dropColumn('deleted_by');
        })
        .alterTable(TABLE_NAMES.CanSizes, function (table) {
            table.dropColumn('id');
            
            table.dropColumn('deleted_at');
            table.dropColumn('deleted_by');
        })
        .alterTable(TABLE_NAMES.CanUnits, function (table) {
            table.dropColumn('id');

            table.dropColumn('deleted_at');
            table.dropColumn('deleted_by');
        })
        .alterTable(TABLE_NAMES.ProductCanSizes, function (table) {
            table.dropColumn('id');
            
            table.dropColumn('deleted_at');
            table.dropColumn('deleted_by');
        })
        .alterTable(TABLE_NAMES.ProductGroups, function (table) {
            table.dropColumn('id');
            
            table.dropColumn('deleted_at');
            table.dropColumn('deleted_by');
        })
        .alterTable(TABLE_NAMES.Products, function (table) {
            table.dropColumn('id');
            
            table.dropColumn('deleted_at');
            table.dropColumn('deleted_by');
        })
        .alterTable(TABLE_NAMES.ProductBases, function (table) {
            table.dropColumn('id');
            
            table.dropColumn('deleted_at');
            table.dropColumn('deleted_by');
        })
        .alterTable(TABLE_NAMES.SubProducts, function (table) {
            table.dropColumn('id');
            
            table.dropColumn('deleted_at');
            table.dropColumn('deleted_by');
        })
        .alterTable(TABLE_NAMES.ProductShadeCodes, function (table) {
            table.dropColumn('id');
            
            table.dropColumn('deleted_at');
            table.dropColumn('deleted_by');
        })
        .alterTable(TABLE_NAMES.ProductTinters, function (table) {
            table.dropColumn('id');
            
            table.dropColumn('deleted_at');
            table.dropColumn('deleted_by');
        })
        .alterTable(TABLE_NAMES.GeneralPricings, function (table) {
            table.dropColumn('id');
            
            table.dropColumn('deleted_at');
            table.dropColumn('deleted_by');
        })
        .alterTable(TABLE_NAMES.ProductBasePricings, function (table) {
            table.dropColumn('id');
            
            table.dropColumn('deleted_at');
            table.dropColumn('deleted_by');
        })
        .alterTable(TABLE_NAMES.TinterPricings, function (table) {
            table.dropColumn('id');
            
            table.dropColumn('deleted_at');
            table.dropColumn('deleted_by');
        })
}

