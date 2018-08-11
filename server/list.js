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
        let { name, type, ids } = filter
        type = type ? type : ["剧情片", "动作片", "喜剧片", "爱情片", "科幻片", "恐怖片", "战争片", "国产剧", "港台剧", "欧美剧", "日韩剧", "综艺", "动漫"];
        let whereArr = [{ type }];
        if (name) {
            let reg = new RegExp(name, 'i'); //不区分大小写
            whereArr.push({ name: { $regex: reg } })
        }
        if (ids) {
            whereArr.push({ detailId: ids })
        }
        tv.find({
            $and: whereArr
        }, { info: 0, linkList: 0, link: 0 }).sort({ 'updateTime': -1 }).skip(page * 9 || 0).limit(9).exec((err, res) => {
            if (err) { reject(err) }
            resolve(res);
        })

    })
};
module.exports = list