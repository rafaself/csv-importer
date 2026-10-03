import {
  Check,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
} from "typeorm";
import { Import } from "./Import.js";

enum ImportRowStatus {
  VALID = "valid",
  INVALID = "invalid",
  PENDING = "pending",
}

@Entity("import_rows")
@Check(`"rowNumber" >= 0`)
export class ImportRow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Import, (importEntity) => importEntity.rows, {
    onDelete: "CASCADE",
  })
  import: Relation<Import>;

  @Column({
    type: "enum",
    enum: ImportRowStatus,
    default: ImportRowStatus.PENDING,
  })
  status: ImportRowStatus;

  @Column()
  rowNumber: number;

  @Column({ type: "jsonb" })
  rawValue: { name: string; email: string; company: string };
}
