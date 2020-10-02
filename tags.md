---
layout: page
title: Tags
subtitle: Browse blogs and projects with tags
---

<!-- Acknowledgement: https://www.assertnotmagic.com/2017/04/25/jekyll-tags-the-easy-way/ -->
<p>
    {% for tag in site.tags %}
    <a href="/tags/{{ tag[0] }}/"
    style="font-size: {{ tag[1] | size | times: 2 | plus: 10 }}px">
        {{ tag[0] }} |
    </a>
    {% endfor %}
</p>