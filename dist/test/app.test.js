"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const fileService_1 = require("../src/fileService");
describe('CreateProject', () => {
    const testJsonPath = 'test/data/test.json';
    const testFileService = new fileService_1.default(testJsonPath);
    describe('CreateProjectFolders', () => {
        it('should create folders for the project', () => {
            const jsonString = fs.readFileSync(testJsonPath).toString();
            const jsonObj = JSON.parse(jsonString);
            const projectName = jsonObj.project;
            for (let i = 0; i < jsonObj.scenes.length; i++) {
                try {
                    fileService_1.default.createDir(projectName + '/' + jsonObj.scenes[i].name + '/');
                }
                catch (err) {
                    console.error(err);
                }
            }
        });
    });
});
//         // const testIsFileCreated = testYamlService.CreateFile();
//         // assert.equal(testIsFileCreated, false);
//     });
// });
// describe('CreateFolders', () => {
//     it('should create folders for each scene in .JSON', () => {
//         //fileService.ensureDir("game");
//         // const testIsFileCreated = testYamlService.CreateFile();
//         // assert.equal(testIsFileCreated, false);
//     });
//     it('should not create a new YAML file if one already exists', () => {
//         // const testIsFileCreated = testYamlService.CreateFile();
//         // assert.equal(testIsFileCreated, true);
//     });
// });
//# sourceMappingURL=app.test.js.map