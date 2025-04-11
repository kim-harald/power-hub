import { WLogger } from 'services';
import mariadb from 'mariadb';
import config from '../config/default.json';
import { fail, Result, succeed } from 'models';


export const migrator = {
  async migrate() {
    buildDatabase();
    WLogger.info('Starting migration...');
    const queries = 
    WLogger.info('Migration completed.');
  },
};

const buildDatabase = async (): Promise<Result<boolean>> => {
  const pool = mariadb.createPool({
    host: config.mariadb.host,
    user: config.mariadb.user,
    socketPath: config.mariadb.socketpath,
  });

  const conn = await pool.getConnection();
  try {
    await conn.beginTransaction();
    await conn.query(
      'CREATE DATABASE IF NOT EXISTS ' + config.mariadb.database
    );
    await conn.commit();
    WLogger.info('Database created:', config.mariadb.database);
    conn.end();
    pool.end();
    return succeed(true);
  } catch (error) {
    await conn.rollback();
    WLogger.error('Error creating database:', error);
    return fail(error);
  }
};

const runQueries = async (queries: string[]) => {
  const pool = mariadb.createPool({
    host: config.mariadb.host,
    user: config.mariadb.user,
    socketPath: config.mariadb.socketpath,
    database: config.mariadb.database,
  });
  const conn = await pool.getConnection();

  try {
    for (const query of queries) {
      await conn.beginTransaction();
      await conn.query(query);
      await conn.commit();
      WLogger.info('Query executed successfully:', query);
    }
  } catch (error) {
    await conn.rollback();
    WLogger.error('Error executing query:', error);
  }
};

const fetchQueries = async (path:string):Promise<string[]> => {
    return [];
}
