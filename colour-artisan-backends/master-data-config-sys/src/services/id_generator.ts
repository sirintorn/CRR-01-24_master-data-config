import { generateCustomUuid, generateTimestampId } from "custom-uuid";

export class IDGenerator {
    static newUUID(){
        const key1 = generateCustomUuid('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 4);
        const keym = generateCustomUuid('?!@#$&-_+=abcdefghijklmnopqrstuvwxyz', 1);
        const key2 = generateCustomUuid('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 4);
        const keyl = generateCustomUuid('?!@#$&-_+=abcdefghijklmnopqrstuvwxyz', 1);
        return key1+keym+key2+keyl;
    }

    static newFormulaBookFileName(){
        return generateTimestampId() + ".xlsx";
    }
}