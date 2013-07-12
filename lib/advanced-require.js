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

  // Properties: Constructor
  model.defineProperties( model, {
    load: function() {},
    files: function() {},
    monitor: function() {}
  });
  
  // Properties: Instance
  // model.defineProperties( prototype, {} );
  
  // Instance Constructor
  model.defineInstance( function create( options ) {
    var Instance = this;

    return Instance;

  });
  
});

