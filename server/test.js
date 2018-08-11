const { tv } = require('./model');

var list = function() {
    return async function(ctx) {
        const { filter, page } = ctx.request.body;
        let res = await getList(filter, page);
        ctx.body = res;
    }
}


var getList = function(filter, page) {
    return new Promise((resolve, reject) => {
        let { name, type } = filter
        let reg = new RegExp(name, 'i') //不区分大小写
        tv.find({
            $and: [{
                type,
                name: { $regex: reg }
            }]
        }, { info: 0, linkList: 0, link: 0 }).sort({ 'updateTime': -1 }).skip(page * 9 || 0).limit(9).exec((err, res) => {
            if (err) { reject(err) }
            resolve(res);
        })

    })
};

module.exports = list