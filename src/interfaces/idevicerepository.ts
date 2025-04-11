import { Device } from "../models/device";

export interface IDeviceRepository {
    /**
     * Creates a new device.
     * @param device - The Device object to create.
     * @returns A promise that resolves when the creation is complete.
     */
    create(device: Device): Promise<void>;

    /**
     * Retrieves a device by its ID.
     * @param id - The unique identifier of the device.
     * @returns A promise that resolves to the requested Device.
     */
    getOne(id: number): Promise<Device>;

    /**
     * Retrieves all devices.
     * @returns A promise that resolves to an array of Device objects.
     */
    getAll(): Promise<Device[]>;

    /**
     * Updates an existing device by its ID.
     * @param id - The unique identifier of the device to update.
     * @param device - The updated data for the device.
     * @returns A promise that resolves when the update is complete.
     */
    update(id: number, device: Device): Promise<void>;

    /**
     * Deletes a device by its ID.
     * @param id - The unique identifier of the device to delete.
     * @returns A promise that resolves when the deletion is complete.
     */
    delete(id: number): Promise<void>;
}
