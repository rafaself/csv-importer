import { DataSource, DeleteResult, Repository } from "typeorm";
import { Import } from "./import.entity.js";

interface ImportRepositoryPort {
  findAll(): Promise<Import[]>;
  findById(id: string): Promise<Import | null>;
  create(importData: Import): Promise<Import>;
  delete(id: string): Promise<DeleteResult>;
}

export class ImportRepository implements ImportRepositoryPort {
  private readonly repository: Repository<Import>;

  constructor(private readonly dataSource: DataSource) {
    this.repository = this.dataSource.getRepository(Import);
  }

  async findById(id: string) {
    return await this.repository.findOneBy({ id });
  }

  async findAll() {
    return await this.repository.find();
  }

  async create(importData: Import) {
    return await this.repository.save(importData);
  }

  async delete(id: string) {
    return await this.repository.delete({ id });
  }
}
