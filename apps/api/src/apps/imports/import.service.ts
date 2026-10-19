import { Import, ImportRepository } from '@csv/database';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ImportService {
  constructor(
    @InjectRepository(Import)
    private readonly repository: Repository<Import>,
  ) {}

  async save(data: any) {
    await this.repository.save(data);
  }
}
