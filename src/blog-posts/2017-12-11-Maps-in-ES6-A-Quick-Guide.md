---
title: Maps in ES6 - A Quick Guide
published: true
description: 
tags: [javascript, beginner, tutorial, guide]
date: 2017-12-11
---

## Overview

Maps and Sets often get lumped together in articles. They're both new ES6 collection types with similar interfaces but that's where the similarities stop. So it makes sense to have two separate articles on them.

Maps are like the love child of Arrays and Objects with a nice and sane interface. 

You can instantiate one like so:
```javascript
const foo = new Map()
```

In my last article on [Symbols](https://dev.to/mildrenben/symbols-in-es6---a-quick-guide-dhm) we looked at how Objects could use either Strings or Symbols as keys. Well Maps can use any type of data as a key. Use the `.set()` method to add key value pairs.
```javascript
Map.prototype.set(key, value) : this

// as `this` is returned, we can chain the set methods
foo.set(1, 'one')
   .set(null, 'nothing')

const bar = { name: 'Ben' }
foo.set(bar, { age: 25 })
```

You can also pass the constructor a 2D iterable when creating a Map.
```javascript
const foo = new Map([
  [undefined, 'hello'],
  [null, 'nada']
])
```

To retrieve items from a Map use the `.get()` method.
```javascript
Map.prototype.get(key) : any

foo.get(undefined) // 'hello'
```

Unlike Objects (but more like Arrays), Maps have a handy `.size` property.
```javascript
const foo = new Map([
  [1, 1],
  [2, 2]
])

Map.prototype.size : number

foo.size // 2
```

Maps check references to Objects for equality, so using Object literals is a bad idea as you won't be able to retrieve the values.
```javascript
const foo = new Map()

foo.set({}, `you'll never catch me`)

foo.get({}) // undefined
```

There are a number of other useful methods Maps supply.
```javascript
const zoe = { name: 'Zoe' }
const foo = new Map([
  ['hey', 0],
  [9, 'nine'],
  [zoe, { age: 23 }]
])

// .has checks if the collection contains a key
Map.proptype.has(key) : boolean
foo.has(9) // true
foo.has(5) // false


// .delete simply deletes an item
Map.prototype.delete(key) : boolean
foo.size // 3
foo.delete(5) // false
foo.size // 3
foo.delete(9) // true
foo.size // 2


// .clear deletes all values
Map.prototype.clear() : undefined
foo.clear() // undefined
foo.size // 0
```

### Map API Summary

```javascript
const foo = new Map()

foo.set(key, value) 

foo.get(key)

foo.has(key)

foo.delete(key)

foo.clear()

foo.size
```

## Usage

One fantastic advantage Maps have over Objects is how you can iterate over them. They're built to be iterated over with baked in methods like `.forEach` and an iterator protocol for use with `for..of` loops.

They also preserve their order, unlike Objects and more like Arrays. So you can be sure everything is in the correct order.


```javascript
const foo = new Map([
  [1, 'first'],
  [2, 'second'],
  [3, 'third']
])

Map.prototype.forEach(callback(value, key, map), [thisArg]) : undefined

foo.forEach((val, key) => console.log(val, key)) 
// first 1
// second 2
// third 3
```

The `for..of` loop returns each item (including both key and value), not just each value like you might expect.
```javascript
for(let item of foo) {
  console.log(item)
}
// [1, 'first']
// [2, 'second']
// [3, 'third']
```

You can use destructuring to separate the values.
```javascript
for(let [key, val] of foo) {
  console.log(key, val)
}
// 1 'first'
// 2 'second'
// 3 'third'
```

Just like with Objects we get access to `.keys()`, `.values()` and `.entries()`.
```javascript
Map.prototype.keys() : Map iterator
const keys = foo.keys() // 1, 2, 3

Map.prototype.values() : Map iterator
const values = foo.values() // 'first', 'second', 'third'

Map.prototype.entries() : Map iterator
const entries = foo.entries() // [1, 'first'], [2, 'second'], [3, 'third']
```

These methods all return iterator objects. As they all conform to the iterator protocol, they can be used with `for..of`, like a generator or using the `...` spread operator.
```javascript
const keys = foo.keys()
for(let key of keys) {
  console.log(key)
}
// 1
// 2
// 3

const entries = foo.entries()
entries.next() // { value: [1, 'first'], done: false }
entries.next() // { value: [2, 'second'], done: false }
entries.next() // { value: [3, 'third'], done: false }
entries.next() // { value: undefined, done: true }

const values = foo.values()
console.log(...values) // 'first', 'second', 'third'
```

All of the above iteration methods make for a much more well rounded approach to iterating over a key value store, with a wealth of methods and consistent order; considerably better than on an Object.

---

A great use case for Maps is the potential to add metadata to existing objects or attaching some extra data to immutable objects. Symbols are also very good for this, [see my previous article](https://dev.to/mildrenben/symbols-in-es6---a-quick-guide-dhm).

```javascript
const dataObjects = [
  { name: 'Ben', age: 25 },
  { name: 'Zoe', age: 24 },
  { name: 'Roman', age: 50 },
]

const mapObjects = new Map()
dataObjects.forEach(val => mapObjects.set(val, { created: new Date() }))

console.log(mapObjects.get(dataObjects[0])) // [{ name: 'Ben', age: 25 }, { created: Sun Dec 17 2017 11:57:52 GMT+0000 (GMT) }]
```
---

### Should I use a Map or an Object?

After seeing all that Maps can do, you might be thinking: "Will I ever need to use plain old Objects again?"

Let's look at the pros and cons of each:

**Pros**

* Ordered. They stay in order like Arrays and have many iteration methods.
* Objects (or any other type) as keys. Having objects as keys can be super powerful.

**Cons**

* Loses [a lot of Object methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype). Most are very rarely used, but some are handy.
* No fast dot notation, which means no destructuring.

So, if you need to iterate over your object or you want keys that aren't strings, your only option is Maps. If you know the shape of your object and expect it to be static (not adding or removing properties) then an Object might be best.

## Details & Caveats

### What is equal?

Maps use something called [SameValueZero](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness) to determine if a Map has a key.

SameValueZero is very similar to === but has 2 notable differences:

* `NaN` is equal to `NaN`
* `+0` is equal to `-0`

```javascript
NaN === NaN // false

const foo = new Map()

foo.set(NaN, 'hello')
foo.get(NaN) // 'hello'
```

### Non-existant keys

When looking up a key that doesn't exist, `undefined` is returned. You'll need to be aware of this if you might be expecting a return value of `undefined`.
```javascript
new Map().get('notAKey') // undefined
```

### Building from Objects

Object has a handy `.entries()` method which returns the 2D array structure needed for a Map.

```javascript
const foo = { name: 'Ben', age: 25 }
const entries = Object.entries(foo) // [ ['name', 'Ben'], ['age', 25] ]
const foo = new Map(entries)
```

### Weakmaps

Despite being in the Details & Caveats section, WeakMaps are not trivial at all! (I just figured this would be the best place to put them)

WeakMaps are a seperate data type to Maps. Just like their non-weak counterparts except they allow Javascript to remove their keys from memory if required and the keys *must* be objects.

They have a very similar api to Maps, with a few methods removed. These are all the methods WeakMaps have:

```javascript
WeakMap.prototype.get(key) : this
WeakMap.prototype.set(key, value) : this
WeakMap.prototype.has(key) : boolean
WeakMap.prototype.delete(key, value) : boolean
```

Put simply, WeakMaps are basically Maps which allow its own object keys to be garbage collected. This helps with memory leaks.

If a Map has an object as a key and that object gets destroyed, the Map still retains that object as a key and it will stay in memory and won't be garbage collected as it's still "reachable" (don't worry, I'm going to write an article about how garbage collection works soon!). 

```javascript
const foo = new Map()

let bar = { name: 'Ben' }

foo.set(bar, { age: 25 })

foo.get(bar) // { age: 25 }

bar = null

foo.entries() // [ [{ name: 'Ben' }, { age: 25 }] ]
```

Conversely, if a WeakMap has a deleted object as a key, the WeakMap allows the garbage collector to remove that key and it's associated value.

```javascript
const foo = new WeakMap()

// You can only use objects as keys, no primitives
foo.set('primitive', 1) // TypeError: Invalid value used as weak map key

let bar = { name: 'Ben' }

foo.set(bar, { age: 25 })

foo.get(bar) // { age: 25 }

bar = null

// If there are no other reference to bar, it is removed as a key from foo
```

Now, you might be wondering why I didn't show that the WeakMap doesn't retain the `bar` key in the above example, and that's because I can't!

WeakMaps do not have the tools to check, such as `.size`, `.entries()`, `.keys()` or `.values()`. And there is a good reason for this limitation: it wouldn't be _safe_ to show it.

Javascript garbage collects at different times depending on what is executing, how intense current operations are, how much their is to collect, etc. Each Javascript engine handles these things slightly different too. So, although we know the WeakMaps key will be removed by the garbage collector, we do not know exactly when that will run. So it's not safe to use things like `.size` which might tell us we have 1 item one moment and 0 the next due to garbage collection running in the background. 

#### Where to use WeakMaps over Maps

WeakMaps won't see a ton of usage but there will be niche cases where they come in handy.

One potential use case would be in state management where you need an object as a key. Most larger apps have a dedicated library for state management like Redux or Vuex. But maybe for a smaller app, if you were to roll your own state management system it might be handy to use WeakMaps there. Storing objects as keys, but also allowing those object to be garbage collected should they not be required anymore could be quite powerful.

---
 
There is also the possibility of using WeakMaps for private data.

```javascript
const keepOut = new WeakMap()

class Person {
	constructor(name) {
  	keepOut.set(this, { name })
  }
  get name () {
  	return keepOut.get(this)
  }
}

const me = new Person('Ben')

me.name // { name: 'Ben' }
```

As the instance of Person is stored as the key in the WeakMap, the data cannot be accessed without having that instance of Person.

---

I mentioned above about using Maps to add metadata to objects or simply extend objects that couldn't be extended. WeakMaps are very handy for doing this with DOM elements.

```javascript
const myH1 = document.querySelector('h1')
const myImg = document.querySelector('img')

const domElems = new Map([
  [myH1, { created: new Date() }],
  [myImg, { someExtraData: 'foo' }]
])
```
Now you can track extra data along with the DOM elements and the WeakMap will allow them to be garbage collected when the DOM elements are no longer needed!