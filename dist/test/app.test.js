"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const fs = require("fs");
const fileService_1 = require("../src/fileService");
const testFileService = new fileService_1.default();
const result = testFileService.readFile('test/data/test.json');
describe('readFile', () => {
    it('should read file and return JSON object.', () => {
        assert.equal(result.project, 'demo');
        assert.equal(result.scenes[0].name, 'attractMode');
    });
    it('should fail if JSON is malformed.', () => {
        assert.throws(() => { testFileService.readFile('test/data/malformed.json'); }, Error);
    });
});
describe('CreateProjectFolders', () => {
    it('should create folders for the project', () => {
        const projectName = result.project;
        for (let scene of result.scenes) {
            try {
                fileService_1.default.createDir(projectName + '/' + scene.name + '/');
            }
            catch (err) {
                console.error(err);
            }
        }
        assert.equal(fs.existsSync('demo/attractMode'), true);
        assert.equal(fs.existsSync('demo/titleScreen'), true);
        assert.equal(fs.existsSync('demo/game'), true);
        assert.equal(fs.existsSync('demo/pause'), true);
        assert.equal(fs.existsSync('demo/ending'), true);
    });
    it('should not throw an error if folders already exist', () => {
        const projectName = result.project;
        assert.doesNotThrow(() => (fileService_1.default.createDir(projectName + '/' + result.scenes[0].name + '/'), Error));
        assert.equal(fs.existsSync('demo/attractMode'), true);
    });
});
//# sourceMappingURL=app.test.js.map