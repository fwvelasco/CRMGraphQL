const mongoose = require('mongoose');

const ProductosSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    existencia: {
        type: Number,
        required: true,
        trim: true  //trim elimina los espacione en blancoo antes y despues de lo ingresado
    },
    precio: {
        type: Number,
        required: true,
        trim: true
    },
    creado: {
        type: Date,
        default: Date.now()
    }
});

ProductosSchema.index({ nombre: 'text' });

module.exports = mongoose.model('Producto', ProductosSchema);