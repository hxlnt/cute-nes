import assert = require('assert');
import fs = require('fs');
import FileService from '../src/fileService';

describe('CreateProject', () => {
  const testJsonPath = 'test/data/test.json';
  const testFileService = new FileService(testJsonPath);

  describe('CreateProjectFolders', () => {
    it('should create folders for the project', () => {
      const jsonString: string = fs.readFileSync(testJsonPath).toString();
      const jsonObj = JSON.parse(jsonString);
      const projectName = jsonObj.project;
      for (let i = 0; i < jsonObj.scenes.length; i++) {
        try {
          FileService.createDir(projectName + '/' + jsonObj.scenes[i].name + '/');
        } catch (err) { 
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
