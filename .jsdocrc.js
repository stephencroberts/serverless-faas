module.exports = {
  plugins: [],
  recurseDepth: 10,
  source: {
    includePattern: '.+\\.js(doc|x)?$',
    excludePattern: '((^|\\/|\\\\)_|node_modules)',
  },
  sourceType: "module",
  tags: {
    allowUnknownTags: true,
    dictionaries: ['jsdoc', 'closure'],
  },
  templates: {
    cleverLinks: false,
    monospaceLinks: false,
  },
};
