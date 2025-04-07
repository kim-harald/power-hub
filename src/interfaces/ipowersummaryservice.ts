import { IDeviceRepository, IPowerReadingRepository } from ".";
import { DateRange, PowerReading } from "../models";

export interface IPowerSummaryService {
    // Create a power summary
    create(summary: any): Promise<void>;

    // Retrieve a power summary by ID
    getOne(id: number): Promise<any>;

    // Retrieve all power summaries
    getRange(device:string, daterange:DateRange): Promise<any[]>;

    // Update a power summary by ID
    update(id: number, summary: any): Promise<void>;

    // Delete a power summary by ID
    delete(id: number): Promise<void>;

    // Retrieve the last N power summaries for a specific device
    getLast(device: string, n: number): Promise<PowerReading[]>;

    // Retrieve the last N power summaries for a specific device and date range
    getLastInRange(device: string, n: number, daterange: DateRange): Promise<PowerReading[]>;
}