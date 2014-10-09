var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;


var UserSchema   = new Schema({
  username:       { type: String, default: '' },
  firstName:      { type: String, default: '' },
  lastName:       { type: String, default: '' },
  email:          { type: String, default: '' }
});

module.exports = mongoose.model('User', UserSchema);
