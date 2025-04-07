import { Device } from "../models/device";

export interface IDeviceRepository {
    // Create a new device
    createDevice(device: Device): Promise<void>;

    // Retrieve a device by ID
    getDeviceById(id: number): Promise<Device>;

    // Retrieve all devices
    getAllDevices(): Promise<Device[]>;

    // Update a device by ID
    updateDevice(id: number, device: Device): Promise<void>;

    // Delete a device by ID
    deleteDevice(id: number): Promise<void>;
}
