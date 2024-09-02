import { Machine } from "../models/b_machines";
import { DTO } from "./dto";

export class DtoGetMachine extends DTO{
    id!: any;
    companyId!: any;
    serialNo!: string;
    bleMacAddress!: string;
    tintingProfileId!: any;
    dbVersionId!: any;
    visible!: boolean;

    constructor(
        machine: Machine
    ){
        super();
        this.id = machine.id;
        this.companyId = machine.company_id;
        this.serialNo = machine.machine_serial_no;
        this.bleMacAddress = machine.bluetooth_mac_address;
        this.tintingProfileId = machine.tinting_profile_id;
        this.dbVersionId = machine.db_version_id;
        this.visible = machine.visible ?? false;
    }

    static parseFromArray(
        machines: Machine[]
    ): DtoGetMachine[]{
        let arr: DtoGetMachine[] = [];
        for (let i = 0; i < machines.length; i++) {
            const item = machines[i];
            const m = new DtoGetMachine(item);
            arr.push(m);
        }
        return arr;
    }
}