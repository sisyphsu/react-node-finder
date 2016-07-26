# react-node-finder
Extend tree operation of React Component, such as findChildren/findParent etc

## Usage

Install `react-node-finder`:

```shell
npm install react-node-finder --save
```

Use it in your code:

```js
import * as finder from 'react-node-finder';

var node = component;  // Must be react component.

finder.findAllParent(node);         // Find all parent/owner Component, until root.
finder.findAllParent(node, View);   // Find all parent/owner View Component, until root.

finder.findParent(node);            // Find first parent/owner Component.
finder.findParent(node, Form);      // Find first parent/owner Form Component.

finder.findAllChildren(node); // Find all children Component.
finder.findAllChildren(node, Input); // Find all children Input Component.
```

## TODO
