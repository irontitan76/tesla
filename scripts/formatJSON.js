const { sync: globSync } = require('glob');
const { readJSON, writeJSON } = require('fs-extra');
const { isArray, isPlainObject, toPairs, fromPairs, mapValues } = require('lodash');
const alphabetizeObject = (obj) => {
  if (isArray(obj)) {
    return obj.map(alphabetizeObject);
  } else if (isPlainObject(obj)) {
    return mapValues(
      fromPairs(toPairs(obj).sort(([keyA], [keyB]) => keyA.localeCompare(keyB))),
      alphabetizeObject
    );
  }
  return obj;
};
const orderJSONFile = async (file) => {
  try {
    const data = await readJSON(file);
    const sortedData = alphabetizeObject(data);

    const {
      dependencies,
      devDependencies,
      exports,
      main,
      name,
      peerDependencies,
      scripts,
      types,
      version,
      ...rest
    } = sortedData;

    const prioritized = {
      name,
      version,
      exports,
      main,
      types,
      scripts,
      dependencies,
      devDependencies,
      peerDependencies,
      ...rest,
    };

    await writeJSON(file, prioritized, { spaces: 2 });
    console.log(`Alphabetized ${file}`);
  } catch (error) {
    console.error(`Error processing ${file}:`, error);
  }
};
const formatManifests = async (pattern) => {
  try {
    const files = globSync(pattern, { nodir: true });
    await Promise.all(files.map(file => orderJSONFile(file)));

    console.log('Finished alphabetizing JSON files');
  } catch (error) {
    console.error('Error:', error);
  }
};
formatManifests('**/*.json');
