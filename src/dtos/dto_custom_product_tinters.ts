import { CustomProductTinter } from "../models/n_custom_product_tinters";
import { DTO } from "./dto";

export class DtoCustomProductTinter extends DTO{
    id?: any;
    machineId: any;
    dbVersionId: any;
    productShadeCodeId: any;
    tinterCode: string;
    amount: number;
    sg: number;
    red: number;
    green: number;
    blue: number;
    createdAt!: any;

    constructor(tinter: CustomProductTinter){
        super();
        this.id = tinter.id;
        this.machineId = tinter.machine_id;
        this.dbVersionId = tinter.db_version_id;
        this.productShadeCodeId = tinter.product_shade_code_id;
        this.tinterCode = tinter.tinter_code;
        this.amount = tinter.amount;
        this.sg = tinter.sg;
        this.red = tinter.red;
        this.green = tinter.green;
        this.blue = tinter.blue;
        this.createdAt = tinter.created_at;
    }

    static parseFromArray(tinters: CustomProductTinter[]): DtoCustomProductTinter[]{
        let arr: DtoCustomProductTinter[] = [];
        for (let i = 0; i < tinters.length; i++) {
            const item = tinters[i];
            const dto = new DtoCustomProductTinter(item);
            arr.push(dto);
        }
        return arr;
    }

    static reverseFromArray(tinters: DtoCustomProductTinter[]): CustomProductTinter[]{
        let arr: CustomProductTinter[] = [];
        for (let i = 0; i < tinters.length; i++) {
            const item = tinters[i];
            const tint: CustomProductTinter = {
                machine_id: item.machineId, //indicator to its creator
                db_version_id: item.dbVersionId,
                product_shade_code_id: item.productShadeCodeId,
                tinter_code: item.tinterCode,
                amount: item.amount,
                sg: item.sg,
                red: item.red,
                green: item.green,
                blue: item.blue,
            };
            arr.push(tint);
        }
        return arr;
    }
}