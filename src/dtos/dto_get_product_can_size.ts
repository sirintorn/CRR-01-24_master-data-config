import { CanSize } from "../models/m_can_sizes";
import { CanUnit } from "../models/m_can_units";
import { ProductCanSize } from "../models/m_product_can_sizes";
import { DTO } from "./dto";

export class DtoGetProductCanSize extends DTO {
    id!: any;
    canSizeId!: any;
    displayName!: string;
    canSize!: number;
    unit!: string;
    asMl!: number;

    constructor(
        productCanSize: ProductCanSize,
        canSize: CanSize,
        canUnit: CanUnit
    ) {
        super();
        this.id = productCanSize ? productCanSize.id : '';
        this.canSizeId = canSize ? canSize.id : '';
        this.displayName = canSize ? canSize.display_name : '';
        this.canSize = canSize ? canSize.can_size : 0;
        this.unit = canUnit ? canUnit.name : '';
        this.asMl = canUnit ? canUnit.as_ml : 0;
    }
}