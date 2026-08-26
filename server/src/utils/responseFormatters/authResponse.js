const createUserResponse = (user) => ({
  id: user._id,
  email: user.email,
  username: user.username,
  emailVerified: user.emailVerified,
  createdAt: user.createdAt,
});

module.exports = {
  createUserResponse,
};
