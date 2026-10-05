import { Injectable } from '@nestjs/common';

@Injectable()
export class ImportService {
  uploadFile() {
    console.log('The file is being uploaded...');
  }
}
