import { faker } from '@faker-js/faker';
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
