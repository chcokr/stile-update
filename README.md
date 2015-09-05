# stilr-update

The function returned by this module creates a listener on [Stilr's `"update"`
event]() that adds any previously unobserved style rules to `<head>`.
These new style rules are autoprefixed.


```JS
import attachStilrUpdater from 'stilr-hot-load';

if (process.env.NODE_ENV !== 'production') {
  attachStilrUpdater();
}
```

Once you do that, any changes to your Stilr style definitions will hot load on
your browser!

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
