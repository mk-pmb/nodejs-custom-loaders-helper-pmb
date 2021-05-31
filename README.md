
<!--#echo json="package.json" key="name" underline="=" -->
nodejs-custom-loaders-helper-pmb
================================
<!--/#echo -->

<!--#echo json="package.json" key="description" -->
Hide some ugly but necessary parts of node.js loader API.
<!--/#echo -->



API
---

This module exports an object that holds these functions:



### getLD()

Returns a dictionary that maps filename extensions to loaders.
(LD = loaders dictionary)



### updLD(dict)

Update the LD with entries from `dict`.
Each key should be a filename extension, leading dot is optional.
Each value should be either a loader function,
or a filename extension (leading dot optional)
that is known in `dict` (priority) or the LD (fallback).



### syncReadTextFile(url[, opt])

Very thin wrapper around `readFileSync`,
mostly to hide the "Sync" from jslint.

If `url` starts with…
* `/`, it's assumed to mean a local file path.
* `file:/` (optionally followed by more slashes),
  tries to construct a local file path from it.
* anything else, flinches silently, returning `null`.

`opt` is an optional options object that supports these optional keys:

* `enc`: Encoding (charset) of the file. Default: `'utf8'`











Usage
-----

:TODO:



<!--#toc stop="scan" -->



Known issues
------------

* Needs more/better tests and docs.




&nbsp;


License
-------
<!--#echo json="package.json" key=".license" -->
ISC
<!--/#echo -->
