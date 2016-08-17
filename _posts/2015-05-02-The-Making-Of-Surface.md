---
layout: post
title:  "The Making of Surface"
date:   2015-05-02 19:00:00
categories: Coding
---
If I don't have a project to work on, I get bored very quickly. So when my girlfriend went back to University for a 2 week stint, I needed something to do or I would get antsy.

At my day job, I have been overhauling the styles that my company uses to make it more modern and based it on [Google's Material Design](http://www.google.co.uk/design/spec/material-design/introduction.html). Sounds like good fun, right? Well, it's not quite as fun as it seems. 

Don't get me wrong, it is still fun and I do enjoy my job. But what I'm styling is unsemantic, old markup 99% of the time. So I'm making a bunch of styles based on Material Design for tables with inline styles. It means I have to be super specific when it comes to the CSS and use the dreaded !important quite a lot (the current count is up to 618). The sysytem is massive too, I'm still working on it and it's taken me ~6 weeks so far.

So I have 2 weeks of free time, and I've been building a vast set of styles based on Material Design. 

Why not build a framework for Material Design?

That's what I've been doing. For the past 10 days, I've been building a Material Design framework for modern markup (so it is not going to work with my day job project).

---

## Competition

Obviously, the big guns are the main competition. [Bootstrap](http://getbootstrap.com/) and [Foundation](http://foundation.zurb.com/) are the most notable.

The big guns do everything. They are all encompassing.

If you need to use a date picker, then my framework will not be for you. I didn't want to create a heavy framework with everything crammed in.

Besides the big guns, the only real Material Design framework in existance right now is [Materialize](http://materializecss.com/). Materialize is very good, but still what I would consider to be heavy. And in my own kind of arrogant manner I figured I could do some of the things better than they've done them.

---

## Lightweight

A huge part of what I wanted from this framework was for it to be super lightweight.

Here's the numbers:

* Bootstrap - 174kb minified. No fonts. 1 dependency. 5 files.

* Foundation - 483kb minified. No fonts. 5 dependencies. 8 files.

* Materialize - 252kb minified. No fonts. 1 dependency. 3 files.

That is a lot of kb just for a framework, or at least in my opinion it is.

* My Framework - 9kb minified. No fonts. 0 dependencies. 1 file.

---

## No Javascript

This is the biggest limitation I placed on myself when building this framework. Absolutely, 100% zero Javascript.

Don't worry, it still has all the features you'd expect of a framework, like modals, collapsibles and responsive navigation systems. I just used Sass to make them, not Javascript.

There were quite a few moments where I really wanted to use Javascript, like that pesky lightbox, but figured it'd actually be quite an acheivement to build a framework with a ton of components using only CSS. It would also mean we could serve just one file, making it even more lightweight.

---

## Introducing Surface

I decided on the name Surface, as it kind of relates to material and also is a metaphor for something ot be on top of. A foundation if you will.

If all things go to plan, Surface will be launching over this weekend.

---

## Codepen Demos

I tested a bunch of ideas on Codepen, check em out:

[Super Vertical Navigation](http://codepen.io/mildrenben/pen/GJgMvQ)

[Dropdown Navigation Menu](http://codepen.io/mildrenben/pen/RPwQEY)

[Toggle](http://codepen.io/mildrenben/pen/gpbYPv)

[Button Animation](http://codepen.io/mildrenben/pen/yNBeEd)

[Tooltips](http://codepen.io/mildrenben/pen/rVBrpK)

[Link Hover Effects](http://codepen.io/mildrenben/pen/azebKe)

[Text Input Animation](http://codepen.io/mildrenben/pen/azebKe)