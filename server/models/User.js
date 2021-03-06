const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt');

const userSchema = new Schema ({
        username: {
          type: String,
          required: true,
          unique: true,
        },
        email: {
          type: String,
          required: true,
          unique: true,
          match: [/.+@.+\..+/, 'Must use a valid email address'],
        },
        password: {
          type: String,
          required: true,
        },
        savedRecipes: [
          {
            type: Schema.Types.ObjectId,
            ref: "Recipe"
          }
        ],
        bookmarked: [
          {
            type: Schema.Types.ObjectId,
            ref: "Recipe"
          }
        ],
    },
)

userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;