import { getJekyllData, printOnFail } from "../lib/helpers";

describe("Front Matter on Posts", function () {
  beforeAll(() => {
    return getJekyllData().then((site) => {
      this.site = site;
    });
  });

  test("Posts must contain a layout property", () => {
    const { posts } = this.site;

    posts.forEach((post) => {
      printOnFail(post.path, () => {
        expect(post).toHaveProperty("layout");
      });
    });
  });

  test('Posts must use "post" layout', () => {
    const { posts } = this.site;

    posts.forEach((post) => {
      printOnFail(post.path, () => {
        expect(post.layout).toMatch("post");
      });
    });
  });

  test("Posts must contain a title property", () => {
    const { posts } = this.site;

    posts.forEach((post) => {
      printOnFail(post.path, () => {
        expect(post).toHaveProperty("title");
      });
    });
  });

  test("Posts title must be longer than 5 characters", () => {
    const { posts } = this.site;

    posts.forEach((post) => {
      printOnFail(post.path, () => {
        expect(post.title.length > 5).toBe(true);
      });
    });
  });

  test("Posts must contain a description property", () => {
    const { posts } = this.site;

    posts.forEach((post) => {
      printOnFail(post.path, () => {
        expect(post).toHaveProperty("description");
      });
    });
  });

  test("Posts description must be longer than 15 characters", () => {
    const { posts } = this.site;

    posts.forEach((post) => {
      printOnFail(post.path, () => {
        expect(post.description.length > 15).toBe(true);
      });
    });
  });

  test("Posts must contain at least one tag", () => {
    const { posts } = this.site;

    posts.forEach((post) => {
      printOnFail(post.path, () => {
        expect(post).toHaveProperty("tags");
      });
    });
  });

  test("Posts must contain a value for the cover picture", () => {
    const { posts } = this.site;

    posts.forEach((post) => {
      printOnFail(post.path, () => {
        expect(post).toHaveProperty("cover");
      });
    });
  });

  test("Posts must contain a value for the cover image", () => {
    const { posts } = this.site;

    posts.forEach((post) => {
      printOnFail(post.path, () => {
        expect(post).toHaveProperty("cover_credit");
      });
    });
  });

  test("Blog Posts must a contain a valid cover image credit", () => {
    const { posts } = this.site;
    const coverCreditRegex = /^(Photo by [A-z ]+ on [A-z ]+)$/;

    posts.forEach((post) => {
      if (post.type === "blog") {
        printOnFail(post.path, () => {
          expect(post.cover_credit).toMatch(coverCreditRegex);
        });
      }
    });
  });

  test("Post urls must end with a backslash", () => {
    const { posts } = this.site;

    posts.forEach((post) => {
      printOnFail(post.path, () => {
        expect(post.url).toMatch(/\/$/i);
      });
    });
  });
  
  test("Post urls must match the valid format", () => {
    const { posts } = this.site;
    const validUrlRegex = /^(\/[0-9]{4}\/[0-9]{2}\/[0-9]{2}\/[A-z\-\.]+\/)$/;

    posts.forEach((post) => {
      printOnFail(post.path, () => {
        expect(post.url).toMatch(validUrlRegex);
      });
    });
  });
});
