import {
  IDeviceRepository,
  IPowerSummaryRepository,
  IPowerSummaryService,
} from '../interfaces';
import { inject, injectable } from 'inversify';
import { WLogger } from './loggerservice';
import {
  DateRange,
  PowerReading,
  PowerSummary,
  succeed,
  fail,
  Result,
  Device,
} from '../models';

@injectable()
export class PowerSummaryService implements IPowerSummaryService {
  constructor(
    @inject('PowerSummaryRepository')
    private readonly powerSummaryRepository: IPowerSummaryRepository,
    @inject('DeviceRepository')
    private readonly deviceRepository: IDeviceRepository
  ) {
    WLogger.info('PowerSummaryService initialized');
  }

  async create(powerSummary: PowerSummary): Promise<Result<void>> {
    try {
      powerSummary.device = await this.deviceRepository.getOne(powerSummary.device.id);
      await this.powerSummaryRepository.create(powerSummary);
      return succeed(void 0);
    } catch (error) {
      WLogger.error('Error creating power summary:', error);
      return fail(error);
    }
  }

  async getRange(
    deviceName: string,
    daterange: DateRange
  ): Promise<Result<PowerSummary[]>> {
    try {
      const devices = await this.deviceRepository.getAll();
      const device = devices.find((d) => d.name === deviceName);
      if (!device) {
        WLogger.error(`Device ${deviceName} not found`);
        return fail(new Error(`Device ${deviceName} not found`));
      }

      const summaries = await this.powerSummaryRepository.getRange(
        device.id,
        daterange
      );
      return succeed(summaries);
    } catch (error) {
      WLogger.error('Error retrieving power summaries:', error);
      return fail(error);
    }
  }

  async update(id: unknown, summary: PowerSummary): Promise<Result<void>> {
    try {
      await this.powerSummaryRepository.update(summary);
      return succeed(void 0);
    } catch (error) {
      WLogger.error('Error updating power summary:', error);
      return fail(error);
    }
  }

  async delete(id: unknown): Promise<Result<void>> {
    try {
      await this.powerSummaryRepository.delete(id);
      return succeed(void 0);
    } catch (error) {
      WLogger.error('Error deleting power summary:', error);
      return fail(error);
    }
  }

  async getOne(id: unknown): Promise<Result<PowerSummary>> {
    try {
      const summary = await this.powerSummaryRepository.getOne(id);
      return succeed(summary);
    } catch (error) {
      WLogger.error('Error retrieving power summary:', error);
      return fail(error);
    }
  }
}
