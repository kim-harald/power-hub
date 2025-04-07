import { IPowerSummaryRepository } from "../interfaces";
import { inject, injectable, named } from "inversify";
import { Pool } from "mariadb";
import { WLogger } from "services";

@injectable()
export class PowerSummaryRepository implements IPowerSummaryRepository {

    constructor(
        @inject('Pool') @named('Pool') private readonly pool: Pool
    )

    {
        WLogger.info("PowerSummaryRepository initialized");
    }

    async getOne(id: unknown): Promise<any> {
        const conn = await this.pool.getConnection();
        try {
            const result = await conn.query("SELECT * FROM power_summary WHERE id = ?", [id]);
            return result[0];
        } finally {
            conn.release();
        }
    }

    async getRange(device: string, daterange: { start: Date; end: Date }): Promise<any[]> {
        const conn = await this.pool.getConnection();
        try {
            const result = await conn.query("SELECT * FROM power_summary WHERE device = ? AND date BETWEEN ? AND ?", [device, daterange.start, daterange.end]);
            return result;
        } finally {
            conn.release();
        }
    }

    async getLast(device: string, n: number): Promise<any[]> {
        const conn = await this.pool.getConnection();
        try {
            const result = await conn.query("SELECT * FROM power_summary WHERE device = ? ORDER BY date DESC LIMIT ?", [device, n]);
            return result;
        } finally {
            conn.release();
        }
    }

    async getLastInRange(device: string, n: number, daterange: { start: Date; end: Date }): Promise<any[]> {
        const conn = await this.pool.getConnection();
        try {
            const result = await conn.query("SELECT * FROM power_summary WHERE device = ? AND date BETWEEN ? AND ? ORDER BY date DESC LIMIT ?", [device, daterange.start, daterange.end, n]);
            return result;
        } finally {
            conn.release();
        }
    }

    async insert(powerSummary: any): Promise<any> {
        const conn = await this.pool.getConnection();
        try {
            const result = await conn.query("INSERT INTO power_summary SET ?", [powerSummary]);
            return result;
        } finally {
            conn.release();
        }
    }

    async update(powerSummary: any): Promise<any> {
        const conn = await this.pool.getConnection();
        try {
            const result = await conn.query("UPDATE power_summary SET ? WHERE id = ?", [powerSummary, powerSummary.id]);
            return result;
        } finally {
            conn.release();
        }
    }

    async delete(id: unknown): Promise<void> {
        const conn = await this.pool.getConnection();
        try {
            await conn.query("DELETE FROM power_summary WHERE device = ? AND id = ?", [id]);
        } finally {
            conn.release();
        }
    }
}
