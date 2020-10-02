---
layout: page
title: Blog
subtitle: Browse all my blog posts
---

{% assign posts = site.posts | where:"type", "blog" %}

<ul>
{% for post in posts %}
<li>
<a href="{{ site.url }}{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a>
</li>
{% endfor %}
</ul>

<hr />
<a href="/tags/">...or browse blog posts by Tag</a>