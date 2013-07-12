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
require( 'abstract' ).createModel( function AdvancedRequire( AdvancedRequire, prototype ) {

  // Model Exposure
  module.exports = AdvancedRequire;
  
  // Model Resources
  AdvancedRequire.use( require( 'async' ) );
  AdvancedRequire.use( require( 'abstract' ).utility( 'json', 'where' ) );
  
  // Model Dynamic Services
  module.cache = require( 'object-workflow' ).cache;
  module.cache = require( 'object-workflow' ).queue;
  
  // Properties: Constructor
  AdvancedRequire.defineProperties( this, {} );
  
  // Properties: Instance
  AdvancedRequire.defineProperties( prototype, {} );
  
  // Instance Constructor
  AdvancedRequire.defineInstance( function AdvancedRequireInstance( options ) {   
    var Instance = this;

    // Instance Resources  
    AdvancedRequire.use( require( 'abstract' ).utility( 'where', 'if' ) );

    // Add Instance to Cache
    cache.set( Instance.get( 'id' ), Instance )
  
  });
  
});

