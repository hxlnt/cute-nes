const fsPromise = require('fs').promises
const fs = require('fs');

const contents = fs.readFileSync("../../generator/cute.json");
const jsonContent = JSON.parse(contents);
console.log(jsonContent.scenes[0].name);

async function ensureDir (dirpath: string) {
  try {
    await fsPromise.mkdir(dirpath, { recursive: true })
  } catch (err) {
    if (err.code !== 'EEXIST') throw err
  }
}

async function main () {
    for (let i=0; i<jsonContent.scenes.length; i++){
        try {
            await ensureDir('../' + jsonContent.scenes[i].name + '/')
            console.log('Directory created')
          } catch (err) {
            console.error(err)
          }
    }
}

main()