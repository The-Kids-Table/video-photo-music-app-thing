const { connection, User } = require('../../db');
const expect = require('chai').use(require('chai-as-promised')).use(require('chai-string')).expect;

describe('User Model', () => {
  beforeEach(() => {
    return connection.reset();
  });

  describe('create()', () => {
    it('Should create local auth user with all valid parameters', () => {
      return User.create({
        username: 'test',
        password: 'test',
        name: 'test'
      })
        .then((user) => {
          expect(user).to.exist;
        });
    });
    it('Should create oAuth user with all valid parameters and no username provided', () => {
      return User.create({
        oAuthUserId: 1,
        oAuthProvider: 'google',
        name: 'test2'
      })
        .then((user) => {
          expect(user).to.exist;
          expect(user.username).to.exist;
        });
    });
    it('Should create oAuth user with all valid parameters and no username provided', () => {
      return User.create({
        oAuthUserId: 1,
        oAuthProvider: 'google',
        name: 'test'
      })
        .then((user) => {
          expect(user).to.exist;
          expect(user.username).to.exist;
        });
    });
    it('Should create user with oAuth and a username provided', () => {
      return User.create({oAuthUserId: 1, oAuthProvider: 'google', username: 'test', name: 'test'})
        .then((user) => {
          expect(user.username).to.equal('test');
        });
    });
    it('Should generate username for oAuth users that do not provide a username and have an email', () => {
      return User.create({oAuthUserId: 1, oAuthProvider: 'google', email: 'test@example.com', name: 'test'})
        .then((user) => {
          expect(user.username).to.startsWith('test_');
          if (user.username.includes('@')) {
            throw new Error('Should not contain full email');
          }
        });
    });
    it('Should generate username for oAuth users that do not provide a username and do not have an email', () => {
      return User.create({oAuthUserId: 1111, oAuthProvider: 'google', name: 'test'})
        .then((user) => {
          expect(user.username).to.startsWith('1111_');
        });
    });
    it('Should reject when creating a local auth user with an email field that is not an email', () => {
      return expect(User.create({
        oAuthUserId: 1,
        oAuthProvider: 'google',
        email: 'not an email',
        name: 'test'
      })).to.be.rejectedWith('Validation error: Validation isEmail on email failed');
    });
    it('Should reject when creating user with no oAuth or local auth credentials', () => {
      return expect(User.create({})).to.be.rejectedWith('Cannot create account without neither oAuth nor local auth credentials');
    });
    it('Should reject when creating user local auth credentials and an oAuth ID', () => {
      return expect(User.create({oAuthUserId: 1, username: 'test', email: 'foo@gmail.com', password: 'test', name: 'test'})).to.be.rejectedWith('Cannot create local auth account with oAuth ID');
    });
    it('Should reject when creating user with local auth credentials and an oAuth provider', () => {
      return expect(User.create({oAuthProvider: 'google', username: 'test', email: 'foo@gmail.com', password: 'test', name: 'test'})).to.be.rejectedWith('Cannot create local auth account with oAuth provider');
    });
    it('Should reject when creating user with an email that is already registered', () => {
      return User.create({username: 'test', email: 'foo@gmail.com', password: 'test', name: 'test'})
        .then(() => {
          return expect(User.create({username: 'test', email: 'foo@gmail.com', password: 'test', name: 'test'})).to.be.rejected;
        });
    });
  });

  describe('update()', () => {
    let localUser = {
      username: 'test',
      password: 'test',
      name: 'test'
    };
    let oAuthUser = {
      oAuthUserId: 1234,
      oAuthProvider: 'facebook',
      name: 'test'
    };

    beforeEach(() => {
      return User.create(localUser)
        .then((newUser) => {
          localUser = newUser;
          return User.create(oAuthUser);
        })
        .then((newUser) => {
          oAuthUser = newUser;
        });
    });

    it('Should update local user and return the updated version when query is valid', () => {
      return User.update(localUser.id, {username: 'freddyz'})
        .then((user) => {
          expect(user.username).to.equal('freddyz');
        });
    });
    it('Should only update parameters that are specified', () => {
      return User.update(localUser.id, {name: 'freddyz'})
        .then((user) => {
          expect(user.username).to.equal('test');
        });
    });
    it('Should update oAuth user and return the updated version when query is valid', () => {
      return User.update(oAuthUser.id, {username: 'freddyz'})
        .then((user) => {
          expect(user.username).to.equal('freddyz');
        });
    });
    it('Should not allow changing of oAuthUserId and oAuthProvider fields if attempting to change local user', () => {
      return expect(User.update(localUser.id, {oAuthUserId: 1234})).to.be.rejectedWith('Cannot modify oAuth data');
    });
    it('Should not allow updating passwords', () => {
      return expect(User.update(oAuthUser.id, {password: 'foo'})).to.be.rejectedWith('Cannot update password field in update method - try the updatePassword method instead');
    });
    it('Should reject when no update query is specified', () => {
      return expect(User.update(localUser.id)).to.rejectedWith('No update query was specified');
    });
    it('Should reject when attempting to change oAuthUserId', () => {
      return expect(User.update(localUser.id, {oAuthUserId: 1234})).to.rejectedWith('Cannot modify oAuth data');
    });
    it('Should reject when attempting to change oAuthProvider', () => {
      return expect(User.update(localUser.id, {oAuthProvider: 1234})).to.rejectedWith('Cannot modify oAuth data');
    });
  });

  describe('updatePassword()', () => {
    let localUser = {
      username: 'test',
      password: 'test',
      name: 'test'
    };
    let oAuthUser = {
      oAuthUserId: 1234,
      oAuthProvider: 'facebook',
      name: 'test'
    };

    beforeEach(() => {
      return User.create(localUser)
        .then((newUser) => {
          localUser = newUser;
          return User.create(oAuthUser);
        })
        .then((newUser) => {
          oAuthUser = newUser;
        });
    });

    it('Should succeed when updating password with all valid parameters', () => {
      let userPassword;
      return User.getById(localUser.id)
        .then((user) => {
          userPassword = user.password;
        })
        .then(() => {
          return User.updatePassword({userId: localUser.id, currentPassword: 'test', newPassword: 'test2'})
            .then((user) => {
              expect(user.password).to.exist;
              expect(userPassword).to.exist;
              expect(user.password === userPassword).to.equal(false);
            });
        });
    });
    it('Should reject when user does not exist', () => {
      return expect(User.updatePassword({userId: 1234, currentPassword: 'asdf', newPassword: 'asdf'})).to.be.rejectedWith('User does not exist');
    });
    it('Should reject when current password is incorrect', () => {
      return expect(User.updatePassword({userId: localUser.id, currentPassword: 'fakepassword', newPassword: 'asdf'})).to.be.rejectedWith('Current password is incorrect');
    });
    it('Should reject when new password is empty', () => {
      return expect(User.updatePassword({userId: localUser.id, currentPassword: 'test', newPassword: ''})).to.be.rejectedWith('Must provide both current password and new password when changing password');
    });
    it('Should not allow updating password for oAuth users', () => {
      return expect(User.updatePassword({userId: oAuthUser.id, currentPassword: 'test', newPassword: 'test'})).to.be.rejectedWith('Cannot update password for oAuth user');
    });
  });

  describe('follow()', () => {
    let userOne;
    let userTwo;
    beforeEach(() => {
      return User.create({
        username: 'test',
        password: 'test',
        name: 'test'
      })
        .then((user) => {
          userOne = user;
          return User.create({
            username: 'test2',
            password: 'test2',
            name: 'test'
          })
        })
        .then((user) => {
          userTwo = user;
        });
    });
    it('Should be able to follow users', () => {
      return expect(User.follow(userOne.id, userTwo.id)).to.eventually.equal(true);
    });
    it('Should reject when following a user that does not exist', () => {
      return expect(User.follow(userOne.id, 1234)).to.be.rejectedWith('User does not exist');
    });
    it('Should reject when following as a user that does not exist', () => {
      return expect(User.follow(1234, userTwo.id)).to.be.rejectedWith('User does not exist');
    });
    it('Should reject when following yourself', () => {
      return expect(User.follow(userTwo.id, userTwo.id)).to.be.rejectedWith('Cannot follow yourself');
    });
  });

  describe('unfollow()', () => {
    let userOne;
    let userTwo;
    beforeEach(() => {
      return User.create({
        username: 'test',
        password: 'test',
        name: 'test'
      })
        .then((user) => {
          userOne = user;
          return User.create({
            username: 'test2',
            password: 'test2',
            name: 'test'
          })
        })
        .then((user) => {
          userTwo = user;
        });
    });
    it('Should successfully unfollow a valid user', () => {
      return User.follow(userOne.id, userTwo.id)
        .then(() => {
          return expect(User.unfollow(userOne.id, userTwo.id)).to.eventually.equal(true);
        });
    });
    it('Should reject when unfollower does not exist', () => {
      return expect(User.unfollow(1234, userTwo.id)).to.be.rejectedWith('User does not exist');
    });
    it('Should reject when unfollowee does not exist', () => {
      return expect(User.unfollow(userOne.id, 1234)).to.be.rejectedWith('User does not exist');
    });
  });

  describe('getFollowers()', () => {
    let userOne;
    let userTwo;
    beforeEach(() => {
      return User.create({
        username: 'test',
        password: 'test',
        name: 'test'
      })
        .then((user) => {
          userOne = user;
          return User.create({
            username: 'test2',
            password: 'test2',
            name: 'test'
          })
        })
        .then((user) => {
          userTwo = user;
        })
        .then(() => {
          return User.follow(userOne.id, userTwo.id);
        });
    });
    it('Should return empty array for user with no followers', () => {
      return expect(User.getFollowers(userOne.id)).to.eventually.eql([]);
    });
    it('Should return array of users when the user has followers', () => {
      return User.getFollowers(userTwo.id)
        .then((followers) => {
          expect(followers.length).to.equal(1);
          expect(followers[0].id).to.equal(userOne.id);
        });
    });
    it('Returned followers should not contain password hashes', () => {
      return User.getFollowers(userTwo.id)
        .then((followers) => {
          expect(followers.length).to.equal(1);
          expect(followers[0].password).to.not.exist;
        });
    });
    it('Should reject if user does not exist', () => {
      return expect(User.getFollowers(1234)).to.be.rejectedWith('User does not exist');
    });
  });

  describe('getFollows()', () => {
    let userOne;
    let userTwo;
    beforeEach(() => {
      return User.create({
        username: 'test',
        password: 'test',
        name: 'test'
      })
        .then((user) => {
          userOne = user;
          return User.create({
            username: 'test2',
            password: 'test2',
            name: 'test'
          })
        })
        .then((user) => {
          userTwo = user;
        })
        .then(() => {
          return User.follow(userOne.id, userTwo.id);
        });
    });
    it('Should return empty array for user that does not follow anyone', () => {
      return expect(User.getFollows(userTwo.id)).to.eventually.eql([]);
    });
    it('Should return array of users when the user is following people', () => {
      return User.getFollows(userOne.id)
        .then((follows) => {
          expect(follows.length).to.equal(1);
          expect(follows[0].id).to.equal(userTwo.id);
        });
    });
    it('Returned follows should not contain password hashes', () => {
      return User.getFollows(userOne.id)
        .then((follows) => {
          expect(follows.length).to.equal(1);
          expect(follows[0].password).to.not.exist;
        });
    });
    it('Should reject if user does not exist', () => {
      return expect(User.getFollows(1234)).to.be.rejectedWith('User does not exist');
    });
  });

  describe('getByEmail()', () => {
    it('Should get user by ID if the user exists', () => {
      return User.create({
        email: 'foo@bar.com',
        username: 'test',
        password: 'test',
        name: 'test'
      })
        .then((user) => {
          return User.getByEmail(user.email);
        })
        .then((user) => {
          expect(user).to.exist;
          expect(user.username).to.equal('test');
          expect(user.email).to.equal('foo@bar.com');
        });
    });
    it('Should throw error if ID does not map to an existing user', () => {
      return expect(User.getByEmail('asdf')).to.be.rejectedWith('User does not exist');
    });
  });

  describe('getByUsername()', () => {
    it('Should get user by ID if the user exists', () => {
      return User.create({
        username: 'test',
        password: 'test',
        name: 'test'
      })
        .then((user) => {
          return User.getByUsername('test');
        })
        .then((user) => {
          expect(user).to.exist;
          expect(user.username).to.equal('test');
        });
    });
    it('Should throw error if ID does not map to an existing user', () => {
      return expect(User.getByUsername('asdf')).to.be.rejectedWith('User does not exist');
    });
  });

  describe('getById()', () => {
    it('Should get user by ID if the user exists', () => {
      return User.create({
        username: 'test',
        password: 'test',
        name: 'test'
      })
        .then((user) => {
          return User.getById(user.id);
        })
        .then((user) => {
          expect(user).to.exist;
          expect(user.username).to.equal('test');
        });
    });
    it('Should throw error if ID does not map to an existing user', () => {
      return expect(User.getById(1234)).to.be.rejectedWith('User does not exist');
    });
  });
});