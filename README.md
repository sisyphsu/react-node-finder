# react-node-finder

Extend tree operation of React Component, such as findChildren/findParent etc

## Support

This module used lots of **private attribute** of React.

so **This module can only works on some specific version, but I will do my best to support all newest React**.

- [x] react (15.2.1) + react-native (0.30.0)

## Foreword

I love React, but the `Communication between Components` is too weak. For ordinary development , it's ok. But if you want to do something flexible, like plugin/framework/etc, it's almost impossible. Maybe Facebook guys just want us to repeat props/state as much as we can, maybe they doesn't want us to build smart-plugin based on React. (；′⌒`)

I have checked the new `Context-Tech`. Honestly, It is weak too! You have to define `childContextTypes` and `getChildContext` in owner, maybe this is acceptable. But why do I have to define `contextTypes` in Ownee-Compoenent again and again and again? Why do you force us to repeat and repeat and repeat ? **The Worst Is**, `Context` only works in `Owner-Ownee` structure, it doesn't work in `Parent-Children` structure, Is it stupid ?

In many issues, I saw many people asked **_"How can I find parent/child node, etc"_**.  Then some other guys would answer him _**"You use it wrong, You didn't need find, Use props/state, etc"**_.

Why we must use props/state in any case? It is not freedom!
  
So, I made this module, let you can use `findChildren/findParent/etc` in React would.
Just like in other Grown-Up would, be free.

## Usage

Install `react-node-finder`:

```bash
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

## Benefit

If you cann't get benefit of finder, just keep read.

### Smart-Form

If there are lots of form in your application, then you will repeat lots like this:

```js
<Form>
    <Input onChange={(field)=>{
        this.state.fieldName = field;
        this.validate...
    }/>
    <Submit onClick={()=>{
        var {filed1, field2, field3...} = this.state;
        let params = {field1, field2, field3};
        ajax(api, params, callback);
    }}/>
</Form>
```

Use `react-node-finder`, you can make the code above real simple, just like:

```js
<Form onSubmit={(params)=>{/* do submit request */}}>
    <Input name='username' pattern={/^\w{2,20}$/}/>
    <Submit/>
</Form>
```

Above 3-lines code done really much work, like:
+ Auto collect params, doesn't need write any `onChange`
+ Auto validate value, before submit, `Form` could notice `Input` to validate itself.
+ Auto response Submit's onClick, `Submit` could notice `Form` to do submit when it is clicked.

You just need write `Form`, `Input`, `Submit` one time, and use it every, no more onChange, no more onClick, no more repeat.

### Smart Callback

You can do some trick like this:

```js
import * as finder from 'react-node-finder';
(<Application>
    <Header>
        <ExitBtn onClick={()=>{
            finder.findParent(this, Application).doExit();
        }}></ExitBtn>
    </Header>
    <Body>
        <SideMenu></SideMenu>
        <Main></Main>
    </Body>
</Application>)
```

This example is a bad case, but if component tree is too deep, and you need the deepest component to callback root component, what can you do? 

Maybe best option is to redesign application's structure, but you can alse do some trick like above.

## Notice

**This module just begin, It haven't finish yet, Please do not use it in product environment**
