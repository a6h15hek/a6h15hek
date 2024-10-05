`---
unique_id: ID29-09-2024
type: blog
published_on: 29 September 2024
title: React Notes
description: React Notes
keywords: react, notes
draft: true
---

# React JS
It's a library, not a framework.

### Framework vs Library
- **Framework**: Provides a complete structure and guidelines for building applications. It often dictates the architecture and flow.
- **Library**: Offers specific functionality that can be used within an application. It gives more flexibility and control to the developer.

### React vs Vue vs Angular
- **React**: A library for building user interfaces with a component-based architecture. It uses a virtual DOM for efficient updates.
- **Vue**: A progressive framework for building user interfaces. It is designed to be incrementally adoptable.
- **Angular**: A full-fledged framework for building web applications. It includes everything needed for large-scale applications.

### Virtual DOM in React
- **DOM**: A tree structure representing the UI.
- **Virtual DOM**: A lightweight copy of the real DOM. React updates the virtual DOM first and compares it with previous DOM and then applies the minimal changes to the real DOM using a diffing algorithm.

### Reconciliation
- The process of updating the real DOM based on changes in the virtual DOM. React uses a diffing algorithm to find the differences and update only the necessary parts.

### React Fiber
- A reimplementation of React's core algorithm for rendering. It allows React to split rendering work into chunks and prioritize updates, improving performance.

### Promise Implementation, Async Await
- **Promise**: An object representing the eventual completion or failure of an asynchronous operation.

```javascript
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Done!"), 1000);
  });
  promise.then(result => console.log(result)); // "Done!"

```

### Debounce and Throttle
Debounce: Ensures a function is only called after a certain period of inactivity.

```
function debounce(func, delay) {
    let timeout;
    return function(...args) {
    clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
    };
}
```


Throttle: Ensures a function is called at most once in a specified period.

```
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}
```

### Ref
Data changes in React via props and state only, but with ref, you can directly access a component, similar to getElementById.

### Event Loop in JavaScript
The mechanism that allows JavaScript to perform non-blocking operations by offloading operations to the system kernel whenever possible.

### let vs var vs const
let: Block-scoped variable.
var: Function-scoped variable.
const: Block-scoped constant.

Block Scoping in ES6
Variables declared with let and const are block-scoped, meaning they are only accessible within the block they are defined.

### Closure
A function that retains access to its lexical scope even when the function is executed outside that scope.
JavaScript
```javascript
function outer() {
let count = 0;
return function inner() {
        count++;
        console.log(count);
    };
}
const counter = outer();
counter(); // 1
counter(); // 2
```


### Pure Functions
Functions that return the same output for the same input and have no side effects.
It does not modify the global state. It is not affected the global state.


### this Keyword, Call, Bind, Apply
this: Refers to the object that is executing the current function.
call: Invokes a function with a specified this context and arguments.

```javascript
function greet() {
    console.log(this.name);
}
const person = { name: 'Alice' };
greet.call(person); // Alice
```


bind: Creates a new function with a specified this context.

```javascript
const boundGreet = greet.bind(person);
boundGreet(); // Alice
```

apply: Similar to call, but takes an array of arguments.
JavaScript
```javascript
greet.apply(person, []); // Alice
```