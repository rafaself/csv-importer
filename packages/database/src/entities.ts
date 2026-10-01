export type EntityClass = abstract new (...args: never[]) => object;

export const entities: EntityClass[] = [];
