---
layout: page
title: Projects
description: Browse all my current and past projects
---

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

<br />
<span>...or browse projects by <a href="/tags/">tag</a></span>
