import { DTO } from "./dto";

export interface InterfaceCustomProductTinter{
    tinterCode: string,
    amount: number,
    sg: number,
    red: number,
    green: number,
    blue: number,
}


export class DtoCreateCustomShadeCode extends DTO {
    machineId!: any;
    dbVersionId!: any;
    productGroupId!: any;
    productId!: any;
    productBaseId!: any;
    subProductId!: any;
    canSizeId!: any;

    shadeCode!: string;
    shadeName!: string;

    red!: number;
    green!: number;
    blue!: number;

    customCanSizeMl!: number;
    
    productTinters!: InterfaceCustomProductTinter[];

    constructor(
        bodyData: any
    ){
        super();
        this.machineId = bodyData.machineId ? bodyData.machineId : null;
        this.dbVersionId = bodyData.dbVersionId ? bodyData.dbVersionId : null;
        this.productGroupId = bodyData.productGroupId ? bodyData.productGroupId : null;
        this.productId = bodyData.productId ? bodyData.productId : null;
        this.productBaseId = bodyData.productBaseId ? bodyData.productId : null;
        this.subProductId = bodyData.subProductId ? bodyData.subProductId : null;
        this.canSizeId = bodyData.canSizeId ? bodyData.subProductId : null;

        this.shadeCode = bodyData.shadeCode ? bodyData.shadeCode : '';
        this.shadeName = bodyData.shadeName ? bodyData.shadeName : '';
        
        this.red = bodyData.red ? bodyData.red : 0;
        this.green = bodyData.green ? bodyData.green : 0;
        this.blue = bodyData.blue ? bodyData.blue : 0;
        
        this.customCanSizeMl = bodyData.customCanSizeMl ? bodyData.customCanSizeMl : 0;

        this.productTinters = bodyData.productTinters ? bodyData.productTinters : [];
    }
}