# react-node-finder

Extend tree operation of React Component, such as findChildren/findParent etc

## Introducation

I love React, but the `Communication between Components` is too weak, maybe Facebook guys just want us to repeat props/state as much as we can.

I have checked the new `Context-Tech`, honestly, It is weak too! You have to define `childContextTypes` and `getChildContext` in OWNER, and define `contextTypes` in every OWNEE. Why make us repeat again?  

The worst is, `Context` only works in `Owner-Ownee` structure, doesn't work in `Parent-Children` structure. It is so stupid!  

In many issues, I saw many people asked "How can I find parent/child node, etc". others would tell him "Maybe you use it wrong.", "You didn't need.", I was mad about those answer.
  
SO, I make this module, you guys can use `findChildren/findParent/etc` in React would, just like other grown-up would.

## Usage

Install `react-node-finder`:

```shell
npm install react-node-finder --save
```

Use `react-node-finder` in your code:

```js
import * as finder from 'react-node-finder';

var node = component;  // Must be react component.

finder.findAllParent(node);         // Find all parent/owner Component, until root.
finder.findAllParent(node, View);   // Find all parent/owner View Component, until root.

finder.findParent(node);            // Find first parent/owner Component.
finder.findParent(node, Form);      // Find first parent/owner Form Component.

finder.findAllChildren(node);           // Find all children Component.
finder.findAllChildren(node, Input);    // Find all children Input Component.
```

## Example

TODO

## Notice

** This module haven't finish yet, Do not use it in product environment **