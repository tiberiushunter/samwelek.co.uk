---
layout: page
title: About
---

<div class="about-profile-page">
    <img class="profile-img" src="/assets/images/profile.jpg" alt="Profile Picture">
    <div class="about-profile-text">
        <h2>Profile</h2>
        <p>Hey! :wave:</p>
        <p>I'm a full stack software developer with experience working with a wide range of tools and technologies.</p>
    </div>
</div>

{:.about-profile-clear}

## Experience

During my time at the [University of Salford][salford], I undertook a placement year at [Koderly][koderly] (*formerly Web Applications UK*) as a software engineer with a focus on learning, growth and innovation. My roles there included development, testing, delivery, and support of core applications for the Travel industry.

After graduating, I joined the [Fujitsu][fujitsu] graduate scheme where I worked on a variety of projects, gaining experience with multiple methodologies across different tech stacks. During my time at Fujitsu I also helped form and lead an agile team while developing solutions which further developed both my technical and professional skill sets.

Currently I'm part of [On the Beach][otb], developing and supporting applications for the Travel industry.

In my spare time I enjoy working on small projects and tinkering with new tech. More recently my focus has been on my [Home Assistant][ha] instance, this [website][samwelek], and completing past years of [Advent of Code][aoc].

## Projects

See below for a selection of projects I've worked on or visit my [GitHub][github] page to view all my repositories.

{% assign posts = site.posts | where:"type", "projects" %}

<div class="post-card-container">
    {% for post in posts %}
    <div class="post-card">
     <a href="{{ site.baseurl }}{{ post.url }}">
        <img class="post-cover" alt="Abstract Project Photo" src="/assets/images{{ post.url }}{{ post.cover }}"/>
       {{ post.title }}
       </a>
    </div>
    {% endfor %}
</div>

## Get in Touch

Feel free to reach out and [Contact][contact] me for more details

[salford]: https://www.salford.ac.uk/
[koderly]: https://www.koder.ly/
[fujitsu]: https://www.fujitsu.com/uk/
[otb]: https://www.onthebeach.co.uk/

[ha]: https://github.com/tiberiushunter/hassio-config/
[samwelek]: https://github.com/tiberiushunter/samwelek.co.uk/
[aoc]: https://github.com/tiberiushunter/advent-of-code/
[github]: https://github.com/tiberiushunter/

[contact]: /contact/
