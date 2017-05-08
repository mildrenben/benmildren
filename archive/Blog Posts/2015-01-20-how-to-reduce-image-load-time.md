---
layout: post
title:  "How to Reduce Image Load Times"
date:   2015-01-20 18:56:00
categories: Coding
---

This portfolio and blog you're looking at now was only built recently. I have since been battling with page load speeds, and trying to shave off precious milliseconds here and there to make the experience snappier.

Whilst it may seem that this site is simple, and thus shouldn't be taking long to load, the one thing that will always kill page load speed is images.

Images account for around 60-70% of web bandwidth now, which is an enormous amount. The first question you need to ask yourself is: do I even need to include this image? Does it add anything to my site that couldn't be conveyed with words? If you're adding pictures just for the sake of it, you'll be weighing your web pages down & making your users wait longer for no real reason.

Now, let's move on to the real tips.

---

## File Type

This might seem an obvious one to some people, but it's worth exploring even if you're more experienced.

Times have changed, jpeg and PNG are not the only viable formats now. We have SVG and data URI at our disposal.

### jpeg

If you have a color image, you're often better to use jpeg. Depending on how you compress the image, you may see jpeg artifacts. Most images are fine at around 80% jpeg quality and won't show obvious artifacts.

jpeg is a lossy format and will get worse and worse the more you save it.

Color change is also something to watch out for. You might notice your images colors getting slightly warmer or colder; you need to check which color profile you're using when saving a jpeg.

Progressive JPEGs are generally marginally smaller than baseline JPEGs, but their main advantage is that they appear in stages, giving the effect of the image fading in, as opposed to painting from the top down.

**Conclusion** - Best for images with lots of natural tone, changing colors and are often smaller in size. Worse results for flat color and sharp-edge art.

### PNG

The portable network graphic is fantastic for retaining transparency in images, something that jpeg cannot do. It is also lossless format, which means it won't lose quality the more you save it.

PNGs compress both horizontally and vertically, so solid blocks of color and sharp corners generally compress best.

**Conclusion** - If you have an image which needs transparency, try PNG. Also best for solid color blocks.

### GIF

GIFs can contain a maximum of 256 colors, and are therefore best for images that contain simple shapes, a limited color palette, text and other elements as opposed to photos.

Like PNGs, GIF files support transparency.

The major advantage, and probably the only time you'll use GIF is because you can animate images.

**Conclusion** - You should probably only use GIFs for animation.

### Data URI

Sending multiple requests to your server for different images is one of the main website slowdowns nowadays, and Data URI can help greatly with this. There is also CSS Sprites which can help, but I'll address that later in the post.

Data URI can be used for any type of image and you don't need to link to an external resource! Simple run your image through a converter, like this one, and copy paste in the seemingly gibberish characters to your HTML or CSS.

Whilst you will be saving load time due to removing the need to request a file from your server, the code size for Data URIs is often greater than that of the original resource. So long as the HTML or CSS file is cached, this shouldn't be too much of an issue.

CSS Tricks shows how to utilise this format.

**Conclusion** - Data URIs can be handy for saving on a bunch of server requests, but it will make your HTML/CSS file very messy as the code for them is so large.

### SVG

Scalable vector graphics are the new cool kid on the block. Although they're not actually that new, initial release in 2001, support for SVGs is now at a level where we can use them freely. Also, with the rise of responsive web design we have more need to use them than ever before.

SVGs are for vector graphics, hence the name. They will weigh considerably less than a PNG or jpeg of the same image. However, their biggest advantage is the fact that they scale perfectly.

Raster images (GIF, PNG and jpeg) are based on pixels. Vector images (SVGs) are based on mathematical equations for lines and curves.

![Raster vs Vector]({{ site.url }}/assets/img/rastervector.png)

**Conclusion** - SVGs only work for vectors, are lightweight and scale to any size without distortion. Perfect for line icons, but like Data URIs they can make your files a bit messy.

---

## Caching

Using your .htaccess file you can tell the browser to cache your image files. The next time someone visits your website, the computer knows that it's already downloaded the images before and just loads them from the cache, greatly reducing requests and time spent downloading.

[This article shows how to leverage the power of caching using a .htaccess file.](http://www.feedthebot.com/pagespeed/leverage-browser-caching.html)

Also, if you're using SVGs or Data URI you need to remember to cache the HTML or CSS files they're being served from.

---

## Compression

The file type section gave a lot of details on which file compression format to choose, but the best thing I can recommend is simply trying stuff out. Save your image as a jpeg and a png and see if there is a noticeable difference in quality and which file is smaller. Also, play around with the settings: could you drop the quality down to 60%? Does anti-aliasing make a noticeable difference? Could you drop from 32bit colors to 24bit, or even grayscale 8bit? Just play around a bit and see what works for you. It's all about balancing file size and image quality.

Despite fiddling with all these settings, I still find it best to run my images through an image compressor. No matter how you save your image, or the settings you use, it'll nearly always come out smaller after being put through an image compressor, with virtually no difference to the picture quality.

A few tools I recommend using:

* [TinyPNG](https://tinypng.com/) - A brilliant PNG compressor.

* [TinyJPG](https://tinyjpg.com/) - From the same guys as TinyPNG, TinyJPG is a brilliant jpeg compressor.

* [ezGIF](http://ezgif.com/) - A great GIF compressor with a plethora of options and settings.

Remember to [Gzip you're files](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer) if you're using SVG or Data URI.

---

## Resizing

Serve only the image size you need. This sounds like an obvious one, but I found myself carelessly writing off images that were slightly bigger than they'd be served at.

I just did a quick test and the background image for this blog when saved at 2100px wide is 1.1mb (FYI, 1.1mb is really big and it's because I haven't fiddled with settings or file types, this is just for example purposes). I resaved it as 1920px wide, and it weighs 920kb. That's an immediate and easy saving of 16.4%, which is nothing to be sniffed at.

Now you're probably thinking 'Well, that's all good for desktop, but I don't want to serve a 1920px wide image to a mobile). This is where [Adaptive Images](http://adaptive-images.com/) comes in.

Adaptive Images is a server side solution to serving up images sized to fit the device. I would say it's absolutely essential for any image heavy websites in todays world.

It will detect the users screen siz, create an appropriately sized image and then serve the user the image size they need, saving the user from downloading unnecessary extra pixels.

For example, the background image for this blog is is 156kb at 1920px wide, but when served to smaller mobiles at <420px wide it comes in at just 8kb wide. That's an astounding saving of 95%.

---

## CSS Sprites

As I've stated before, most of the delay on loading a page is actually multiple requests to the server rather than the file size themselves. How can we go about changing that? CSS Sprites is the answer.

CSS Sprites allow us to group all our images into a single image. We can then select a part of the image for each separate picture we want to display. Doing this means that we only make 1 server request rather than say 10. Considering each server request takes around 300ms for a round trip, that's a lot of potential time savings.

Although, if you have a website where you will continually be adding pictures, like a portfolio, you don't want to have to continually be remaking the base CSS Sprite image over and over to include the new one. That's where the Sass framework Compass comes in.

[Compass will automatically sprite up all your images making it easier than ever to make use of CSS Sprites.](http://compass-style.org/help/tutorials/spriting/)

If Compass isn't really your thing or you don't use Sass, then [you may prefer this Grunt task](https://github.com/Ensighten/grunt-spritesmith).

---

I hope this post has been of help to you and if you have any queries or questions do not hesitate to [get in touch with me on Twitter](https://twitter.com/mildrenben).
