---
title: Sets in ES6 - A Quick Guide
published: true
description: 
tags: [javascript, beginner, tutorial, js]
date: 2017-01-18
---

## Overview

Sets are a new data type in ES6.

They're similar to Arrays with one major difference, each value must be unique. They have an API that's very similar to [Maps](https://dev.to/mildrenben/maps-in-es6---a-quick-guide-35pk). They're a little bit simpler than Maps though so don't worry!

Sets are instantiated as you'd expect: either empty or with an iterable.
```javascript
const foo = new Set()

const foo1 = new Set([1,2,3,4,5])
```

You can add to the Set with the `.add()` method. As it returns `this`, you can chain them.
```javascript
Set.prototype.add(value) : this

foo.add('hello')

foo.add('hey there')
   .add('yo')
```

You can also check to see if a value exists with `.has()` method.
```javascript
Set.prototype.add(value) : boolean

foo.has('yo') // true

foo.has('greetings') // false
```

You may have noticed a pattern with this API in comparison to Maps now and removing items is no different with the `.delete()` and `.clear()` methods. `.remove()` returns a boolean depending on if the value existed or not.
```javascript
Set.prototype.delete(value) : boolean

foo.remove('yo') // true

foo.remove('greetings') // false

Set.prototype.clear() : undefined

foo.clear() // undefined
```

The static property `.size` returns the amount of items in the Set.
```javascript
Set.prototype.size : number

const bar = new Set([1,2,3,4,5])

bar.size
```

### Set API Summary

There a few other methods for iteration which we'll cover in the next section, but these are the basics.
```javascript
const foo = new Set()

foo.add(key, value) 

foo.get(key)

foo.has(key)

foo.delete(key)

foo.clear()

foo.size
```

## Usage

### Special snowflake

Remember the big difference between Arrays and Sets? In a Set, a value cannot occur more than once. So each value is definitely unique. This immediately has some fantastic use cases. I know I've certainly reached for Lodash's `_.uniq` functions before, well now you don't need to.

```javascript
const myArray = [1,1,2,2,3,3]

const mySet = new Set(myArray)

const uniqueArray = [...mySet]
```

This is pretty powerful, although it would be nice for Arrays to have a built in method for this function. (Side note: `...` and `Array.from` are the slowest methods to do this, with `for...of` being the quickest on modern browsers. This is a real shame as the first 2 are so much cleaner. [Source](https://jsperf.com/set-iterator-vs-foreach/4))

### Iteration

Something not immediately obvious is that you cannot retrieve values from a Set using the Array index method `[n]`. This is because Sets are not indexed.

The only way to use the values in a Set is through iteration, and for this reason they're stored in insertion order. You can use the `.forEach()` method to iterate over a Set.

```javascript
const foo = new Set(1,2,3,4)

Set.prototype.forEach(callback(val1, val2, Set), [thisArg]) : undefined

foo.forEach(i => console.log(i)) // 1, 2, 3, 4
```

Strangely, the callback you pass to `.forEach()` accepts 3 arguments. Both of the first 2 args are the same thing: the value. I imagine they duplicated the value to conform with the same API that Maps have (where they have a key and a value). The third value is the current Set you're iterating over. A number of methods have this argument, and I've never figured out why (please comment if you know why). Finally, you can optionally set the value of `this`.

Sets also use the iterator protocol which allows you to use Sets with `for...of` loops.

```javascript
for (let i of foo) {
  console.log(i) // 1, 2, 3, 4, undefined
}
```

---

Maps have a `.keys()`, a `.values()` and a `.entries()` method. Sets do not have keys so they do not have a `.keys()` method, but they do have the other two.

```javascript
Set.prototype.values() : Set iterator

const vals = foo.values() // SetIterator {1,2,3,4}

for (let val of vals) {
  console.log(val) // 1, 2, 3, 4
}

Set.prototype.entries() : Set iterator

const ents = foo.entries() // SetIterator {1,2,3,4}

for (let ent of ents) {
  console.log(ent) // [1, 1], [2, 2], [3, 3], [4, 4]
}
```

---

### Should I use an Set or a Array?

When we asked a similar question for [Maps and Objects](https://dev.to/mildrenben/maps-in-es6---a-quick-guide-35pk), Maps seemed like the better choice quite often, but it was a pretty good split on pros and cons for the pair of them. Unfortunately for Set, I think the answer here is much more one sided. 

Arrays are _almost_ always more useful in every day life. Sets having only unique items within them is definitely helpful, I just don't see many more things that I'd honestly pick a Set for over an Array. Sure, there are certain situations where Sets excel, but they're so few and far between that I'd reach for an Array basically every time.

That said, do read the details and caveats below as there are definitely certain situations where a Set is more performant or more practical.


## Details & Caveats

### What is equal?

Like Maps, Sets use something called [SameValueZero](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness) to determine if a Set has a value.

SameValueZero is very similar to === but has 2 notable differences:

* `NaN` is equal to `NaN`
* `+0` is equal to `-0`

```javascript
NaN === NaN // false

const foo = new Set()

foo.add(NaN)
foo.size // 1

foo.add(NaN)
foo.size // 1
```

### Using Array methods

Converting between Sets and Arrays is so easy, using Array methods on Sets is easy!

```javascript
const foo = new Set([2,1])

const sortedArray = [...foo].sort()

const sortedSet = new Set(sortedArray) // 1, 2
```

Or even shorted (but slightly less clear)
```javascript
const foo = new Set([2,1])

const sortedSet = new Set([...foo].sort()) // 1, 2
```

### WeakSet

WeakSets are a separate data type, but they are very similar to Sets.

This is the full WeakSet API:
```javascript
WeakSet.prototype.add(value) : this
WeakSet.prototype.delete(value) : boolean
WeakSet.prototype.has(value) : boolean
```

As we can see, this just like the Set API but with a few things removed. 

It is worth noting that `WeakSet.prototype.clear()` used to be apart of the spec, but has been removed. Although this may work with certain browsers, you should not use this as it will be unsupported soon.

There are two fundamental differences between WeakSets and Sets:

- You can only add objects to WeakSets, no primitives
- WeakSets allow their values to be garbage collected

Let's see the first point in action: no primitives.
```javascript
const foo = new WeakSet()

foo.add(1) // TypeError: Invalid value used in weak set

foo.add('hello') // TypeError: Invalid value used in weak set

foo.add({}) // ✅
```

That's straightforward, but the second point is a little harder to grasp without good understanding of how garbage collection works in modern browsers (I'll be writing a blog about that shortly).

Browsers hold on to objects in memory for as long as they think that object is "reachable". If you were to store a value in a Set, and that value became unreachable anywhere else, it'll still be reachable in the Set and thus the garbage collector will not remove it from memory.

```javascript
const foo = new Set()

let someObj = { name: 'Ben' }

foo.add(someObj)

someObj = null

foo.size() // 1
```

In the above example, `foo` holds on to the value and stops it being garbage collected. WeakSets hold on to their values _weakly_ and will allow garbage collectors to remove them.

```javascript
const foo = new WeakSet()

let someObj = { name: 'Ben' }

foo.add(someObj)

someObj = null
```

Unfortunately, there is no way to check that the object has been removed from `foo`, but rest assured it will be once a garbage collection happens.

WeakSets have such a tiny API that I cannot see many every day use cases for them. There is potentially some very niche cases such as marking certain items. Say you need to know if you've marked an item that you've previously iterated over. You could add another property to the object or you could add that item to a WeakSet.

```javascript
const foo = new WeakSet()

const someArr = [
  { name: 'Ben' },
  { name: 'Zoe' },
  { name: 'Roman' }
]

for (let value of someArr) {
  // Flipping a coin
  if(Math.random > 0.5) {
    foo.add(value)
  }
}

// You can check later if that value got a heads or tails
foo.has(someArr[0])
```

Assuming that item becomes unreachable in the future, it will also be removed from the WeakSet.

This all feels like a stretch to me if I'm honest. It just feels like I would basically never reach for a WeakSet. I'd love for someone to comment and let me know some use cases for WeakSets.


