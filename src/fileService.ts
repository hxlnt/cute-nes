const fs = require('fs');

export default class fileService {
  
  private jsonPath: string;
  constructor(jsonPath: string) {
    this.jsonPath = jsonPath;
  }

  public static async createDir(path: string) {

    try {
      await fs.promises.mkdir(path, { recursive: true })
    } catch (err) {
      if (err.code !== 'EEXIST') throw err
    }

  }

  public async mainbla(): Promise<any> {
    const contents: string = fs.readFileSync("../../generator/cute.json");
    const jsonContent = JSON.parse(contents);
    const projectName = jsonContent.scenes.project;
    for (let i = 0; i < jsonContent.scenes.length; i++) {
      try {
        await fileService.createDir('../' + projectName + '/' + jsonContent.scenes[i].name + '/')
        console.log('Directory created');
      } catch (err) {
        console.error(err)
      }
    }

  }

}