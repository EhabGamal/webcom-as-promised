const myWebcom = require('webcom');
const axios = require('axios');

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

enhancedPrototype.confirmEmail = function confirmEmail(token = '', options = {}) {
  const {app = null, url = null} = options;
  const appName = app || this.root().toString().split('/').slice(-1)[0];
  const confirmURL = url || `https://io.datasync.orange.com/auth/v2/${appName}/password/confirm`;
  
  return axios({
      method: 'PUT',
      url: confirmURL,
      params: { token }
    })
    .then(res => res.data)
    .catch(err => Promise.reject(err.response.data.error));
}

enhancedPrototype.resetPassword = function resetPassword(token = '', newPassword = '', options = {}) {
  const {app = null, url = null} = options;
  const appName = app || this.root().toString().split('/').slice(-1)[0];
  const resetURL = url || `https://io.datasync.orange.com/auth/v2/${appName}/password/update`;
  
  return axios({
      method: 'PUT',
      url: resetURL,
      params: { token },
      data: `newPassword=${newPassword}`,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .then(res => res.data)
    .catch(err => Promise.reject(err.response.data.error));
}

myWebcom.prototype = enhancedPrototype;
