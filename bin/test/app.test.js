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
const assert = require("assert");
const fs = require("fs");
const fileService_1 = require("../fileService");
const testFileService = new fileService_1.default();
const result = testFileService.readFile('bin/test/data/test.json');
const projectName = result.project;
describe('readFile', () => {
    it('should read file and return JSON object.', () => {
        assert.equal(result.project, 'demo');
        assert.equal(result.scenes[0].name, 'attractMode');
    });
    it('should fail if JSON is malformed.', () => {
        assert.throws(() => { testFileService.readFile('bin/test/data/malformed.json'); }, Error);
    });
});
describe('CreateProjectFolders', () => {
    it('should create folders for the project', () => __awaiter(this, void 0, void 0, function* () {
        for (const scene of result.scenes) {
            yield fileService_1.default.createDir(projectName + '/' + scene.name + '/');
        }
        assert.equal(fs.existsSync('demo/attractMode'), true);
        assert.equal(fs.existsSync('demo/titleScreen'), true);
        assert.equal(fs.existsSync('demo/game'), true);
        assert.equal(fs.existsSync('demo/pause'), true);
        assert.equal(fs.existsSync('demo/ending'), true);
    }));
    it('should not throw an error if folders already exist', () => {
        assert.doesNotThrow(() => (fileService_1.default.createDir(projectName + '/' + result.scenes[0].name + '/'), Error));
        assert.equal(fs.existsSync('demo/attractMode'), true);
    });
});
