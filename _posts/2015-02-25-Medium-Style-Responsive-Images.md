---
layout: post
title:  "Medium Style Responsive Images"
date:   2015-02-25 22:15:00
categories: Coding
---
[Live Demo](/projects/blog demos/medium style responsive images/medium-style-responsive-images.html)

[Codepen](http://codepen.io/mildrenben/pen/YPvKjX?editors=110)

So we've all seen how beautiful Medium looks (if you've been living under a rock [see here](http://www.medium.com)). Minimalist, clean bodies of text intertwined with gorgeous overflowing images. It's a stunning combo. But how do you do it?

It's surprisingly simple.

The basic premise is setting the html and body to width: 100%, then setting your article wrapper to however big you want the images to be. Setting the article wrapper to text-align: center will center all of the images within it.

Then you simply set your article wrapper > p to 50% or whatever you desire your body text width to be. Now, all of your text will be center aligned, which isn't ideal, so you set all the text elements (p, h1, h2 etc.) to text-align: left and margin-left: auto as well as margin-right: auto. 

Ta-da! 

Couple the above with some min and max-widths on your images and you've got yourself a beautiful looking article/blog!

The markup:

{% highlight html %}
<article>
  <header>
    <h2>Title</h2>
    <h5>The date</h5>
  </header>
  <p>Lorem ipsum dolor...
  </p>
  <p>Lorem ipsum dolor...
 </p>
  <img src="img-src" class="article-img"></img>
  <p>Lorem ipsum dolor...
  </p>
  <p>Lorem ipsum dolor...
 </p>
  <img src="img-src" class="article-img"></img>
  <p>Lorem ipsum dolor...
  </p>
</article>
{% endhighlight %}

The CSS:

{% highlight SCSS %}
article {
  width: 80%;
  margin: 0 auto;
  padding: 10px 0 100px; 
  text-align: center;
  p, h1, h2, h3, h4, h5 {
    text-align: left;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
  }
}

.article-img {
  min-width: 30%;
  max-width: 100%;
  height: auto;
  max-height: 800px;
  margin-bottom: 20px;
}
{% endhighlight %}

