---
layout: post
title:  "How to make a Material Design style input with no extra markup"
date:   2015-03-10 19:00:00
categories: Coding
---
With [Google's Material Design](http://www.google.co.uk/design/spec/material-design/introduction.html) being so hot right now, I thought why not take a shot at making something and applying it's concepts.

I work as a Graphic Designer, Web Designer and Front End Developer full time and&mdash;unfortunately&mdash;I have no control over the markup I style. Basically, we have a team of backend developers who will output the HTML and I have to style it using only CSS and minimal Javascript. Whilst this can be a pain to work with sometimes, being constrained to using only CSS has forced me to think outside of the box and push CSS to it's limits.

This is the markup I had to work with when trying to apply Material Design's concepts.

{% highlight html %}
<input placeholder="Username">
{% endhighlight %}

That's it.

At first I thought it wasn't possible to make it work with such minimal markup. But alas, there is a way!

The placeholder part of it is pretty easy. Simply on input:focus, you just move the placeholder up, shrink the font size and change it's colour. Although it must be said that browser support for manipulating a placeholder isn't great.

The real challenge came from creating the cool horizontal line sliding in animation. To achieve this, I used and altered the background property of the input.

By applying a linear gradient as a background, with 95% of the gradient being transparent, you can basically make another border-bottom. I then positioned it 100% to the left of the actual input so that it cannot be seen when not on :focus. When the input is :focus, simply move the background-position to it's origin of 0 0.

There are a few extra bits you'll need here and there, but the above is the main part.

Here is the CSS:

{% highlight scss %}
$color: #1abc9c;

h1, input::-webkit-input-placeholder, button {
  font-family: 'roboto', sans-serif;
  transition: all 0.3s ease-in-out;
}

h1 {
  height: 100px;
  width: 100%;
  font-size: 18px;
  background: darken($color, 4%);
  color: white;
  line-height: 150%;
  border-radius: 3px 3px 0 0;
  box-shadow: 0 2px 5px 1px rgba(0,0,0,0.2);
}

form {
  box-sizing: border-box;
  width: 260px;
  margin: 100px auto 0;
  box-shadow: 2px 2px 5px 1px rgba(0,0,0,0.2);
  padding-bottom: 40px;
  border-radius: 3px;
  h1 {
    box-sizing: border-box;
    padding: 20px;
  }
}

input {
  margin: 40px 25px;
  width: 200px;
  display: block;
  border: none;
  padding: 10px 0;
  border-bottom: solid 1px $color;
  transition: all 0.3s ease;
  background: linear-gradient(to bottom, rgba(255,255,255,0) 96%, $color 4%);
  background-position: -200px 0;
  background-size: 200px 100%;
  background-repeat: no-repeat;
  color: darken($color, 20%);
  &:focus, &:valid {
    box-shadow: none;
    outline: none;
    background-position: 0 0;
    &::-webkit-input-placeholder {
      color: $color;
      font-size: 11px;
      transform: translateY(-20px);
      visibility: visible !important;
    }
  }
}

button {
  border: none;
  background: $color;
  cursor: pointer;
  border-radius: 3px;
  padding: 6px;
  width: 200px;
  color: white;
  margin-left: 25px;
  box-shadow: 0 3px 6px 0 rgba(0,0,0,0.2);
  &:hover { 
    transform: translateY(-3px);
    box-shadow: 0 6px 6px 0 rgba(0,0,0,0.2);
  }
}
{% endhighlight %}

Here it is in action:

<p data-height="576" data-theme-id="0" data-slug-hash="gbddEj" data-default-tab="result" data-user="mildrenben" class='codepen'>See the Pen <a href='http://codepen.io/mildrenben/pen/gbddEj/'>Material Design Input Text</a> by Ben Mildren (<a href='http://codepen.io/mildrenben'>@mildrenben</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//assets.codepen.io/assets/embed/ei.js"></script>