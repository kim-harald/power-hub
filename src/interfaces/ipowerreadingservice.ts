import { DateRange, PowerReading } from "../models";

export interface IPowerReadingService {
    // Create a new power reading
    create(reading: PowerReading): Promise<void>;

    // Retrieve a power reading by ID
    getReadingById(id: unknown): Promise<PowerReading>;

    // Retrieve all power readings for a specific device
    getAll(device:string): Promise<PowerReading[]>;

    // Update a power reading by ID
    update(id: unknown, reading: PowerReading): Promise<void>;

    // Delete a power reading by ID
    delete(id: unknown): Promise<void>;
}
