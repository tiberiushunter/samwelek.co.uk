---
layout: page
title: Blog
description: Browse all my blog posts and guides
---

{% assign posts = site.posts | where:"type", "blog" %}

<ul>
{% for post in posts %}
<li>
<a href="{{ site.url }}{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a>
</li>
{% endfor %}
</ul>

<br />
<span>...or browse blog posts by <a href="/tags/">tag</a></span>