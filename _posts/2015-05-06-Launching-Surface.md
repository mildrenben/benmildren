---
layout: post
title:  "Launching Surface"
date:   2015-05-06 18:00:00
categories: Coding
---
Following my post on [the making of my framework](http://benmildren.com/coding/2015/05/02/The-Making-Of-Surface.html), it has now launched.

##Surface has lifted off!

First and foremost, check it out here at [iamsurface.com](http://iamsurface.com/).

Let's review what went well, what went wrong and what the future will hold.

---

###What went right?

####CSS only
The biggest limitation I placed upon myself was the CSS only rule. I figured it might be impossible to achieve all the features that I felt were necessary for a framework using only CSS, or SCSS to be more specific. But I was pleasantly surprised at the extent to which you can take CSS.

The most limiting factor is the fact that CSS doesn't really have any on/off states...except for checkboxes and radio buttons. So I abused the hell out of them!

####The size of Surface
In total, including all the features, Surface weighs in at ~ 5.7kb minified and gzipped. That is absolutely tiny and I couldn't be happier with this result. 

This was such a major accomplishment for me, considering how large the neighbouring frameworks are. I posted this list in the [last blog post](http://benmildren.com/coding/2015/05/02/The-Making-Of-Surface.html), but I'll throw it in here as well:

 - Bootstrap - 174kb minified. No fonts. 1 dependency. 5 files.

 - Foundation - 483kb minified. No fonts. 5 dependencies. 8 files.

 - Materialize - 252kb minified. No fonts. 1 dependency. 3 files.

 - Surface - 5.7kb minified and gzipped. No fonts. 0 dependencies. 1 file.
 
Not only is the file size considerably smaller than the rest of the big gunner frameworks out there today, but the dependencies and amount of files are less too.

####Reception
I immediately posted Surface to a bunch of places on the web once I had launched it. Places like Reddit, Designernews and Twitter.

Where did it do best? Reddit. It's always Reddit. I frickin' love the Reddit community.

[/r/web_design post](http://www.reddit.com/r/web_design/comments/34r3ly/introducing_surface/)

[/r/webdev post](http://www.reddit.com/r/webdev/comments/34r3n6/introducing_surface/)

####Metrics

![Metrics 1]({{ site.url }}/assets/img/surface_metrics.png)
![Metrics 2]({{ site.url }}/assets/img/surface_metrics_2.png)
![Metrics 3]({{ site.url }}/assets/img/surface_metrics_3.png)

---

###What went wrong?

####The name
What a collosal mistake I made with the name.

Of course, I was well aware of the Microsoft product of the same name when considering names, I just didn't feel that it would be that big of a deal to use the same name for my framework. Boy was I wrong.

My thought process was: 

- The framework is based on Material Design, and a surface is a material (kind of)

- A surface is a metaphor for foundations, something you can build on top of

- It's a cool name


The feedback received:

 - Searching for anything related to Surface will be eclipsed by Microsoft's Surface.
 
 - Because of the unintentional connotations of the relationship with Microsoft's product, people were expecting Surface to be a spin on the Metro design style, not Material.
 
I was hoping this was a spin on the Metro design language given the name, but then it's Material (which in some ways is a spin on the Metro design language, which is a spin on Swiss design). So...a Microsoft name and a Google design language. So confusing.

The above is a comment from one of the Reddit posts.

###The future
All in all, Surface was a great success. You'll notice that the only thing I really felt went wrong was the choice of name.

Despite the name, Surface was an excellent learning experience for myself and hopefully I'll have helped others with a tidy, lightweight framework going forward.

####Extra features
Whilst the CSS only rule was fun, to really move Surface forward I feel I must embrace Javascript. If I do ditch the CSS rule, I'll be sure to use Javascript in a super light fashion also.

Features I'd like to include:

 - Carousel
 
 - Page transitions

 - More animations

The Github repo for Surface has already had a few pull requests merged and issues fixed. I won't be abandoning Surface anytime soon, and hope to really expand on it over the next year or so.

####The name
I would like to change the name. After the large backlash it received, it makes sense to change it's name. But when?

As more and more time elapses, the harder it will be to change the name as it will take on a brand identity of its own.

So this is a big maybe...I'm not sure if it'll happen.

---

Overall, I hope you enjoy [Surface](http://www.iamsurface.com) and find uses for it. I also would like to thank my loyal fans over at [Livecoding](http://livecoding.tv) for watching me and helping me along the way.

If you'd like to follow my future projects, I stream most evenings on Livecoding, you can find my stream here.