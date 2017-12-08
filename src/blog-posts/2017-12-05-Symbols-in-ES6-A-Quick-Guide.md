---
title: Symbols in ES6 - A Quick Guide
published: true
description: 
tags: [es6, javascript, js, symbols, symbol, beginner, tutorial, guide]
date: 2017-12-7
---

## Overview

Symbols are a new primitive type introduced in ES6.

Symbols are completely unique identifiers. Just like its primitive counterparts, they can be created using the factory function `Symbol()` which returns a `Symbol`

```javascript
const foo = Symbol()
```

The two variables below, `foo` and `bar` are not the same, they are both unique. Imagine a really long random string is return by each `Symbol()` call.

```javascript
const foo = Symbol()

const bar = Symbol()

foo === bar // false

// I imagine Symbols looking like this 'NqkvK1kq7q#R99l9&7YH*@7wa8cFJc'
```

It takes an optional description argument, used only for debugging purposes.

```javascript
const foo = Symbol('foo')
```

Unlike its counterparts (Boolean, Number and String), Symbols do not have a literal nor can they be used as a constructor.

```javascript
const foo = new Symbol()
// TypeError: Symbol is not a constructor
```


## Usage

Symbols primary use case is for making _private_ object properties, which can be only of type String or Symbol (for those curious, Numbers are automatically converted to Strings).

```javascript
const sym = Symbol()

const foo = {
  [sym]: 'someValue'
}

foo[sym] // 'someValue'
```

Using Symbols for object properties is handy for _hiding_ certain properties that might name clash with other libraries. 

---

They're also very useful for defining metadata on an object, as Symbols are not enumarable and as such they are iterated over when using a `for...of` loop and other functions that return object properties.

```javascript
const sym = Symbol()

const foo = {
  name: 'Ben',
  age: 25,
  [sym]: 'someHiddenMetadata'
}

for(let val of foo) {
  console.log(val) // Ben, 25
}

Object.getOwnPropertyNames(foo) // Ben, 25

Object.keys(foo) // Ben, 25
```

Symbols as object properties are not completely hidden though, hence why I've been italicising _hidden_ in this article. You can still access Symbols by using the following methods:

```javascript
Object.getOwnPropertySymbols(foo) // Symbol()

Reflect.ownKeys(foo) // Symbol()
```

So, they're not entirely private, but they are skipped in common iteration cycles.

--- 

Just as you'd expect they can also be used for any object property name, including methods.

```javascript
const bar = {
  [Symbol('method')] () { 
    console.log('hello')  
  }
}
```

--- 

### Usage without objects

Although the main application for Symbols seems to be as object property names, they could have value elsewhere, most notably as a replacement for String in constants.

Lots of projects have a set of constants that looks something like this:

```javascript
const ARTICLE1 = 'ARTICLE1'
const ARTICLE2 = 'ARTICLE2'
const ARTICLE3 = 'ARTICLE3'
```

These constants might then be used in another file making a request as such:

```javascript
import * as c from './constants'

const getRequestURL = req => {
  switch(req) {
    // Standard articles
    case c.ARTICLE1: {
      // do stuff
      return `https://api.com/${c.ARTICLE1}`
    }
    case c.ARTICLE2: {
      // do stuff
      return `https://api.com/${c.ARTICLE2}`
    }
    case c.ARTICLE3: {
      // do stuff
      return `https://api.com/${c.ARTICLE3}`
    }
    // Articles written by users get handled here
    default: {
      // do stuff
      return `https://api.com/userGeneratedContent/${req}
    }
  }
}
```

Obviously the above is quite a contrived example but you get the picture. A lot of frontend apps are structured similarly to this.

Let's imagine that by chance someone named the title of their article 'ARTICLE1'. It would not get to the `default` function of the switch statement where it wants to be, it would be intercepted above. You can see that because our constants are not unique, they can interact in unexpected ways.

The solution to this issue is using Symbols as constants.

```javascript
const ARTICLE1 = Symbol('ARTICLE1')
const ARTICLE2 = Symbol('ARTICLE2')
const ARTICLE3 = Symbol('ARTICLE3')
```

Now there is no possible way these constants can conflict with another constant.

## Details & Caveats

### Global Symbols

Global Symbols go against a seemingly fundamental part of the whole point of Symbols: they're not unique. But they do have a purpose.

A Global Symbol Registry exists where you can store and access Global Symbols. You can use the `Symbol.for(key)` method to both create and access Global Symbols.

```javascript
const foo = Symbol.for('hello') // If the Symbol does not exist, it's created

const bar = Symbol.for('hello') // The Symbol exists, so it is returned

foo === bar // true
```

Note that the `key` here is not an optional description like in regular Symbols, it is an identifier.

You can do a reverse look up for Global Symbols if you have the Symbol itself and want the key.

```javascript
const foo = Symbol.for('someKey')

const bar = Symbol.keyFor(foo) // someKey
```

Global Symbols exist across _realms_. A realm is a context in which code exists, almost like a scope. Modules, global variables etc. all exist _within_ realm. Each frame in a browser is in its own realm, so iFrames have a different context to your main frame. Global Symbols actually do exist across realms and can be used between them.

### "Well Known" Symbols
They are now known as unique symbols, and their only use is to avoid name clashes between properties. For example, EcmaScript itself can now introduce extension hooks via certain methods you can put on objects (e.g. to define their iteration protocol) without running the risk of clashing with user names.

There are a number of "Well Known" Symbols baked right into javascript and they all have specific functions. 

The most useful of these so called "Well Known" Symbols is `Symbol.iterator`, which allows us to make our own objects iterable. The `for...of` loop calls `Symbol.iterator` to iterate over a set of values.

[MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator) provides this simple example to show how you'd use `Symbol.iterator`.

```javascript
var myIterable = {}
myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
};
[...myIterable] // [1, 2, 3]
```

You can see a full list of "Well Known" Symbols [right here](https://tc39.github.io/ecma262/#sec-well-known-symbols).

### No auto conversion to String

Unlike many other types, Symbols do not auto convert to a String. You may not have even noticed this was happening for other types, but think about when you alert() a Number, or alert() an Array. They get auto converted to a string.

Symbols don't support this. You must explicitly call the `.toString()` method
This funcionality is here to help us, as usually they should not be converted.
```javascript
const sym = Symbol();
const foo = '' + sym
// TypeError: Cannot convert a Symbol value to a string

alert(sym)
// TypeError: Cannot convert a Symbol value to a string

alert(sym.toString()) // Symbol()
```

Due to this, you need to use square brackets within object literals, like so `const foo = { [Symbol()]: 'hey' }`.

### When are they copied?

Symbols are copied in both the `Object.assign` andthe object spread operator `{ ... }`.

```javascript
const sym = Symbol('hey')

const a = { [sym]: 'a' }

const b = { ...a } // { Symbol('hey'): 'a' }

const c = Object.assign(a, {}) // { Symbol('hey'): 'a' }
```

## Further Reading

- [Symbols in ECMAScript 6 by 2ality](http://2ality.com/2014/12/es6-symbols.html)
- [Metaprogramming in ES6 by Keith Cirkel](https://www.keithcirkel.co.uk/metaprogramming-in-es6-symbols/)