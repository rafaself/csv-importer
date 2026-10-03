import { Import } from "./entities/Import.js";
import { ImportRow } from "./entities/ImportRow.js";

export type EntityClass = abstract new (...args: never[]) => object;

export const entities: EntityClass[] = [
    Import,
    ImportRow
];
