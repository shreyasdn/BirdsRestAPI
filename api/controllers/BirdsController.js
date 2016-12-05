/**
 * BirdsController
 *
 * @description :: Server-side logic for managing birds
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
blueprintFind = require("../../node_modules/sails/lib/hooks/blueprints/actions/find");
module.exports = {
	
	find:function(req,res,next){
		req.options.where = {"visible":true};
		blueprintFind(req,res,true);
		
	}
};

