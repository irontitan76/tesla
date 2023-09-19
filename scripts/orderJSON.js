const { sync: globSync } = require('glob');
const { readJSON, writeJSON } = require('fs-extra');
const { isArray, isPlainObject, toPairs, fromPairs, mapValues } = require('lodash');

function alphabetizeObject(obj) {
  if (isArray(obj)) {
    return obj.map(alphabetizeObject);
  } else if (isPlainObject(obj)) {
    return mapValues(
      fromPairs(toPairs(obj).sort(([keyA], [keyB]) => keyA.localeCompare(keyB))),
      alphabetizeObject
    );
  }
  return obj;
}

async function alphabetizeJSONFiles(pattern) {
  try {
    const files = globSync(pattern, { nodir: true });

    await Promise.all(files.map(async (file) => {
      try {
        const data = await readJSON(file);
        const sortedData = alphabetizeObject(data);
        await writeJSON(file, sortedData, { spaces: 2 });
        console.log(`Alphabetized ${file}`);
      } catch (error) {
        console.error(`Error processing ${file}:`, error);
      }
    }));

    console.log('Finished alphabetizing JSON files');
  } catch (error) {
    console.error('Error:', error);
  }
}

// Customize the pattern as needed to match the JSON files in your repo
alphabetizeJSONFiles('**/*.json');
