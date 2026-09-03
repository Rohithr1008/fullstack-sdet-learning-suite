const fs = require('fs');
const path = require('path');

const basePath = 'C:\\Users\\rohit\\Documents\\learning-projects';

function getMdFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory() && file !== 'node_modules' && file !== '.git') {
      results = results.concat(getMdFiles(filePath));
    } else if (file.endsWith('.md')) {
      results.push(filePath);
    }
  });
  return results;
}

const mdFiles = getMdFiles(basePath);
let cleanedCount = 0;

mdFiles.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('<style>')) {
    // Remove inline <style>...</style> blocks
    content = content.replace(/<style>[\s\S]*?<\/style>/gi, '');
    fs.writeFileSync(file, content, 'utf8');
    cleanedCount++;
    console.log(`Cleaned style block from: ${path.relative(basePath, file)}`);
  }
});

console.log(`Total Markdown files cleaned: ${cleanedCount}`);
