const path = require('path');
const fs = require('fs');

const writeIndexFile = async (filename, content) => {
    try{
        const rootPath = '../build';
        const outputPath = path.join(__dirname, `${rootPath}/${filename}`);

        const doesPathExists = true;
        if (fs.existsSync(path.join(__dirname, rootPath))) {
            console.log("Directory already exists. deleting...");
            fs.rmSync(path.join(__dirname, rootPath),  { recursive: true, force: true });
        }

        console.log("Creating new build folder...");
        fs.mkdirSync(path.join(__dirname, rootPath), { recursive: true });
        console.log("Writing file content..");
        fs.writeFileSync(outputPath, content.replace(/(?:\r\n|\r|\n)/g, '\\n'));
    }catch(err){
        console.log(`Error writing file: ${err}`);
    }
};

module.exports = {writeIndexFile}