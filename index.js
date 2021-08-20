import path from 'path';
import fs from 'fs';

// const root = path.resolve('/', 'media', 'titenq', 'backup', 'dev');
const root = path.resolve('/');
// const __dirname = path.resolve();
// const getUserRootFolder = () => process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE;

const deleteNodeModules = rootPath => {
  try {
    const foldersAndFiles = fs.readdirSync(path.resolve(rootPath));
    
    let folders = foldersAndFiles.filter(folder =>
      fs.lstatSync(path.resolve(rootPath, folder)).isDirectory());
    
    folders.map(folder => {
      const nodeModulesPath = path.resolve(rootPath, 'node_modules');
      const nodeModulesExist = fs.existsSync(nodeModulesPath);
      
      if (nodeModulesExist) {
        fs.rmdirSync(nodeModulesPath, { recursive: true });

        folders = folders.filter(folder => folder !== 'node_modules');

        console.log('node_modules deleted')
      } else {
        deleteNodeModules(path.resolve(rootPath, folder));
      }
  });
  } catch (error) {
    console.log('Please wait...');
  }
};

deleteNodeModules(root);
