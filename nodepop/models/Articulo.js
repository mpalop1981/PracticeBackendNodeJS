'use strict';

const mongoose = require('mongoose');

const articuloSchema = mongoose.Schema({
    name:{type: String, index:true},
    sell:{type: Boolean, index:true},
    price:{type: Number, index:true},
    image:{type: String, index:true},
    tags: [String],
}, {

});

const Articulo = mongoose.model('Articulo', articuloSchema);

module.exports = Articulo;