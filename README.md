# stilr-update

**DEPRECATED:** Please check out
[chcokr/babel-plugin-stilr-classnames](https://github.com/chcokr/babel-plugin-stilr-classnames)
instead which can achieve the same hot-loading dream and much more.
This library depended on a [PR to stilr](https://github.com/kodyl/stilr/pull/19)
that never went through, so it doesn't work.
It was never published to npm.

The function returned by this module creates a listener on [Stilr's `"update"`
event]() that adds any previously unobserved style rules to `<head>`.
These new style rules are autoprefixed.


```JS
import attachStilrUpdater from 'stilr-update';

if (process.env.NODE_ENV !== 'production') {
  attachStilrUpdater();
}
```

This handler is useful especially in the context of [Webpack's hot module
replacement](http://webpack.github.io/docs/hot-module-replacement.html).
Once you invoke `attachStilrUpdater()`, any changes to your Stilr style
definitions will hot-reload on your browser!

## Options

```JS
attachStilrUpdater(options)
```

`options.autoprefixer` is passed directly into the autoprefixer that is used
internally.
For example:
```JS
attachStilrUpdater({
  autoprefixer: {
    browsers: ['last 1 version']
  }
});
```
See [autoprefixer docs](https://github.com/postcss/autoprefixer#options) for a
full list of options.

`options.onNew: function (newPrefixedCSS)` defines a callback that invokes
whenever previously unobserved style rules are found.
`newPrefixedCSS` is a string of just the new style rules, with autoprefixing
done.
Keep in mind that this callback does not invoke when there are no new rules.
