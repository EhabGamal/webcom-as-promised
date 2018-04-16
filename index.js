const myWebcom = require('webcom');

module.exports = myWebcom;

function promisifyWebcomStyleCallback(tobePromisified) {
  return function tbPromisified(...args) {
    return new Promise((resolve, reject) => {
      tobePromisified.call(this, ...args, (error, other) => {
        if (error) { reject(error); } else { resolve(other); }
      });
    });
  };
}

const enhancedPrototype = Object.create(myWebcom.prototype);

[
  'sendPasswordResetEmail',
  'logout',
  'push',
  'remove',
  'resume',
  'set',
  'update'
].forEach((element) => {
  const postfix = 'Async';
  enhancedPrototype[element + postfix] = promisifyWebcomStyleCallback(enhancedPrototype[element]);
});

enhancedPrototype.valueAsync = function valueAsync() {
  return new Promise((resolve, reject) => {
    this.once('value', resolve, reject);
  });
};

enhancedPrototype.path = function navigateFromRoot() {
  return this.toString();
};

enhancedPrototype.getPathFromRoot = function getPathFromRoot() {
  return this.toString().replace(this.root().toString(), '');
};

enhancedPrototype.navigateFromRoot = function navigateFromRoot(StringToNavigate = '') {
  return this.root().child(StringToNavigate);
};

myWebcom.prototype = enhancedPrototype;
