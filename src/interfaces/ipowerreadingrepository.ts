import { PowerReading, DateRange } from "../models";

export interface IPowerReadingRepository {
    /**
     * Retrieves a single power reading by its ID.
     * @param id - The unique identifier of the power reading.
     * @returns A promise that resolves to the requested PowerReading.
     */
    getOne(id: unknown): Promise<PowerReading>;
    /**
     * Retrieves a range of power readings for a specific device and date range.
     * @param device - The identifier of the device.
     * @param daterange - The date range for which to retrieve power readings.
     * @returns A promise that resolves to an array of PowerReading objects.
     */
    getRange(device: string, daterange: DateRange): Promise<PowerReading[]>;
    /**
     * Inserts a new power reading into the repository.
     * @param powerReading - The PowerReading object to insert.
     * @returns A promise that resolves to the inserted PowerReading.
     */
    insert(powerReading: PowerReading): Promise<PowerReading>;
    /**
     * Updates an existing power reading in the repository.
     * @param powerReading - The PowerReading object to update.
     * @returns A promise that resolves to the updated PowerReading.
     */
    update(powerReading: PowerReading): Promise<PowerReading>;
    /**
     * Deletes a power reading by its device and ID.
     * @param device - The identifier of the device.
     * @param id - The unique identifier of the power reading to delete.
     * @returns A promise that resolves when the deletion is complete.
     */
    delete(device: string, id: unknown): Promise<void>;
    /**
     * Retrieves the last N power readings for a specific device.
     * @param device - The identifier of the device.
     * @param n - The number of recent power readings to retrieve.
     * @returns A promise that resolves to an array of PowerReading objects.
     */
    getLast(device: string, n: number): Promise<PowerReading[]>;
    /**
     * Retrieves the last N power readings for a specific device and date range.
     * @param device - The identifier of the device.
     * @param n - The number of recent power readings to retrieve.
     * @param daterange - The date range for which to retrieve power readings.
     * @returns A promise that resolves to an array of PowerReading objects.
     */
}