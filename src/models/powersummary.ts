import { Device } from "./device";

export type PowerSummary = {
  id: unknown;
  ts: number;
  period: number;
  device: Device;
  max: Record<string, number>;
  min: Record<string, number>;
  avg: Record<string, number>;
};
