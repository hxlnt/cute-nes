import assert = require('assert');
import fs = require('fs');
import FileService from '../src/fileService';

describe('readFile', () => {
  const testFileService = new FileService();
  const result = testFileService.readFile('test/data/test.json');
  it('should read file and return JSON object.', () => {
    assert.equal(result.project, 'demo');
    assert.equal(result.scenes[0].name, 'attractMode');
  });
  it('should fail if JSON is malformed.', () => {
    assert.throws( function() { testFileService.readFile('test/data/malformed.json') }, assert.AssertionError )
  });
});

// describe('CreateProject', () => {
//   const testJsonPath = 'test/data/test.json';
//   const testFileService = new FileService(testJsonPath);

//   describe('CreateProjectFolders', () => {
//     it('should create folders for the project', () => {
//       const jsonString: string = fs.readFileSync(testJsonPath).toString();
//       const jsonObj = JSON.parse(jsonString);
//       const projectName = jsonObj.project;
//       for (let i = 0; i < jsonObj.scenes.length; i++) {
//         try {
//           FileService.createDir(projectName + '/' + jsonObj.scenes[i].name + '/');
//         } catch (err) { 
//           console.error(err);
//         }
//       }
//     });
//     assert.equal(fs.existsSync('demo/attractMode'), true);
//     assert.equal(fs.existsSync('demo/titleScreen'), true);
//     assert.equal(fs.existsSync('demo/game'), true);
//     assert.equal(fs.existsSync('demo/pause'), true);
//     assert.equal(fs.existsSync('demo/ending'), true);
//   });
// });


// //         // const testIsFileCreated = testYamlService.CreateFile();
// //         // assert.equal(testIsFileCreated, false);
// //     });
// // });
// // describe('CreateFolders', () => {
// //     it('should create folders for each scene in .JSON', () => {
// //         //fileService.ensureDir("game");
// //         // const testIsFileCreated = testYamlService.CreateFile();
// //         // assert.equal(testIsFileCreated, false);
// //     });

// //     it('should not create a new YAML file if one already exists', () => {
// //         // const testIsFileCreated = testYamlService.CreateFile();
// //         // assert.equal(testIsFileCreated, true);
// //     });
// // });
