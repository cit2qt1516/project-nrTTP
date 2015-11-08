exports = module.exports = function(app, mongoose) {

    var nrMessageSchema = new mongoose.Schema({
        identificador1: 		{ type: String },
        identificador2: 		{ type: String },
        paso: 		{ type: Number },
        contenido: 	{ type: String },
        prueba:  	{ type: String }
    });

    mongoose.model('nrMessage', nrMessageSchema);
};