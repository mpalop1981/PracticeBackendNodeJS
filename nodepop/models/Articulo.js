'use strict';

const mongoose = require('mongoose');

const articuloSchema = mongoose.Schema({
    name: String,
    sell: Boolean,
    price: Number,
    image: String,
    tags: [String],
}, {

});

articuloSchema.statics.lista = function(filters, skip, limit, select, sort){
    console.log(filters);
    const query = Articulo.find(filters);
    query.skip(skip);
    query.limit(limit);
    query.select(select);
    query.sort(sort);
    return query.exec();
}

const Articulo = mongoose.model('Articulo', articuloSchema);

module.exports = Articulo;