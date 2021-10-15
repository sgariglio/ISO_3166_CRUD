import { Md5 } from 'ts-md5';

export class EncryptTools {
  static encrypt(text: string): any {
    const md5 = new Md5();
    return md5.appendStr(text).end();
  }
}
