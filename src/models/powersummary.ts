export type PowerSummary = {
  id: unknown;
  ts: number;
  period: number;
  device: string;
  max: Record<string, number>;
  min: Record<string, number>;
  avg: Record<string, number>;
};
