"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
class fileService {
    readFile(jsonFilePath) {
        const jsonString = fs.readFileSync(jsonFilePath).toString();
        try {
            const jsonObj = JSON.parse(jsonString);
            return jsonObj;
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