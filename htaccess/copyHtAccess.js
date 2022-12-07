const fs = require('fs-extra');

const htAccessPath = './build/.htaccess';

if (fs.existsSync(htAccessPath)) {
  fs.unlinkSync(htAccessPath);
}

fs.copySync('./htaccess/.htaccess', htAccessPath);
