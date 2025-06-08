const path = require('path');

module.exports = {
  '{apps,libs,tools}/**/*.{ts,tsx}': (files) => {
    const relativeFiles = files.map((f) => path.relative(process.cwd(), f));
    return `nx affected --target=typecheck --files=${relativeFiles.join(',')}`;
  },
  '{apps,libs,tools}/**/*.{js,ts,jsx,tsx,json}': (files) => {
    const relativeFiles = files.map((f) => path.relative(process.cwd(), f));
    return [
      `nx affected:lint --fix --files=${relativeFiles.join(',')}`,
      `nx format:write --files=${relativeFiles.join(',')}`,
    ];
  },
};
