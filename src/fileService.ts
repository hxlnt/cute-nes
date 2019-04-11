const fs = require('fs');

export default class fileService {
  public readFile(jsonFilePath: string): any {
    const jsonString: string = fs.readFileSync(jsonFilePath).toString();
    try {
      const jsonObj: cuteJson = JSON.parse(jsonString);
      return jsonObj;
    }
    catch (err) {
      throw new Error(`There\'s something wrong with the JSON file. Exited: ${err}`);
    }
  }

}

export interface cuteJson {
  project: string,
  scenes: [cuteScenes]
}

export interface cuteScenes {
  name: string
}

// export default class fileService {

//   private jsonPath: string;
//   constructor(jsonPath: string) {
//     this.jsonPath = jsonPath;
//   }

//   public static async createDir(path: string) {

//     try {
//       await fs.promises.mkdir(path, { recursive: true })
//     } catch (err) {
//       if (err.code !== 'EEXIST') throw err
//     }

//   }


// }