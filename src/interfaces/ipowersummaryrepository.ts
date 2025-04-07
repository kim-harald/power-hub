import { DateRange, PowerSummary } from "../models";

/**
 * Interface for managing power summary data.
 */
export interface IPowerSummaryRepository {
    /**
     * Retrieves a single power summary by its ID.
     * @param id - The unique identifier of the power summary.
     * @returns A promise that resolves to the requested PowerSummary.
     */
    getOne(id: unknown): Promise<PowerSummary>;

    /**
     * Retrieves a range of power summaries for a specific device and date range.
     * @param device - The identifier of the device.
     * @param daterange - The date range for which to retrieve power summaries.
     * @returns A promise that resolves to an array of PowerSummary objects.
     */
    getRange(device: string, daterange: DateRange): Promise<PowerSummary[]>;

    /**
     * Inserts a new power summary into the repository.
     * @param powerSummary - The PowerSummary object to insert.
     * @returns A promise that resolves to the inserted PowerSummary.
     */
    insert(powerSummary: PowerSummary): Promise<PowerSummary>;

    /**
     * Updates an existing power summary in the repository.
     * @param powerSummary - The PowerSummary object to update.
     * @returns A promise that resolves to the updated PowerSummary.
     */
    update(powerSummary: PowerSummary): Promise<PowerSummary>;

    /**
     * Deletes a power summary by its device and ID.
     * @param device - The identifier of the device.
     * @param id - The unique identifier of the power summary to delete.
     * @returns A promise that resolves when the deletion is complete.
     */
    delete(device: string, id: unknown): Promise<void>;

    /**
     * Retrieves the last N power summaries for a specific device.
     * @param device - The identifier of the device.
     * @param n - The number of recent power summaries to retrieve.
     * @returns A promise that resolves to an array of PowerSummary objects.
     */
    getLast(device: string, n: number): Promise<PowerSummary[]>;

    /**
     * Retrieves the last N power summaries for a specific device and date range.
     * @param device - The identifier of the device.
     * @param n - The number of recent power summaries to retrieve.
     * @param daterange - The date range for which to retrieve power summaries.
     * @returns A promise that resolves to an array of PowerSummary objects.
     */
    getLastInRange(device: string, n: number, daterange: DateRange): Promise<PowerSummary[]>;
}
