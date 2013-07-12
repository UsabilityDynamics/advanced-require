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
require( 'abstract' ).createModel( function AdvancedRequire( model, prototype ) {

  // Model Exposure
  module.exports = model;
  
  // Properties: Constructor
  model.defineProperties( this, {} );
  
  // Properties: Instance
  model.defineProperties( prototype, {} );
  
  // Instance Constructor
  model.defineInstance( function modelInstance( options ) {
    var Instance = this;

    return Instance;
  });
  
});

