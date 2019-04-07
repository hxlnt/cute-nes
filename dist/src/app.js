"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const fsPromise = require('fs').promises;
const fs = require('fs');
const contents = fs.readFileSync("../../generator/cute.json");
const jsonContent = JSON.parse(contents);
console.log(jsonContent.scenes[0].name);
const projectName = jsonContent.scenes.project;
function ensureDir(dirpath) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield fsPromise.mkdir(dirpath, { recursive: true });
        }
        catch (err) {
            if (err.code !== 'EEXIST')
                throw err;
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < jsonContent.scenes.length; i++) {
            try {
                yield ensureDir('../' + projectName + '/' + jsonContent.scenes[i].name + '/');
                console.log('Directory created');
            }
            catch (err) {
                console.error(err);
            }
        }
    });
}
main();
//# sourceMappingURL=app.js.map