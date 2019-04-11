"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const dataModel_1 = require("./dataModel");
class fileService {
    readFile(jsonFilePath) {
        const jsonString = fs.readFileSync(jsonFilePath).toString();
        try {
            const cuteJSON = dataModel_1.Convert.toCuteJSON(jsonString);
            return cuteJSON;
        }
        catch (err) {
            throw new Error(`There\'s something wrong with the JSON file. Exited: ${err}`);
        }
    }
}
exports.default = fileService;
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
//# sourceMappingURL=fileService.js.map