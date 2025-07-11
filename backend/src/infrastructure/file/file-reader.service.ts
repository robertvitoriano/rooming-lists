import { Injectable } from "@nestjs/common";
import { readFileSync } from "fs";
import { resolve } from "path";

@Injectable()
export class FileReaderService {
  readJson<K>(path: string): K {
    return JSON.parse(readFileSync(resolve(__dirname, '..', '..', path), 'utf-8'));
  }
}
