import { Device } from "../models";

export interface ISyncService {
  sync(devices:Device[]): Promise<void>;
}