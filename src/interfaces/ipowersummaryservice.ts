import { Result, DateRange, PowerReading, PowerSummary } from '../models';

/**
 * Interface for managing power summary services.
 */
export interface IPowerSummaryService {
  /**
   * Creates a new power summary.
   * @param summary - The PowerSummary object to create.
   * @returns A promise that resolves when the creation is complete.
   */
  create(summary: PowerSummary): Promise<Result<void>>;

  /**
   * Retrieves a power summary by its ID.
   * @param id - The unique identifier of the power summary.
   * @returns A promise that resolves to the requested PowerSummary.
   */
  getOne(id: unknown): Promise<Result<PowerSummary>>;

  /**
   * Retrieves all power summaries for a specific device and date range.
   * @param device - The identifier of the device.
   * @param daterange - The date range for which to retrieve power summaries.
   * @returns A promise that resolves to an array of PowerSummary objects.
   */
  getRange(
    device: string,
    daterange: DateRange
  ): Promise<Result<PowerSummary[]>>;

  /**
   * Updates an existing power summary by its ID.
   * @param id - The unique identifier of the power summary to update.
   * @param summary - The updated data for the power summary.
   * @returns A promise that resolves when the update is complete.
   */
  update(id: unknown, summary: any): Promise<Result<void>>;

  /**
   * Deletes a power summary by its ID.
   * @param id - The unique identifier of the power summary to delete.
   * @returns A promise that resolves when the deletion is complete.
   */
  delete(id: unknown): Promise<Result<void>>;
}
