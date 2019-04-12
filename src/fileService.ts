const fs = require('fs');
import { Convert } from "./dataModel"

export default class fileService {

  public static async createDir(path: string) {
    try {
      await fs.promises.mkdir(path, { recursive: true })
    } catch (err) {
      if (err.code !== 'EEXIST') { throw err; }
    }
  }

  public readFile(jsonFilePath: string): any {
    const jsonString: string = fs.readFileSync(jsonFilePath).toString();
    try {
      const cuteJSON = Convert.toCuteJSON(jsonString);
      return cuteJSON;
    }
    catch {
      throw new Error(`There\'s something wrong with the JSON file.`);
    }
  }

}











// export default class fileService {

//   private jsonPath: string;
//   constructor(jsonPath: string) {
//     this.jsonPath = jsonPath;
//   }

//   public static async createDir(path: string) {

//     try {
//       await fs.promises.mkdir(path, { recursive: true })
//     } catch (err) {
//       if (err.code !== 'EEXIST') throw err
//     }

//   }


// }