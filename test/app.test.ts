import assert = require('assert');
import fs = require('fs');
import FileService from '../src/fileService';

const testFileService = new FileService();
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
    console.log(projectName);
      for (let i = 0; i < result.scenes.length; i++) {
        try {
          FileService.createDir(projectName + '/' + result.scenes[i].name + '/');
        } catch (err) {
          console.error(err);
        }
      }
    assert.equal(fs.existsSync('demo/attractMode'), true);
    assert.equal(fs.existsSync('demo/titleScreen'), true);
    assert.equal(fs.existsSync('demo/game'), true);
    assert.equal(fs.existsSync('demo/pause'), true);
    assert.equal(fs.existsSync('demo/ending'), true);
  });
});