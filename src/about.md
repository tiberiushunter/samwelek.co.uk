---
layout: page
title: About Me
---

<div class="about-profile-page">
    <img class="about-profile-img" src="/assets/images/profile.jpg" alt="Profile Picture">
    <div class="about-profile-text">
        <h2>Profile</h2>
        <p>Hey! I'm a full stack software developer with several years experience in industry, working with a wide range of tools and technologies. My additional roles have included Agile Coach, Development Team Lead, Scrum Master, and professional and personal mentor.</p>
    </div>
</div>

{:.about-profile-clear}
## Experience

During my university degree, I undertook a placement year at [Koderly][koderly] (*formally Web Applications UK*) as a software developer with a focus on learning, growth and innovation. My roles included development, testing, delivery, and support of core applications for the Travel industry.

After graduating, I joined the [Fujitsu][fujitsu] graduate scheme where I worked on a variety of accounts, gaining experience with multiple methodologies and tech stacks. During my time at Fujitsu I also formed and led an agile development team, designed solutions and further developed both my technical and professional skill sets.

In my spare time I enjoy working on small projects and tinkering with new tech. More recently my focus has been on my [Home Assistant][ha] instance, this [website][samwelek], and completing past years of [Advent of Code][aoc].

## Projects

See below for a selection of projects I've worked on or visit my [GitHub][github] page to view all my repositories.

{% assign posts = site.posts | where:"type", "projects" %}

<div class="post-card-container">
    {% for post in posts %}
    <div class="post-card">
     <a href="{{ site.url }}{{ site.baseurl }}{{ post.url }}">
        <img class="post-cover" src="/assets/images{{ post.url }}{{ post.cover }}"/>
       {{ post.title }}
       </a>
    </div>
    {% endfor %}
</div>

## Get in Touch

Feel free to reach out and [Contact][contact] me for more details

[koderly]: https://www.koder.ly/
[fujitsu]: https://www.fujitsu.com/uk/

[ha]: https://github.com/tiberiushunter/hassio-config/
[samwelek]: https://github.com/tiberiushunter/samwelek.co.uk/
[aoc]: https://github.com/tiberiushunter/advent-of-code/
[github]: https://github.com/tiberiushunter/

[contact]: /contact/