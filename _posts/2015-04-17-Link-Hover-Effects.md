---
layout: post
title:  "Link Hover Effects"
date:   2015-04-17 19:00:00
categories: Coding
---
In my opinion, the background attribute is one of the most under utilised attributes in CSS. Sure it gets use for background images, but past that we're not really fulfilling its potential - particularly the use of linear and radial gradients.

I was just riffing and came up with a few different link hover effects, mainly using the background atrribute.

<a href="./#demo">DEMO</a>

---

## Sliding In

Using the background attribute with a linear gradient a sliding in effect becomes quite easy.

The code below demonstrates how the linear gradient is used to acheive this effect. 

{% highlight scss %}
a {  
    background-position: 0 0;
    background-size: 200%;
    background-image: linear-gradient(to right, rgba(255,255,255,0) 50%, lighten($yellow, 15%) 50%);
    &:hover {
      background-position: -100% 0;
    }
  }
{% endhighlight %}

The breakdown:

* Make linear gradient have hard stops so that you have 2 blocks of colour as your background&mdash;this is acheived by having to colours on the same %, ie red 50%, blue 50%
* Make one of the blocks of colour transparent (rgba(255,255,255,0))
* Set the background size to 200% wide&mdash;this will be 200% width of the element, so one of the colour blocks will be 100% element width
* Position the background so that the transparent block of colour sits behind the element
* On hover, move the background position so that the block of colour slides into view

Whilst the above summary explains how you'd get the background to slide in from the right hand side, the same principles apply to having the background slide in vertically.

---

## Radial Bubble

To create a bubble/ripple out effect you would use a radial gradient rather than a linear gradient.

The code below demonstrates how the linear gradient is used to acheive this effect.

{% highlight scss %} 
a {  
    background-position: 50% 50%;
    background-size: 0%;
    background-repeat: no-repeat;
    background-image: radial-gradient(circle, lighten($yellow, 15%) 50%, rgba(255,255,255,0) 50%);
    &:hover {
      background-size: 200%;
    }
  }
{% endhighlight %}

The breakdown:

* Use the radial gradient and make a circle&mdash;the size percentages don't matter so they may as well both be 50%. This is because you cannot transition a graident, so we won't be changing the circle size using the gradient, we'll be changing the background-size because that can be transitioned
* Set the background-size to 0%
* On hover, set the background-size to something like 200%

<p data-height="866" data-theme-id="0" data-slug-hash="azebKe" data-default-tab="result" data-user="mildrenben" class='codepen'>See the Pen <a href='http://codepen.io/mildrenben/pen/azebKe/'>Link hover effects</a> by Ben Mildren (<a href='http://codepen.io/mildrenben'>@mildrenben</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>

---

Hopefully you find these link hover effects useful, or at least learnt some of the possibilities of background gradients.

If you have any questions, you can find me on [Twitter @mildrenben](https://twitter.com/mildrenben).