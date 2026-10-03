import { Import } from "./entities/Import.js";

export type EntityClass = abstract new (...args: never[]) => object;

export const entities: EntityClass[] = [
    Import
];
