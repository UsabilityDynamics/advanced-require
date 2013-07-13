/**
 * AdvancedRequire Module
 *
 * -
 *
 * @module advanced-require
 * @constructor
 * @author potanin@UD
 * @date 7/12/13
 * @type {Object}
 */
require( 'abstract' ).createModel( function advanced_require( model, prototype ) {

  // Model Exposure
  module.exports = model;

  // Configure module
  model.set( 'create_method', 'load' );

  // Model Resources
  // model.use( require( 'eventemitter2' ).EventEmitter2.prototype );

  // Properties: Constructor
  model.defineProperties( model, {
    modules: function( dir, opts ) {
      return model.load( dir, opts );
    },
    files: function() {
      return model.load( dir, opts );
    },
    monitor: function() {
      return model.load( dir, opts );
    },
    utility: require( 'abstract' ).utility
    //maxListeners: 50,
    //delimiter: ':',
    //wildcard: true,
    //listenerTree: {}
  });
  
  // Instance Constructor
  model.defineInstance( function load( dir, opts, depth ) {
    var Instance = this;

    depth = depth + 1 || 0;

    opts = require( 'abstract' ).utility.defaults( opts || {}, {
      'duplicates': false,
      'recurse': true,
      'depth': 5,
      'ignore': [ '.svn', '.DS_Store' ],
      'extensions': Object.keys( require.extensions ),
      'logger': undefined
    });

    // Ensure Extensions are Always in Array Form
    opts.extensions = typeof opts.extensions === 'string' ? [ opts.extensions ] : opts.extensions;
    opts.ignore = typeof opts.ignore === 'string' ? [ opts.ignore ] : opts.ignore;

    var files = [];

    try {

      // resolve the path to an absolute one:
      dir = require( 'path' ).resolve( dir );
      files = require( 'fs' ).readdirSync( dir );

      if( !files.length ) {
        throw new Error( 'No files found.' )
      }

    } catch( error ) {

      if( error.code === 'ENOENT' ) {

        if( opts.logger && opts.logger.error ) {
          opts.logger.error( error.message );
        }

        return;

      }

    }

    var filesForBase = {};

    for( var i = 0; i < files.length; i++ ) {
      var file = files[i];

      var ext = require( 'path' ).extname( file );
      var base = require( 'path' ).basename( file, ext );

      // Only Get Selected File Extensions
      if( ext && opts.extensions.indexOf( ext ) < 0 ) {
        continue;
      }

      // Explicitly Exclude Specific File Names
      if( base && opts.ignore.indexOf( base ) > -1 ) {
        continue;
      }

      (filesForBase[base] = filesForBase[base] || []).push( file );

    }

    for( var base in filesForBase ) {

      // protect against enumerable object prototype extensions:
      if( !filesForBase.hasOwnProperty( base ) ) {
        continue;
      }

      var files = filesForBase[base];
      var filesMinusDirs = {};

      for( var i = 0; i < files.length; i++ ) {
        var file = files[i];
        var path = require( 'path' ).resolve( dir, file );

        if( require( 'fs' ).statSync( path ).isDirectory() ) {

          if( opts.recurse && opts.depth >= depth ) {

            Instance[base] = model.load( path, opts, depth );

            // if duplicates are wanted, key off the full name too:
            if( opts.duplicates ) {
              Instance[file] = Instance[base];
            }
          }

        } else {
          filesMinusDirs[file] = path;
        }
      }

      if( Instance[base] && !opts.duplicates ) {
        continue;
      }

      opts.extensions.forEach( function( ext ) {

        if( !require.extensions.hasOwnProperty( ext ) ) {
          return;
        }

        var file = base + ext;
        var path = filesMinusDirs[file];

        if( path ) {

          if( opts.duplicates ) {

            Instance[file] = require( path );

            if( !Instance[base] ) {
              Instance[base] = Instance[file];
            }

          } else {

            try {
              Instance[base] = require( path );

            } catch ( error ) {

              if( opts.logger && opts.logger.error ) {
                opts.logger.error( error, path )
              }

            }


          }

          if( Instance[base] ) {

            Object.defineProperties( Instance[base], {
              '__path': {
                'enumerable': false,
                'writable': true,
                'configurable': true,
                'value': require.resolve( path )
              },
              '__directory': {
                'enumerable': false,
                'configurable': true,
                'writable': true,
                'value': require( 'path' ).dirname( require.resolve( path ) )
              }
            });


          }

        }

      });

    }

    return Instance;

  });
  
});

