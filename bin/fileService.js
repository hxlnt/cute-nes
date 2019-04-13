"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const dataModel_1 = require("./dataModel");
class fileService {
    static createDir(path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fs.promises.mkdir(path, { recursive: true });
            }
            catch (err) {
                if (err.code !== 'EEXIST') {
                    throw err;
                }
            }
        });
    }
    readFile(jsonFilePath) {
        const jsonString = fs.readFileSync(jsonFilePath).toString();
        try {
            return dataModel_1.Convert.toCuteJSON(jsonString);
        }
        catch (_a) {
            throw new Error(`There\'s something wrong with the JSON file.`);
        }
    }
}
exports.default = fileService;
