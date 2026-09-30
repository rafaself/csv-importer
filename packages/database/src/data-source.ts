import "reflect-metadata";
import { DataSource } from "typeorm";
import { getDatabaseOptions } from "./database-options.js";

const dataSource = new DataSource(getDatabaseOptions());

export { dataSource };
export default dataSource;