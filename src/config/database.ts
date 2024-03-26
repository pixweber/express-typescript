import { DataSource } from "typeorm";

const dataSource: DataSource = new DataSource(
  {
    type: 'mysql',
    host: 'localhost',
    port: 3308,
    username: 'root',
    password: 'mysql',
    database: 'express_typescript',
    entities: [__dirname + '/../models/*.ts'],
    migrations: [__dirname + '/../migrations/*.ts'],
    synchronize: true,
  }
);

export default dataSource;
