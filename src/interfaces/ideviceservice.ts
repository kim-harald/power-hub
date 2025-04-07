import { Device } from "models/device";
import { DateRange } from "../models";

export interface IDeviceService {
    /**
     * Retrieves a single device by its ID.
     * @param id - The unique identifier of the device.
     * @returns A promise that resolves to the requested Device.
     */
    getOne(id: unknown): Promise<Device>;
    /**
     * Retrieves a range of devices based on the provided date range.
     * @param daterange - The date range for which to retrieve devices.
     * @returns A promise that resolves to an array of Device objects.
     */
    getRange(daterange: DateRange): Promise<Device[]>;
    /**
     * Inserts a new device into the repository.
     * @param device - The Device object to insert.
     * @returns A promise that resolves to the inserted Device.
     */
    insert(device: Device): Promise<Device>;
    /**
     * Updates an existing device in the repository.
     * @param device - The Device object to update.
     * @returns A promise that resolves to the updated Device.
     */
    update(device: Device): Promise<Device>;
    /**
     * Deletes a device by its ID.
     * @param id - The unique identifier of the device to delete.
     * @returns A promise that resolves when the deletion is complete.
     */
    delete(id: unknown): Promise<void>;
}