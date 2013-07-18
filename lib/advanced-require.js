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
require( 'abstract' ).createModel( module.exports = function advancedRequire( model, prototype ) {

  // Require Utils
  var _extend = require( 'util' )._extend;
  var join_path = require( 'path' ).join;
  var fs = require( 'fs' );

  // Properties: Constructor
  advancedRequire.defineProperties( model, {
    realpath: function realpath() {

      var _path = arguments.length > 1 ? join_path.apply( {}, arguments ) : arguments[0];

      return fs.realpathSync( _path );

    },
    watchTree: function watchTree( root, options, callback ) {
      return require( 'watch' ).watchTree( root, options, callback );
    },
    createMonitor: function createMonitor( root, options, callback ) {
      return require( 'watch' ).createMonitor( root, options, callback );
    },
  });

  // Instance Constructor
  model.defineConstructor( function load( dir, opts, depth ) {
    var Instance = this;

    depth = depth + 1 || 0;

    opts = _extend({
      'duplicates': false,
      'recurse': true,
      'ignoreDotFiles': true,
      'depth': 5,
      'ignore': [ '.svn', '.git', '.DS_Store' ],
      'extensions': Object.keys( require.extensions ),
      'logger': undefined
    }, opts );

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

      // Skip "dot" files
      if( opts.ignoreDotFiles && require( 'path' ).basename( base )[0] === '.' ) {
        continue;
      }

      filesForBase[base] = filesForBase[base] || [];

      if( filesForBase[base].push ) {
        filesForBase[base].push( file );

      }

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

