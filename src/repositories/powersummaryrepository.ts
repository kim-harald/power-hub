import { IPowerSummaryRepository } from '../interfaces';
import { inject, injectable, named } from 'inversify';
import { Pool, PoolConnection } from 'mariadb';
import {
  PowerSummary,
  AggregationTypeString,
  AggregationType,
  AggregationTypeMap,
  AggregationTypeStrings,
  AggregationTypeKeys,
} from '../models';
import { WLogger } from '../services';

@injectable()
export class PowerSummaryRepository implements IPowerSummaryRepository {
  private readonly _powerFields: string[] = [
    'voltage',
    'current',
    'power',
    'powerfactor',
    'energy',
  ];

  constructor(@inject('Pool') @named('Pool') private readonly pool: Pool) {
    WLogger.info('PowerSummaryRepository initialized');
  }

  async getOne(id: unknown): Promise<any> {
    const conn = await this.pool.getConnection();
    try {
      const result = await conn.query(
        'SELECT * FROM PowerSummaries WHERE id = ?',
        [id]
      );
      return result[0];
    } finally {
      conn.release();
    }
  }

  async getRange(
    deviceId: number,
    daterange: { start: Date; end: Date }
  ): Promise<any[]> {
    const conn = await this.pool.getConnection();
    try {
      const result = await conn.query(
        'SELECT * FROM PowerSummaries WHERE deviceId = ? AND ts BETWEEN ? AND ?',
        [deviceId, daterange.start, daterange.end]
      );
      return result;
    } finally {
      conn.release();
    }
  }

  async getLast(deviceId: number, n: number): Promise<any[]> {
    const conn = await this.pool.getConnection();
    try {
      const result = await conn.query(
        'SELECT * FROM PowerSummaries WHERE deviceId = ? ORDER BY ts DESC LIMIT ?',
        [deviceId, n]
      );
      return result;
    } finally {
      conn.release();
    }
  }

  async getLastInRange(
    deviceId: number,
    n: number,
    daterange: { start: Date; end: Date }
  ): Promise<PowerSummary[]> {
    const conn = await this.pool.getConnection();
    try {
      const result = await conn.query(
        'SELECT * FROM PowerSummaries WHERE deviceId = ? AND date BETWEEN ? AND ? ORDER BY date DESC LIMIT ?',
        [deviceId, daterange.start, daterange.end, n]
      );

      return result;
    } finally {
      conn.release();
    }
  }

  async create(powerSummary: PowerSummary): Promise<PowerSummary> {
    const conn = await this.pool.getConnection();
    try {
      const result = await conn.query(
        'INSERT INTO PowerSummary(ts,Period,DeviceId) VALUES (?,?,?)',
        [powerSummary.ts, powerSummary.period, powerSummary.device]
      );

      powerSummary.id = result.insertId;
      await this.insertPowerSummaryValues(powerSummary, conn);

      return powerSummary;
    } finally {
      conn.release();
    }
  }

  async update(powerSummary: PowerSummary): Promise<PowerSummary> {
    const conn = await this.pool.getConnection();
    try {
      const result = await conn.query(
        'UPDATE PowerSummaries SET ? WHERE id = ?',
        [powerSummary, powerSummary.id]
      );
      return result;
    } finally {
      conn.release();
    }
  }

  async delete(id: unknown): Promise<void> {
    const conn = await this.pool.getConnection();
    try {
      await conn.query('DELETE FROM PowerSummaries WHERE id = ?', [id]);
    } finally {
      conn.release();
    }
  }

  private async insertPowerSummaryValues(
    powerSummary: PowerSummary,
    conn: PoolConnection
  ): Promise<void> {
    for (const aggregationType of AggregationTypeStrings) {
      for (const field of this._powerFields) {
        const data = (powerSummary as any)[aggregationType][field];
        const fieldId = this._powerFields.indexOf(field) + 1;
        await conn.query(
          'INSERT PowerSummaryValues(PowerSummaryId,NameId,FieldId,Value) VALUES (?,?,?,?)',
          [powerSummary.id, AggregationTypeKeys[aggregationType], fieldId, data]
        );
      }
    }
  }

  private async getPowerSummaryValues(
    powerSummary: PowerSummary,
    conn: PoolConnection
  ): Promise<PowerSummary> {
    const result = powerSummary as any;
    const rows = await conn.query(
      'SELECT PowerSummaryId,NameId,FieldId,Value FROM PowerSummaryValues WHERE PowerSummaryId = ?',
      [powerSummary.id]
    );
    for (const row of rows) {
      const aggregationType = AggregationTypeStrings[row.nameId];
      if (aggregationType) {
        result[aggregationType] = {
          ...result[aggregationType],
          [row.NameId]: row.Value,
        };
      }
    }
    return powerSummary;
  }
}
