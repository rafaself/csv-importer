import {
  Check,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Relation,
  Unique,
} from "typeorm";
import { Import } from "./import.entity.js";

enum ImportRowStatus {
  VALID = "valid",
  INVALID = "invalid",
  PENDING = "pending",
}

type ImportRowIssue = {
  field: string;
  message: string;
};

@Entity("import_rows")
@Unique("UQ_IMPORT_ROWS_IMPORT_ID_ROW_NUMBER", ["import", "rowNumber"])
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
  rawValue: any;

  @Column({ type: "jsonb", default: () => "'[]'::jsonb" })
  issues: ImportRowIssue[];
}
