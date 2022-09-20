const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const { SALT_ROUNDS } = process.env;

const UserSchema = new mongoose.Schema(
  {
    avatar: {
      type: String,
      default:
        'https://res.cloudinary.com/dz4ppbu2t/image/upload/v1663600664/Users_avatar/default_user_avatar.jpg',
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    birthday: {
      type: Date,
      required: true,
    },
    appointments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Appointment',
      },
    ],
    isActive: {
      type: Boolean,
      default: false,
    },
    passwordResetActivationToken: String,
    passwordResetActivationExpires: Date,
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function save(next) {
  const user = this;

  try {
    if (!user.isModified('password')) {
      next();
    }
    const salt = await bcrypt.genSalt(Number(SALT_ROUNDS));
    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;
  } catch (e) {
    next(e);
  }
});

UserSchema.virtual('profile').get(function profile() {
  const { userName, name, lastName, email, avatar } = this;

  return {
    userName,
    name,
    lastName,
    email,
    avatar,
  };
});

UserSchema.methods.comparePassword = async function comparepassword(
  enteredPassword,
  next
) {
  const user = this;

  try {
    const isMatch = await bcrypt.compare(enteredPassword, user.password);
    return isMatch;
  } catch (e) {
    next(e);
    return false;
  }
};

//* 3 se asigna el schema al modelo
const User = mongoose.model('User', UserSchema);

//* 4 se exporta el modelo
module.exports = User;
