import 'regenerator-runtime/runtime';
const fs = require('fs').promises

export async function getSiteMetaData() {
  const siteData = await fs.readFile('_site/_jest.json', 'utf8');

  return JSON.parse(siteData);
}

export const printOnFail = (message, fn) => {
  try {
    fn();
  } catch (e) {
    e.message = `${message}\n\n${e.message}`;
    throw e;
  }
};
