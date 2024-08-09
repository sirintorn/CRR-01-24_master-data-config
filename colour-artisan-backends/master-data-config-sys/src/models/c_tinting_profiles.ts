import { TableRecord } from "../../db/db";

export interface TintingProfile extends TableRecord{
    company_id: any,
    machine_id: any,
    blue_mac_addr: string,
}