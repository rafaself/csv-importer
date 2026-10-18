import { Check, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@Check(`
  NULLIF(BTRIM("fullName"), '') IS NOT NULL OR
  NULLIF(BTRIM("email"), '') IS NOT NULL OR
  NULLIF(BTRIM("company"), '') IS NOT NULL
`)
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 128 })
  fullName: string;

  @Column({ type: "varchar", length: 256 })
  email: string;

  @Column({ type: "varchar", nullable: true, length: 128 })
  company?: string;
}
