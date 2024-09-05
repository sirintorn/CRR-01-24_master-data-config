import { Machine } from "../models/b_machines";
import { DBVersion } from "../models/m_db_versions";
import { DTO } from "./dto";

export class DtoGetMachine extends DTO{
    id!: any;
    companyId!: any;
    serialNo!: string;
    bleMacAddress!: string;
    bleNo!: string;
    tintingProfileId!: any;
    dbVersionId!: any;
    dbVersionName!: string;
    visible!: boolean;

    constructor(
        machine: Machine,
        dbVersion?: DBVersion,
    ){
        super();
        this.id = machine.id;
        this.companyId = machine.company_id;
        this.serialNo = machine.machine_serial_no;
        this.bleMacAddress = machine.bluetooth_mac_address;
        this.bleNo = machine.bluetooth_no;
        this.tintingProfileId = machine.tinting_profile_id;
        this.dbVersionId = machine.db_version_id;
        this.dbVersionName = dbVersion ? dbVersion.name : '-';
        this.visible = machine.visible ?? false;
    }

    static parseFromArray(
        machines: Machine[],
        dbVersions: DBVersion[]
    ): DtoGetMachine[]{
        let arr: DtoGetMachine[] = [];
        for (let i = 0; i < machines.length; i++) {
            const item = machines[i];
            const dbV = dbVersions.find(val => val.id == item.db_version_id);
            const m = new DtoGetMachine(item, dbV);
            arr.push(m);
        }
        return arr;
    }
}