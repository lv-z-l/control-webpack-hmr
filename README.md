# control-webpack-hmr

help you pause webpack's hmr with your code. Once hmr is started, any tasks that were paused will be executed.

# Usage

Normally, once installed, you can use it like this:

```js
// pause hmr
process.env.DELAY_CALL_COMPILE = true

// restart
process.env.DELAY_CALL_COMPILE = false

```

The internal default is to determine if hmr can be executed every 2 seconds, which you can customize via process.env.DELAY_CALL_TIMEOUT

```js
process.env.DELAY_CALL_TIMEOUT = 1000
```

# limits

- package manager: npm | yarn, pnpm not support!

- webpack version: 4.x.x
