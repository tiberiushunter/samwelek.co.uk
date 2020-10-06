---
layout: post
title: Hello World!
description: So this looks like this...
tags: ["hello world", "jekyll"]
---

<div class="post-cover">
<img src="/assets/images{{ page.url }}cover.jpg" />
<span class="cover-caption">Photo by <a href="https://unsplash.com/@lemonvlad?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Vladislav Klapin</a> on <a href="https://unsplash.com/s/photos/hello?utm_source=unsplash&amp;utm_medium=referral&amp;utm_content=creditCopyText">Unsplash</a></span>
</div>

## Hello World! :wave:

It took 15 commits and 5 days to realise that having a personal site built purely with <abbr title="HyperText Markup Language">HTML</abbr>, <abbr title="Cascading Style Sheets">CSS</abbr>, and <abbr title="JavaScript">JS</abbr> was going to be a <del>nightmare</del> challenge in the long run. Realistically I just want to show off some projects, produce some guides on what I find difficult to get answers for, and the occasional post here and there - what I don't really want to be doing is handcrafting every single little button with loving care and attention for hours on end when I could be focusing on what's important.  

## Jekyll & Liquid to the Rescue!

I've never used [Jekyll][1] before but from the docs and a few projects I've seen it looks like a very suitable static site generator with a large supporting community behind it. The idea of just writing all my posts in [Markdown][2] as well as using the [Liquid][8] template engine and having it all just work *like magic* :tada: is very appealing!  

## Dark Poole

The home page for this site is just migrated over from the old version however the [blog][2] and [projects][4] links will be making full of use of Jekyll and the theme I've chosen currently is [Dark Poole][5] by [Andrew Park][6] as you've got to love a good dark theme! 

The theme itself has made it a lot easier to quickly generate the Jekyll site structure but I've made a few changes including:

* Adding the subtitle as a variable
* Adding a little more space between the header tags for some breathing room
* Reducing the size of the posted date
* Tag system (based from one made by [Ryan Palo][7])
* Plus a few more tweaks! 

[1]: https://jekyllrb.com/
[2]: https://daringfireball.net/projects/markdown/
[3]: https://samwelek.co.uk/blog/
[4]: https://samwelek.co.uk/projects/
[5]: https://github.com/andrewhwanpark/dark-poole
[6]: https://github.com/andrewhwanpark
[7]: https://www.assertnotmagic.com/2017/04/25/jekyll-tags-the-easy-way/
[8]: https://shopify.github.io/liquid/