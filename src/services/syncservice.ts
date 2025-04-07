import { Device, Payload, PowerSummary } from "models";
import { ISyncService } from "../interfaces";
import axios from "axios";
import { WLogger } from "./loggerservice";
import { inject, injectable, named } from "inversify";

@injectable()
export class SyncService implements ISyncService {
    constructor(
        @inject('IPowerSummaryService') @named('IPowerSummaryService') private readonly powerSummaryService: ISyncService,
    ) {
        // Initialize any necessary properties or dependencies here
    }
    
    async sync(devices: Device[]): Promise<void> {
        for await (const device of devices) {
            console.log(`Syncing device: ${device}`);
            const responseIds = await axios.get(`${device.url}/ids`);
            if (responseIds.status !== 200) {
                WLogger.error(`Error syncing device ${device}: ${responseIds.statusText}`);
                continue;
            }
            // Assuming the response data is an array of IDs
            const ids = responseIds.data as unknown[];



            const responsePayload = await axios.post(`${device.url}/payload`, ids);
            if (responsePayload.status !== 200) {
                WLogger.error(`Error syncing device ${device}: ${responsePayload.statusText}`);
                continue;
            }

            const payload = responsePayload.data as Payload<PowerSummary>;
            if (!payload) {
                WLogger.error(`Error syncing device ${device}: Invalid payload`);
                continue;
            }

            if (!payload.isValid) {
                WLogger.error(`Error syncing device ${device}: Invalid payload`);
                continue;
            }
            
        }
        console.log("Syncing devices:", devices);
        // Example: You can use a loop to iterate through the devices and perform sync operations
        for (const device of devices) {
        console.log(`Syncing device: ${device}`);
        // Add your sync logic here, such as making API calls or updating the database
        }
    }
}


