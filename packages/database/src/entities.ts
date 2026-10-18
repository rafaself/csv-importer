import { Import } from "./import/import.entity.js";
import { ImportRow } from "./entities/import-row.entity.js";
import { User } from "./user/user.entity.js";

export type EntityClass = abstract new (...args: never[]) => object;

export const entities: EntityClass[] = [Import, ImportRow, User];
