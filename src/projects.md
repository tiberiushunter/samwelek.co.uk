---
layout: page
title: Projects
description: Browse all my current and past projects
---

{% assign posts = site.posts | where:"type", "projects" %}

<ul>
{% for post in posts %}
<li>
<a href="{{ site.url }}{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a>
</li>
{% endfor %}
</ul>

<br />
<span>...or browse projects by <a href="/tags/">tag</a></span>
