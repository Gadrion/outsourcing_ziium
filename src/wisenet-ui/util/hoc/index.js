// // imports all file except index.js
const req = require.context('.', true, /^(?!.\/index)/);

req.keys().forEach(key => {
  const regex = /^.+\/(.*?).jsx$/;
  const matchName = key.match(regex);
  const fileName = regex.test(key) && matchName[matchName.length - 1];

  if (fileName) {
    module.exports[fileName] = req(key).default;
  }
});
