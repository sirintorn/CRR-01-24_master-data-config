import { generateCustomUuid, generateTimestampId } from "custom-uuid";

export class IDGenerator {
    static newUUID(){
        return generateCustomUuid('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 10);
    }

    static newFormulaBookFileName(){
        return generateTimestampId() + ".xlsx";
    }
}