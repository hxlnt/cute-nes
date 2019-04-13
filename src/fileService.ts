const fs = require('fs');
import { Convert } from './dataModel';

export default class fileService {

  public static async createDir(path: string) {
    try {
      await fs.promises.mkdir(path, { recursive: true });
    } catch (err) {
      if (err.code !== 'EEXIST') { throw err; }
    }
  }

  public readFile(jsonFilePath: string): any {
    const jsonString: string = fs.readFileSync(jsonFilePath).toString();
    try {
      return Convert.toCuteJSON(jsonString);
    } catch {
      throw new Error(`There\'s something wrong with the JSON file.`);
    }
  }

}
