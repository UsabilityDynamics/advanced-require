Installing
----------

Latest released version:

    npm install advanced-require

Latest devevelopment code code:

    npm install https://github.com/UsabilityDynamics/advanced-require/tarball/master

Methods
-------
The module exports a constructor which defaults to load() method. 
All "loading" methods will accept a callback function which will be called on each module found for special handling.

  - load( path ): Load a module or a directory.
  - modules( path ): Loads all immediate modules within a specified path.
  - fetch( path ): Finds all immediate modules within a specified path, creates a reference object, but does not require.
  - module( path ): Load a single module - if module not found at give path will traverse up the directory chain looking for a match.
  - defaults( config ): Configure module settings and default options.

Events
------
The module emits events when regarding certain modules, as per configuration, if they are watched.

  - module:deleted: Module / file has been removed from disk.
  - module:updated: Module has been updated.
  - package:updated: Module's package has been updated.
  - package:deleted: Module's package has been deleted.

Basic Usage
-----------

Load all modules/files in the parent directory

```js
var module = require( 'advanced-require' ).load( '../' );
```

Settings
--------
The module settings can be configured via .defaults(), below are the default settings:

  - duplicates: false
  - recurse: true
  - depth: 5
  - watch: false
  - extensions: [ 'js', 'json', 'coffee' ]
  - exclude: [ '.svn', '.git' ]
  - logger: undefined

License
-------

(The MIT License)

Copyright (c) 2013 Usability Dynamics, Inc. &lt;info@usabilitydynamics.com&gt;

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
'Software'), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
