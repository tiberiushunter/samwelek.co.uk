---
layout: page
title: Blog
description: Browse all my blog posts and guides
---

{% assign posts = site.posts | where:"type", "blog" %}

<div class="post-card-container">
    {% for post in posts %}
    <div class="post-card">
     <a href="{{ site.url }}{{ site.baseurl }}{{ post.url }}">
        <img src="/assets/images{{ post.url }}cover.jpg"/>
       {{ post.title }}
       </a><br /><time datetime="{{ post.date | date_to_xmlschema }}" class="date">{{ post.date | date_to_string }}</time>
    </div>
    {% endfor %}
</div>


<br />
<span>...or browse blog posts by <a href="/tags/">tag</a></span>