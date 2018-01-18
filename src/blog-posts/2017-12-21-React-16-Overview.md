---
title: React 16 and 16.2 Overview - Fragments, Portals and Error Boundaries
published: true
description: 
tags: [javascript, beginner, tutorial, guide]
date: 2017-12-21
---

React 16 (and 16.2) adds some nice quality of life changes along with some performance gains.

## Return types and Fragments

There's a whole slew of new return types in the render method.

You can now return a string or number.
```javascript
const Foo = () => 'string'

const Foo = () => 25
```

Often you end up wrapping a group of items in a `div` or `span` tag because React requires a wrapping element. React 16 introduced the ability to return arrays of items. 
```javascript
const Foo = () => ([
	<p key='a'>1</p>,
	<p key='b'>2</p>,
	<p key='c'>3</p>,
	<p key='d'>4</p>,
  "Some words"
])
```

But that kind of sucks as you need to add a key to each item, seperate each item by a comma and text must be wrapped in quotes. Yuck.

React 16.2 builds on `React.Fragment` to make a really nice way to wrap a group of items without the extra DOM node.

```javascript
import React, { Fragment } from 'react'

const Foo = () => (
	<Fragment>
		<p>1</p>
		<p>2</p>
		<p>3</p>
		<p>4</p>
	</Fragment>
)
```

There is also a shorthand way of writing `Fragment` which doesn't require the import.

```javascript
import React from 'react'

const Foo = () => (
	<>
		<p>1</p>
		<p>2</p>
		<p>3</p>
		<p>4</p>
	</>
)
```

This does look a little funky I'll admit, but I think once we've gotten used to it we won't know how we lived without it! Babel will support the `<>` shorthand syntax in v7. See this [blog post](https://reactjs.org/blog/2017/11/28/react-v16.2.0-fragment-support.html) for support in various tools. You can use the imported `Fragment` component right now on Babel 6.x.

One thing to note is that you still need to key `Fragment`s when you map over data and such. The shorthand `<>` does not accept the `key` attribute unfortunately.

```javascript
import React, { Fragment } from 'react'

const Foo = () => (
	<Fragment>
		{[1, 2, 3].map(n => (
			<Fragment key={n}>
				<span>hello</span>
				<span>world {n}</span>
			</Fragment>
		))}
	</Fragment>
)
```

The above code will produce an HTML output of this:
```html
<span>hello</span>
<span>world 1</span>
<span>hello</span>
<span>world 2</span>
<span>hello</span>
<span>world 3</span>
```

Finally no more wrappers cluttering our DOM 🎉

## Error Handling

Prior to React 16, when something went wrong with a component the whole application could crash and it was only visible in the console. That's why packages like [redbox-react](https://www.npmjs.com/package/redbox-react) get over a million downloads a month!

To solve this issue, we now have Error Boundaries using a new `componentDidCatch` lifecycle event.

You can wrap potentially breaking components in Error Boundaries and then configure them to show fallback UI if they do break.

I modified a component that the official React blog supplies for an Error Boundary that will work in basically any app.

```javascript
import React from 'react'
import PropTypes from 'prop-types'

class ErrorBoundary extends React.Component {
	constructor(props) {
		super(props)
		this.state = { hasError: false }
	}

	componentDidCatch(error, info) {
		// Display fallback UI
		this.setState({ hasError: true })
		// You can also log the error to an error reporting service
		// Remove this if you have no error logging
		logErrorToMyService(error, info)
	}

	render() {
		const { children, errorMessage } = this.props
		if (this.state.hasError) {
			// You can render any custom fallback UI
			return <h1>{errorMessage}</h1>
		}
		return {children}
	}
}

ErrorBoundary.defaultProps = {
	errorMessage: 'Something went wrong.'
}

ErrorBoundary.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]).isRequired,
	errorMessage: PropTypes.string
}

export default ErrorBoundary
```

You then just wrap that around anything you think will fail.

```javascript
const foo = () => (
  <div>
    <ErrorBoundary errorMessage='This component is not working properly'>
      <UnstableComponent>
    </ErrorBoundary>
  </div>
)
```

![ErrorBoundaries in action](https://i.imgur.com/6YItkVZ.gif)

Remember we can customise the UI, it's not just a message. So you could have some really cool fallback content for components.

Things to note:

* `componentDidCatch` works just like a regular old `catch {}` block
* Error Boundaries must be class components
* Error Boundaries can only catch errors from their children, not errors from themselves

## Portals

Portals provide us with the ability to render things in other DOM nodes outside of the parents scope.

This opens up some really cool possibilites for things like modals, dialog boxes, tooltips etc.

I've seen many different systems for modals in React across many projects and I never feel like anyone has gotten in right, and that's likely because React didn't have the tools to do it right. Now with Portals we might be able to solve this problem. There's no more passing a function all the way through your React tree or using context.

Portals can be used with the simple `ReactDOM.createPortal(child, container)` function.

```javascript
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

const Bar = () => (
	<p>Through the portal</p>
)

class ContactScreen extends Component {
	constructor(props) {
		super(props)
		this.nav = document.querySelector('nav')
	}
	render() {
		return ReactDOM.createPortal(
			Bar,
			this.nav
		)
	}
}
```

`child` can be any valid React component and `container` can be any DOM node.

When using styled components or any other css in js system, you're classnames will end up being all mangled strings. It might be worth adding an ID to these components so you can portal to them should you need it.

Of course, this isn't just reserved for existing DOM nodes. You can create one on the fly and insert it yourself into the DOM.


## Custom DOM attributes

Previously, you could only use DOM attributes that actually existed, along with `aria-` and `data-` prefixed attributes. Now you can use any custom attribute and it'll get passed through to the real DOM element.

```javascript
<div foo='bar' />
```

## Server Side Rendering

Server side rendering is not something I've used personally before, so I won't try to act like I know a lot about it. We did use it at a previous company I worked for, but I wasn't involved in the process. So here's a [really good article about what's changed in SSR in React 16](https://hackernoon.com/whats-new-with-server-side-rendering-in-react-16-9b0d78585d67). (TLDR: it's more performant)

## Miscellaneous

* It got smaller. React + React DOM is now ~30% smaller than before.
* They changed the license to MIT 🎉

## Further Reading

* [React 16 official blog](https://reactjs.org/blog/2017/09/26/react-v16.0.html)
* [React 16.2 official blog](https://reactjs.org/blog/2017/11/28/react-v16.2.0-fragment-support.html)