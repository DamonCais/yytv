var mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/yytv')

// media
var tvSchema = new mongoose.Schema({

    detailId: String,
    name: String,
    link: String,
    info: String,
    type: String,
    updateTime: String,
    img: String,
    linkList: Array

})

mongoose.model('tv', tvSchema, 'tv')
var tv = mongoose.model('tv')

var errSchema = new mongoose.Schema({

    pageList: Array

})

mongoose.model('errList', errSchema, 'errList')
var errList = mongoose.model('errList')


module.exports = {
    tv,
    errList
}