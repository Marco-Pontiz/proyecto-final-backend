const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const { Schema } = mongoose;

const userSchema = new Schema({
    nombre: String,
    numero: String,
    email: String,
    password: String,
});

userSchema.methods.encryptPassword = () => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};

userSchema.methods.comparePassword = function (password) {
    bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('usuario', userSchema);