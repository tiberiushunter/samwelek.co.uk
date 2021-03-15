import { getJekyllData, printOnFail } from "../lib/helpers";

describe("Content in Posts", function () {
  beforeAll(() => {
    return getJekyllData().then((site) => {
      this.site = site;
    });
  });

  test("Posts must contain content", () => {
    const { posts } = this.site;

    posts.forEach((post) => {
      printOnFail(post.path, () => {
        expect(post).toHaveProperty("content");
      });
    });
  });

  test("Posts content must be longer than 50 characters", () => {
    const { posts } = this.site;

    posts.forEach((post) => {
      printOnFail(post.path, () => {
        expect(post.content.length > 50).toBe(true);
      });
    });
  });

});
