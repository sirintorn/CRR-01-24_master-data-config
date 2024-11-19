import { ProductTinter } from "../models/m_product_tinters";
import { DTO } from "./dto";

export class DtoGetProductTinter extends DTO{
    id?: any;
    dbVersionId: any;
    productShadeCodeId: any;
    tinterCode: string;
    amount: number;
    sg: number;
    red: number;
    green: number;
    blue: number;
    createdAt!: any;

    constructor(tinter: ProductTinter){
        super();
        this.id = tinter.id;
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

    static parseFromArray(tinters: ProductTinter[]): DtoGetProductTinter[]{
        let arr: DtoGetProductTinter[] = [];
        for (let i = 0; i < tinters.length; i++) {
            const item = tinters[i];
            const dto = new DtoGetProductTinter(item);
            arr.push(dto);
        }
        return arr;
    }
}