import { IClientOptions } from "async-mqtt";
import { IMqttService, IPowerReadingRepository, IPowerSummaryRepository } from "./interfaces";
import { Container } from "inversify";
import { MqttService } from "./services";
import config from "./config/default.json";
import { PowerReadingRepository, PowerSummaryRepository } from "./repositories";

export const RegisteredServices = async () => {

    const container = new Container();
    container.bind("Pool").toDynamicValue(() => {
        const Pool = require('mariadb');
        return Pool.createPool({
            host: config.mariadb.host,
            user: config.mariadb.user,
            database: config.mariadb.database,
            socketPath: config.mariadb.socketpath,
        });
    }).inSingletonScope();

    container.bind<IClientOptions>('IClientOptions').toConstantValue(config.mqtt).whenTargetNamed('clientOptions');
    container.bind<IMqttService>('IMqttService').to(MqttService);

    container.bind<IPowerReadingRepository>('IPowerReadingRepository').to(PowerReadingRepository);
    container.bind<IPowerSummaryRepository>('IPowerSummaryRepository').to(PowerSummaryRepository);
    
}
