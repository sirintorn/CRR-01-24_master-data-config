import { generateCustomUuid } from "custom-uuid";

export class IDGenerator {
    static newUUID(){
        return generateCustomUuid('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz', 10);
    }
}