/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';
/*global URL: true */

var usc = '_', rfs = 'readFileSync', // <-- jslint cheats
  nodeModLib = require('module');

rfs = require('fs')[rfs];

function getLD() { return nodeModLib.Module[usc + 'extensions']; }
function noDot(s) { return s && s.replace(/^\./, ''); }

// Usually I'd rather import is-string and is-fn, but this module is meant
// to help fix imports, so the naive solutions will have to do:
function isStr(x, no) { return (((typeof x) === 'string') || no); }
function ifFun(x, d) { return ((typeof x) === 'function' ? x : d); }


function syncReadTextFile(path, opt) {
  if (isStr(path)) {
    if (!path.startsWith('/')) {
      if (path.startsWith('file:/')) {
        path = new URL(path);
      } else {
        return null;
      }
    }
  }
  if (!opt) { opt = false; }
  return rfs(path, { encoding: (opt.enc || 'utf8') });
}


function updLD(ud) {
  var ld = getLD();
  Object.keys(ud).forEach(function add(key) {
    var val = ud[key];
    key = noDot(key);
    if (!key) { return; }
    val = noDot(val);
    if (!val) { return; }
    if (isStr(val)) {
      val = (ud[val]
        || ud['.' + val]
        || ld['.' + val]);
    }
    if (!val) { return; }
    ld['.' + key] = val;
  });
  return ld;
}


/*
function readAndCompile(modObj, srcFn) {
  var code = rfs(srcFn, 'utf8'), comp = modObj[usc + 'compile'];
  comp.call(modObj, code, srcFn);
}
*/


module.exports = {
  getLD: getLD,
  updLD: updLD,
  syncReadTextFile: syncReadTextFile,
};
