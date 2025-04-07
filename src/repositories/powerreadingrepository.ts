import { IPowerReadingRepository } from "interfaces";
import { inject, injectable, named } from "inversify";
import { Pool } from "mariadb";


@injectable()
export class PowerReadingRepository implements IPowerReadingRepository {
 
    constructor(@inject('Pool') @named('Pool') private readonly pool: Pool) {
        this.pool = pool;
    }

    async getOne(id: unknown): Promise<any> {
        const conn = await this.pool.getConnection();
        try {
            const result = await conn.query("SELECT * FROM PowerReadings WHERE id = ?", [id]);
            return result[0];
        } finally {
            conn.release();
        }
    }

    async getAll(device: string): Promise<any[]> {
        const conn = await this.pool.getConnection();
        try {
            const result = await conn.query("SELECT * FROM PowerReadings WHERE device = ?", [device]);
            return result;
        } finally {
            conn.release();
        }
    }

    async getRange(device: string, daterange: { start: Date; end: Date }): Promise<any[]> {
        const conn = await this.pool.getConnection();
        try {
            const result = await conn.query("SELECT * FROM PowerReadings WHERE device = ? AND date BETWEEN ? AND ?", [device, daterange.start, daterange.end]);
            return result;
        } finally {
            conn.release();
        }
    }

    async insert(powerReading: any): Promise<any> {
        const conn = await this.pool.getConnection();
        try {
            const result = await conn.query("INSERT INTO PowerReadings SET ?", [powerReading]);
            return result;
        } finally {
            conn.release();
        }
    }

    async update(powerReading: any): Promise<any> {
        const conn = await this.pool.getConnection();
        try {
            const result = await conn.query("UPDATE PowerReadings SET ? WHERE id = ?", [powerReading, powerReading.id]);
            return result;
        } finally {
            conn.release();
        }
    }

    async delete(device: string, id: unknown): Promise<void> {
        const conn = await this.pool.getConnection();
        try {
            await conn.query("DELETE FROM PowerReadings WHERE device = ? AND id = ?", [device, id]);
        } finally {
            conn.release();
        }
    }

    async getLast(device: string, n: number): Promise<any[]> {
        const conn = await this.pool.getConnection();
        try {
            const result = await conn.query("SELECT * FROM PowerReadings WHERE device = ? ORDER BY date DESC LIMIT ?", [device, n]);
            return result;
        } finally {
            conn.release();
        }
    }

    async getLastInRange(device: string, n: number, daterange: { start: Date; end: Date }): Promise<any[]> {
        const conn = await this.pool.getConnection();
        try {
            const result = await conn.query("SELECT * FROM PowerReadings WHERE device = ? AND date BETWEEN ? AND ? ORDER BY date DESC LIMIT ?", [device, daterange.start, daterange.end, n]);
            return result;
        } finally {
            conn.release();
        }
    }
}