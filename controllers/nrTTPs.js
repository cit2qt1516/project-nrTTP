var mongoose = require('mongoose');
var bignum = require('bignum');
var NrTTP = mongoose.model('nrMessage');

//GET All
exports.findAllnrTTP = function (req, res) {
    NrTTP.find(function (err, nrTTP) {
        if (err) res.send(500, err.message);

        console.log('GET /nrTTP');
        res.status(200).jsonp(nrTTP);
    });
};

//POST -
exports.addNrTTP = function (req, res) {
    console.log('PASO 3 + PASO 4');
    console.log(req.body);

    var prueba = (req.body.identificador2 + "-" + req.body.paso + "-" + req.body.contenido);

    var nrTTP = new NrTTP({
        identificador1: req.body.identificador1,
        identificador2: req.body.identificador2,
        paso: req.body.paso,
        contenido: req.body.contenido,
        prueba: prueba
    });

    nrTTP.save(function (err, nrttp) {
        if (err) {
            return res.send(500, err.message);
        } else {
            var paso3 = nrttp.paso + 1;
            var prueba3 = (nrttp.identificador1 + "-" + nrttp.identificador2 + paso3 + "-" + nrttp.contenido);
            var nrAll = new NrTTP({
                identificador1: nrttp.identificador1,
                identificador2: nrttp.identificador2,
                paso: paso3,
                prueba: prueba3
            })
            nrAll.save();
            res.status(200).jsonp(nrAll);
        }

    });
};

// A gets its Origin Proof
exports.getPO = function (req, res) {
    console.log('PASO 0 (Prueba Origen A)');

    var prime = bignum.prime(256, true);
    var prime1 = bignum.prime(256, true);
    var prueba = (req.body.identificador2 + "-" + req.body.paso + "-" + req.body.contenido + " -> " + prime*prime1);


    res.status(200).jsonp(prueba);
};

/* ---------------------------------------------------------------------------------------------------------------- */

//GET by ID
exports.findById = function (req, res) {
    NrTTP.findById(req.params.id, function (err, nrTTP) {
        if (err) return res.send(500, err.message);

        console.log('GET /nrTTP/' + req.params.id);
        res.status(200).jsonp(nrTTP);
    });
};

//PUT - Update a register already exists
exports.updateNrTTP = function (req, res) {
    NrTTP.findOneAndUpdate(req.params.id, function (err, nrttp) {
        nrttp.set(function (err) {
            //if(err) return res.send(500, err.message);
            //res.status(200).jsonp(nrttp);
            if (!err) {
                console.log('Updated');
            }
            else {
                console.log('ERROR' + err);
            }
        });
        res.send('Modified');
    });
};

//DELETE -
exports.deleteNrTTP = function (req, res) {
    NrTTP.findOne({"_id": req.params.id}, function (err, nrttp) {
        nrttp.remove(function (err) {
            //if(err) return res.send(500, err.message);
            if (!err) {
                console.log('Object delete');
            }
            else {
                console.log('ERROR: ' + err);
            }
        })
    });
    res.status(200).send('Delete');
};