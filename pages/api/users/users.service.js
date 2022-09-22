import User from './users.model';

export function getAllUsers() {
  return User.find({});
}

export function findOneUser(query) {
  return User.findOne(query);
}

export function getSingleUser(id) {
  return User.findById(id);
}

export function findUserByEmail(email) {
  return User.findOne({ email });
}

export function createUser(user) {
  return User.create(user);
}

export function updateUser(id, user) {
  return User.findByIdAndUpdate(id, user, { new: true });
}

export function deleteUser(id) {
  return User.findByIdAndRemove(id);
}
