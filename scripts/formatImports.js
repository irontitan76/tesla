const { sync: globSync } = require('glob');
const { readFile, writeFile } = require('fs').promises;

const readFromFile = async (filePath) => {
  return readFile(filePath, 'utf-8');
};

const writeToFile = async (filePath, data) => {
  await writeFile(filePath, data, 'utf-8');
};

const parser = require('@babel/parser');
const sortImports = (code) => {
  const ast = parser.parse(code, {
    sourceType: 'module',
    plugins: ['typescript'], // Include 'typescript' plugin to handle .ts files
  });

  const importNodes = [];
  const nonImportNodes = [];

  ast.program.body.forEach((node) => {
    if (node.type === 'ImportDeclaration') {
      importNodes.push(node);
    } else {
      nonImportNodes.push(node);
    }
  });

  importNodes.sort((a, b) => {
    const A = a.source.value;
    const B = b.source.value;

    const isAGlobal = !A.startsWith('.') && !A.startsWith('..');
    const isBGlobal = !B.startsWith('.') && !B.startsWith('..');

    const isAScoped = A.startsWith('@');
    const isBScoped = B.startsWith('@');

    const depthA = (A.match(/\./g) || []).length;
    const depthB = (B.match(/\./g) || []).length;

    if (depthA && !depthB) {
      return 1;
    }

    if (depthB && !depthA) {
      return -1;
    }

    // Scoped Imports
    if (isAScoped && !isBScoped) {
      return -1;
    }
    if (isBScoped && !isAScoped) {
      return 1;
    }

    // Global imports
    if (isAGlobal && !isBGlobal) {
      return 1;
    }

    if (isBGlobal && !isAGlobal) {
      return -1;
    }

    return A.localeCompare(B);
  });

  const importCode = importNodes.map((node) => code.substring(node.start, node.end)).join('\n');
  const nonImportCode = nonImportNodes.map((node) => code.substring(node.start, node.end)).join('\n');

  return `${importCode}${importCode ? '\n\n' : ''}${nonImportCode}\n`;
};
const orderImports = async (filePath) => {
  try {
    const lines = await readFromFile(filePath);
    const sortedLines = sortImports(lines);
    await writeToFile(filePath, sortedLines);
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
  }
};
const main = async () => {
  try {
    const files = globSync('**/*.{js,ts}', { nodir: true });
    console.log(files);
    await Promise.all(files.map(file => orderImports(file)));
  } catch (error) {
    console.error(error);
  }
};
main();
