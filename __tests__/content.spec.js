import { getSiteMetaData, printOnFail } from '../lib/helpers';

describe('Posts', function () {
  let site;

  beforeAll(async () => {
    site = await getSiteMetaData();
  });

  it('must contain content', () => {
    const { posts } = site;

    posts.forEach((post) => {
      printOnFail(post.path, () => {
        expect(post).toHaveProperty('content');
      });
    });
  });

  it('must have content longer than 50 characters', () => {
    const { posts } = site;

    posts.forEach((post) => {
      printOnFail(post.path, () => {
        expect(post.content.length > 50).toBe(true);
      });
    });
  });
});
