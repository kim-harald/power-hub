import { DateRange, PowerReading } from "../models";

export interface IPowerReadingService {
    /**
     * Creates a new power reading.
     * @param reading - The PowerReading object to create.
     * @returns A promise that resolves when the creation is complete.
     */
    create(reading: PowerReading): Promise<void>;

    /**
     * Retrieves a power reading by its ID.
     * @param id - The unique identifier of the power reading.
     * @returns A promise that resolves to the requested PowerReading.
     */
    getReadingById(id: unknown): Promise<PowerReading>;

    /**
     * Retrieves all power readings for a specific device.
     * @param device - The identifier of the device.
     * @returns A promise that resolves to an array of PowerReading objects.
     */
    getAll(device: string): Promise<PowerReading[]>;

    /**
     * Updates an existing power reading by its ID.
     * @param id - The unique identifier of the power reading to update.
     * @param reading - The updated data for the power reading.
     * @returns A promise that resolves when the update is complete.
     */
    update(id: unknown, reading: PowerReading): Promise<void>;

    /**
     * Deletes a power reading by its ID.
     * @param id - The unique identifier of the power reading to delete.
     * @returns A promise that resolves when the deletion is complete.
     */
    delete(id: unknown): Promise<void>;
}
