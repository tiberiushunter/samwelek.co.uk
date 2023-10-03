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

## About

I enjoy working on small projects and tinkering with new tech. More recently my focus has been on my [Home Assistant][ha] instance, this [website][samwelek], and completing past years of [Advent of Code][aoc].

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

Feel free to reach out and contact me for more details

[ha]: https://github.com/tiberiushunter/hassio-config/
[samwelek]: https://github.com/tiberiushunter/samwelek.co.uk/
[aoc]: https://github.com/tiberiushunter/advent-of-code/
[github]: https://github.com/tiberiushunter/
