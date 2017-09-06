const { connection, User, Project, ProjectComponent } = require('../../db');
const expect = require('chai').use(require('chai-as-promised')).expect;

describe('Project Component Model', () => {
  let userOne = {
    username: 'test',
    password: 'test'
  };
  let userTwo = {
    oAuthUserId: 1234,
    oAuthProvider: 'facebook'
  };
  let project = {
    name: 'test project',
    description: 'this is a project'
  };

  beforeEach(() => {
    return connection.reset()
      .then(() => {
        return User.create(userTwo);
      })
      .then((newUser) => {
        userOne = newUser;
        project.ownerId = userOne.id;
        return User.create(userTwo);
      })
      .then((newUser) => {
        userTwo = newUser;
        return Project.create(project);
      })
      .then((newProject) => {
        project = newProject;
      });
  });

  describe('create', () => {
    it('Should create project component when all parameters are valid and you are the project owner', () => {
      return ProjectComponent.create({
        userId: userOne.id,
        projectId: project.id,
        name: 'test component',
        type: 'image',
        resourceUrl: 'google.com'
      })
        .then((component) => {
          expect(component.name).to.equal('test component');
        });
    });
    it('Should create project component when all parameters are valid and you are a contributor to the project', () => {
      return Project.addContributor({ownerId: userOne.id, contributorId: userTwo.id, projectId: project.id})
        .then(() => {
          return ProjectComponent.create({
            userId: userTwo.id,
            projectId: project.id,
            name: 'test component',
            type: 'image',
            resourceUrl: 'google.com'
          });
        })
        .then((component) => {
          expect(component.name).to.equal('test component');
        });
    });
    it('Should reject when adding a component to a project that you are not a contributor to or owner of', () => {
      return expect(ProjectComponent.create({
        userId: userTwo.id,
        projectId: project.id,
        name: 'test component',
        type: 'image',
        resourceUrl: 'google.com'
      })).to.be.rejectedWith('Cannot create a component in a project you are not a part of');
    });
    it('Should reject when userId does not map to an existing user', () => {
      return expect(ProjectComponent.create({userId: 1234, type: 'file'})).to.be.rejectedWith('User does not exist');
    });
    it('Should reject when projectId does not map to an existing project', () => {
      return expect(ProjectComponent.create({userId: userOne.id, projectId: 1234, type: 'file'})).to.be.rejectedWith('Project does not exist');
    });
    it('Should reject when content type is invalid', () => {
      return expect(ProjectComponent.create({userId: userOne.id, projectId: project.id, name: 'test component', type: 'asdf', resourceUrl: 'google.com'})).to.be.rejectedWith('Component type is invalid');
    });
  });

  describe('update()', () => {
    let component;
    beforeEach(() => {
      return ProjectComponent.create({
        userId: userOne.id,
        projectId: project.id,
        name: 'test component',
        type: 'image',
        resourceUrl: 'google.com'
      })
        .then((projectComponent) => {
          component = projectComponent;
        });
    });

    it('Should update as project owner when all parameters are valid', () => {
      return ProjectComponent.update(userOne.id, component.id, {description: 'foo'})
        .then((newComponent) => {
          expect(newComponent.description).to.equal('foo');
        });
    });
    it('Should update as project contributor when all parameters are valid', () => {
      return Project.addContributor({ownerId: userOne.id, contributorId: userTwo.id, projectId: project.id})
        .then(() => {
          return ProjectComponent.update(userTwo.id, component.id, {description: 'foo'})
            .then((newComponent) => {
              expect(newComponent.description).to.equal('foo');
            });
        });
    });
    it('Should reject when updating and not an owner or contributor', () => {
      return expect(ProjectComponent.update(userTwo.id, component.id, {description: 'foo'})).to.be.rejectedWith('Cannot edit a component in a project you are not a part of');
    });
    it('Should reject when updating a component that does not exist', () => {
      return expect(ProjectComponent.update(userOne.id, 123456, {description: 'foo'})).to.be.rejectedWith('Component does not exist');
    });
  });

  describe('delete()', () => {
    let component;
    beforeEach(() => {
      return ProjectComponent.create({
        userId: userOne.id,
        projectId: project.id,
        name: 'test component',
        type: 'image',
        resourceUrl: 'google.com'
      })
        .then((projectComponent) => {
          component = projectComponent;
        });
    });

    it('Should delete as project owner when all parameters are valid', () => {
      return ProjectComponent.delete(userOne.id, component.id)
        .then((response) => {
          expect(response).to.equal(true);
        });
    });
    it('Should delete as project contributor when all parameters are valid', () => {
      return Project.addContributor({ownerId: userOne.id, contributorId: userTwo.id, projectId: project.id})
        .then(() => {
          return ProjectComponent.delete(userTwo.id, component.id)
            .then((response) => {
              expect(response).to.equal(true);
            });
        });
    });
    it('Should reject when deleting and not an owner or contributor', () => {
      return expect(ProjectComponent.delete(userTwo.id, component.id)).to.be.rejectedWith('Cannot delete a component in a project you are not a part of');
    });
    it('Should reject when deleting a component that does not exist', () => {
      return expect(ProjectComponent.delete(userOne.id, 123456)).to.be.rejectedWith('Component does not exist');
    });
  });

  describe('getByProject()', () => {
    let component;
    beforeEach(() => {
      return ProjectComponent.create({
        userId: userOne.id,
        projectId: project.id,
        name: 'test component',
        type: 'image',
        resourceUrl: 'google.com'
      })
        .then((projectComponent) => {
          component = projectComponent;
        });
    });

    it('Should resolve to an array of components when projectId is valid', () => {
      return ProjectComponent.getByProject(project.id)
        .then((components) => {
          expect(components).to.be.a('array');
          expect(components.length).to.equal(1);
          expect(components[0].name).to.equal('test component');
          return ProjectComponent.getByProject(project.id);
        });
    });
    it('Should reject if userId does not map to an existing project', () => {
      return expect(ProjectComponent.getByProject(1234)).to.be.rejectedWith('Project does not exist');
    });
  });

  // TODO - Use these tests
  // describe('getByUser()', () => {
  //   let component;
  //   beforeEach(() => {
  //     return ProjectComponent.create({
  //       userId: userOne.id,
  //       projectId: project.id,
  //       name: 'test component',
  //       type: 'image',
  //       resourceUrl: 'google.com'
  //     })
  //       .then((projectComponent) => {
  //         component = projectComponent;
  //       });
  //   });

  //   it('Should resolve to an array of components when userId is valid', () => {
  //     return ProjectComponent.getByUser(userOne.id)
  //       .then((components) => {
  //         expect(components).to.be.a('array');
  //         expect(components.length).to.equal(1);
  //         expect(components[0].name).to.equal('test component');
  //         return ProjectComponent.getByUser(userTwo.id);
  //       })
  //       .then((components) => {
  //         expect(components).to.be.a('array');
  //         expect(components.length).to.equal(0);
  //       });
  //   });
  //   it('Should reject if userId does not map to an existing user', () => {
  //     return expect(ProjectComponent.getByUser(1234)).to.be.rejectedWith('User does not exist');
  //   });
  // });

  describe('getById()', () => {
    let component;
    beforeEach(() => {
      return ProjectComponent.create({
        userId: userOne.id,
        projectId: project.id,
        name: 'test component',
        type: 'image',
        resourceUrl: 'google.com'
      })
        .then((projectComponent) => {
          component = projectComponent;
        });
    });

    it('Should get component if ID maps to an existing one', () => {
      return ProjectComponent.getById(component.id)
        .then((component) => {
          expect(component.name).to.equal('test component');
        });
    });
    it('Should reject if component ID does not map to an existing component', () => {
      return expect(ProjectComponent.getById(1234)).to.be.rejectedWith('Component does not exist');
    });
  });
});