const twinBcrypt = require('twin-bcrypt');
const md5 = require('md5');

module.exports = (password, hash) => {
  const pass = [];

  if (hash.indexOf('$2y$') > -1) {
    pass.push(twinBcrypt.compareSync(password, hash));
  } else if (hash.replace('$2a$', '$2y$').indexOf('$2y$') > -1) {
    pass.push(twinBcrypt.compareSync(password, hash.replace('$2a$', '$2y$')));
  } else {
    pass.push((md5(password) === hash));
  }

  return pass.includes(true);
};
