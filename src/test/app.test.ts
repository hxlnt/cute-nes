import assert = require('assert');
import fs = require('fs');
import FileService from '../fileService';

const testFileService = new FileService();
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
  it('should create folders for the project', async () => {
    for (const scene of result.scenes) {
      await FileService.createDir('projects/' + projectName + '/' + scene.name + '/');
    }
    assert.equal(fs.existsSync('projects/demo/attractMode'), true);
    assert.equal(fs.existsSync('projects/demo/titleScreen'), true);
    assert.equal(fs.existsSync('projects/demo/game'), true);
    assert.equal(fs.existsSync('projects/demo/pause'), true);
    assert.equal(fs.existsSync('projects/demo/ending'), true);
  });
  it('should not throw an error if folders already exist', () => {
    assert.doesNotThrow(() => (FileService.createDir(projectName + '/' + result.scenes[0].name + '/'), Error));
    assert.equal(fs.existsSync('projects/demo/attractMode'), true);
  });
});

