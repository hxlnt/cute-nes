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
class fileService {
    constructor(jsonPath) {
        this.jsonPath = jsonPath;
    }
    static createDir(path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fs.promises.mkdir(path, { recursive: true });
            }
            catch (err) {
                if (err.code !== 'EEXIST')
                    throw err;
            }
        });
    }
    mainbla() {
        return __awaiter(this, void 0, void 0, function* () {
            const contents = fs.readFileSync("../../generator/cute.json");
            const jsonContent = JSON.parse(contents);
            const projectName = jsonContent.scenes.project;
            for (let i = 0; i < jsonContent.scenes.length; i++) {
                try {
                    yield fileService.createDir('../' + projectName + '/' + jsonContent.scenes[i].name + '/');
                    console.log('Directory created');
                }
                catch (err) {
                    console.error(err);
                }
            }
        });
    }
}
exports.default = fileService;
//# sourceMappingURL=fileService.js.map