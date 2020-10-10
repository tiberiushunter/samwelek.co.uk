import { getJekyllData, printOnFail } from '../lib/helpers';

describe('Post Front Matter', function () {
  beforeAll(() => {
    return getJekyllData().then(site => {
      this.site = site;
    });
  });

  test('Posts must contain a title', () => {
    const { posts } = this.site;
    posts.forEach(post => {
      printOnFail(post.path, () => {
        expect(post).toHaveProperty('title');
      });
    });
  });

  test('Posts must contain a description', () => {
    const { posts } = this.site;
    posts.forEach(post => {
      printOnFail(post.path, () => {
        expect(post).toHaveProperty('description');
      });
    });
  });

  test('Posts must contain at least one tag', () => {
    const { posts } = this.site;
    posts.forEach(post => {
      printOnFail(post.path, () => {
        expect(post).toHaveProperty('tags');
      });
    });
  });

  test('Posts must contain a cover picture', () => {
    const { posts } = this.site;
    posts.forEach(post => {
      printOnFail(post.path, () => {
        expect(post).toHaveProperty('cover');
      });
    });
  });

  test('Posts must contain a credit for the cover image', () => {
    const { posts } = this.site;
    posts.forEach(post => {
      printOnFail(post.path, () => {
        expect(post).toHaveProperty('cover_credit');
      });
    });
  });
});
