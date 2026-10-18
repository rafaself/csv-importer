import { DataSource, DeleteResult, Repository } from "typeorm";
import { Import } from "./import.entity.js";

interface IImportRepository {
  find(): Promise<Import[]>;
  findById(id: string): Promise<Import | null>;
  create(importData: Import): Promise<Import>;
  delete(id: string): Promise<DeleteResult>;
}

export class ImportRepository implements IImportRepository {
  userRepository: Repository<Import>;

  constructor(private readonly dataSource: DataSource) {
    this.userRepository = this.dataSource.getRepository(Import);
  }

  async findById(id: string) {
    return await this.userRepository.findOneBy({ id });
  }

  async find() {
    return await this.userRepository.find();
  }

  async create(importData: Import) {
    return await this.userRepository.save(importData);
  }

  async delete(id: string) {
    return await this.userRepository.delete({ id });
  }
}
