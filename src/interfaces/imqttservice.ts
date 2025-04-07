import { Observable } from "rxjs";

export interface IMqttService {
  open(): Promise<void>;
  listen(topics: string[]): Observable<unknown>;
  publish(topic: string, message: unknown): Promise<void>;
  close(): Promise<void>;
}