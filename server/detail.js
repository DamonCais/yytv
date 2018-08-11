const { tv } = require('./model');

var detail = function() {
    return async function(ctx) {
        const { id } = ctx.request.body;
        let res = await getDetail(id);
        ctx.body = res;
    }
}

var getDetail = function(id) {
    return new Promise((resolve, reject) => {
        tv.findOne({ 'detailId': id }).exec((err, res) => {
            if (err) { reject(err) }
            resolve(res);
        })
    })
};

module.exports = detail