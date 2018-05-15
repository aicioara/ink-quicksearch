const {h, render} = require('ink');
const UI = require('import-jsx')('./UI.jsx')
render(h(UI), process.stdout);
