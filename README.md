# jQuery prettyPre

A jQuery plugin intended to strip out leading whitespace in blocks of code.

## HTML's helpful, but double edged, preformatting sword

Ever construct some incredibly beautiful HTML:

```html
<body>
    <p>Guys, omg, check out how awesome I am:</p>
    <pre>
        <code>
            $('.hey').useMyLibrary({
                myHeadHurts: true
            });
        </code>
    </pre>
</body>
```

Only to find out that your document looks like insane garbage?

```html
Guys, omg, check out how awesome I am:


            $('.hey').useMyLibrary({
                myHeadHurts: true
            });

```

## Sad!

__With jQuery prettyPre() you can worry no longer about your nutso, malformed documents!__

Stop reflowing your documents to look like this:

```html
<body>
    <p>I've now found the cure for fun:</p>
    <pre><code>
$('.help').iveNeverBeenMoreDepressed({
    inMyWholeLife: true
});</code></pre>
</body>
```

And write markup like the unchained beast that you know are!

## How?

Simply jam this code wherever you jam your JavaScript code!

```js
$('pre').prettyPre({
    type: '\t' // if you're into that sort of thing, but the default is ' '
})
```

## Have your cake formatted and eat it too!

Brought to you by [this guy](https://github.com/orazionelson/prettypre) and also [me](https://github.com/meowsus).

# Contribute!

1. Fork this repo
2. Make a branch
3. Wiggle your fingers
4. Write a Test (in `test.js`) and/or add a Demo (in `demo.html`)
5. Run the tests (`npm test`)
6. Submit a PR
7. Gleefully run around your house when it's merged
