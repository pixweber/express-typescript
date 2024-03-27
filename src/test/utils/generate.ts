import { faker } from '@faker-js/faker';
import { IUserPayload } from "../../repositories/user.repository";
import { User } from "../../models/user";
import { Post } from "../../models/post";
export function generateUserData(override = {}) {
  return {
    id: faker.number.int({ min: 1, max: 1000 }),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    posts: [],
    comments: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    ...override
  };
}

export function generateUsersData(n: number = 1, overide = {}) {
  return Array.from({ length: n }, (_, i) => {
    return generateUserData({ id: i, ...overide});
  });
}

export function generateUserPayload(): IUserPayload {
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email()
  }
}

export function generatePostData(override = {}) {
  return {
    id: faker.number.int({min: 1, max: 50000}),
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraph(),
    userId: faker.number.int({min: 1, max: 50000}),
    comments: [],
    user: new User(),
    createdAt : new Date(),
    updatedAt: new Date(),
    ...override
  }
}

export function generatePostsData(n: number = 1, override = {}) {
  return Array.from({length: n}, (_, i) => {
    return generatePostData({id: i, ...override});
  })
}

export function generatePostPayload() {
  return {
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraph(),
    userId: faker.number.int({min: 1, max: 100000})
  }
}

export function generateCommentData(override = {}) {
  return {
    id: faker.number.int({min: 1, max: 10000}),
    content: faker.lorem.paragraph(),
    userId: faker.number.int({min: 1, max: 10000}),
    user: new User(),
    postId: faker.number.int({min: 1, max: 10000}),
    post: new Post(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...override
  }
}

export function generateCommentsData(n: number = 1, override = {}) {
  return Array.from({length: n}, (_, i) => {
    return generateCommentData(override);
  })
}
