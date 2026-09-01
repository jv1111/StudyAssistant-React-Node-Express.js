const createUserResponse = (user) => ({
  id: user._id,
  email: user.email,
  username: user.username,
  emailVerified: user.emailVerified,
  createdAt: user.createdAt,
  hasPassword: user.password !== null,
});

module.exports = {
  createUserResponse,
};
