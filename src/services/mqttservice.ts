import { AsyncMqttClient, connectAsync, IClientOptions } from 'async-mqtt';
import { IMqttService } from 'interfaces';
import { inject, injectable, named } from 'inversify';
import { Observable } from 'rxjs';

@injectable()
export class MqttService implements IMqttService {
  private _client: AsyncMqttClient | null = null;

  constructor(@inject('IClientOptions') @named('clientOptions') private readonly clientOptions: IClientOptions) {
    console.log('MqttService constructor');
  }

  public async open(): Promise<void> {
    this._client = await connectAsync(this.clientOptions.host, this.clientOptions);
  }

  public listen(topics: string[]): Observable<unknown> {
    if (this._client === null) {
      throw new Error('Client is not connected');
    }

    if (!this._client.connected) {
      throw new Error('Client is not connected');
    }

    return new Observable<unknown>((subscriber) => {
      topics.forEach((topic) => {
        this._client?.subscribe(topic);
      });

      this._client?.on('message', (topic, message, packet) => {
        const data = JSON.parse(message.toString());
        subscriber.next({ topic, data });
      });
    });
  }

  public async publish(topic: string, message: unknown): Promise<void> {
    if (this._client === null) {
      throw new Error('Client is not connected');
    }

    if (!this._client.connected) {
      throw new Error('Client is not connected');
    }

    await this._client.publish(topic, JSON.stringify(message));
  }

  public async close(): Promise<void> {
    return;
  }
}
