Animator
=============

JavaScript wrapper for CSS3  Animation (@keyframes).

Usage
-----

```javascript
let animation = new Animator(el, options)
```

### `Arguments`

- `el` - DOM Element or css selector

- `options` - Can be array or object. Use CSS animation and @keyframes properties. See the example
- `options.keyframes` - Can use the following keys: from, to, <percentage>.

Example
-----

Also see the demo.

```html
<!-- Default style -->
<style>
    width:  200px;
    height: 200px;
    position: absolute;
    background: red;
    display: inline-block;
</style>

<div id="box"></div>
```

```javascript
let el = new Animator(
            document.getElementById('box'),
                {
                    name: 'animator',
                    delay: '-1s',
                    playState: 'running',
                    direction: 'alternate',
                    duration:  '3s',
                    fillMode:  'forwards',
                    iterationCount: 'infinite',
                    timingFunction: 'linear',
                    keyframes: {
                        '0%': {
                            top: 0,
                            left: 0,
                            width: '200px',
                            height: '200px',
                            background: 'red',
                            transform: 'rotate(0deg)'
                        },
                        '50%': {
                            top: '250px',
                            left: '200px',
                            width: '180px',
                            height: '180px',
                            background: '#0b9882',
                            transform: 'rotate(90deg)'
                        },
                        '100%': {
                            top: '0',
                            left: '500px',
                            width: 0,
                            height: 0,
                            background: 'blue',
                            transform: 'rotate(180deg)'
                        }
                    }
                }
        );
```

### `Methods`

```javascript
animation.play();
animation.pause();
animation.toggle();
animation.seek(value);
```
