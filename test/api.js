/**
 * Advanced Require API
 *
 * mocha test/api.js --reporter list --ui exports --watch
 *
 * @author potanin@UD
 * @date 7/11/13
 * @type {Object}
 */
module.exports = {

  'Advanced Require API': {

    'has expected methods.': function() {
      var ar = require( '../' );

      // Constructor tests
      ar.should.be.a( 'function' );

      // Inherited Abstract methods
      ar.should.have.property( 'load' );
      ar.should.have.property( 'use' );
      ar.should.have.property( 'get' );
      ar.should.have.property( 'set' );

      // Prototypal Methods
      ar.should.have.property( 'prototype' );

    },

    'can load modules with load().': function() {

      var instance = require( '../' ).load( './', { recurse: false });

      // Instate tests
      instance.should.be.a( 'object' );

      instance.should.have.property( 'index' );
      instance.should.have.property( 'package' );
      instance.should.have.property( 'yuidoc' );

    },

    'realpath() joins and resolves': function() {

      // should resolve to /static/assets
      require( '../' ).realpath( 'static' );
      require( '../' ).realpath( 'static', 'assets' );

    }

  }

};