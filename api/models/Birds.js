/**
 * Birds.js
 *
 * @description :: Birds properties for the api
 */

module.exports = {
	autoCreatedAt: false,
	autoUpdatedAt: false,
  attributes: {
    name:{
	type: "string",
      unique: true,
      required: true},
    family:{
	 type: "string",
     required: true},
    continents:{
	type: "array",
      required: true},
    visible:{
	type: "boolean",
	defaultsTo:false
	},
	added: {
        type: 'datetime',
        defaultsTo: function() {return new Date();}
    }
  }
};

