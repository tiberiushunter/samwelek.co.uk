---
layout: page
title: Projects
subtitle: Browse all my current and past projects
---

{% assign posts = site.posts | where:"type", "projects" %}

<ul>
{% for post in posts %}
<li>
<a href="{{ site.url }}{{ site.baseurl }}{{ post.url }}">{{ post.title }}</a>
</li>
{% endfor %}
</ul>

<hr />
<a href="/tags/">...or browse projects by Tag</a>