import { Import } from "./entities/import.entity.js";
import { ImportRow } from "./entities/import-row.entity.js";
import { User } from "./entities/user.entity.js";

export type EntityClass = abstract new (...args: never[]) => object;

export const entities: EntityClass[] = [Import, ImportRow, User];
