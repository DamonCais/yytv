const { tv } = require('./model');



var getMovie = function(page) {
    return new Promise((resolve, reject) => {
        tv.find({}, { info: 0, linkList: 0, link: 0 }).where('type').in(['剧情片', '动作片', '喜剧片', '爱情片', '科幻片', '恐怖片', '战争片']).sort({ 'updateTime': -1 }).skip(page * 9 || 0).exec((err, res) => {
            if (err) { reject(err) }
            resolve(res);
        })

    })
};


var getTv = function(page) {
    return new Promise((resolve, reject) => {
        tv.find({}, { info: 0, linkList: 0, link: 0 }).where('type').in(['国产剧', '港台剧', '欧美剧', '日韩剧']).sort({ 'updateTime': -1 }).skip(page * 9 || 0).exec((err, res) => {
            if (err) { reject(err) }
            resolve(res);
        })

    })
};

var getAnimation = function(page) {
    return new Promise((resolve, reject) => {
        tv.find({}, { info: 0, linkList: 0, link: 0 }).where('type').in(['动漫']).sort({ 'updateTime': -1 }).skip(page * 9 || 0).exec((err, res) => {
            if (err) { reject(err) }
            resolve(res);
        })
    })
};

var getVariety = function(page) {
    return new Promise((resolve, reject) => {
        tv.find({}, { info: 0, linkList: 0, link: 0 }).where('type').in(['综艺']).sort({ 'updateTime': -1 }).skip(page * 9 || 0).exec((err, res) => {
            if (err) { reject(err) }
            resolve(res);
        })
    })
};

var getDetail = function(id) {
    return new Promise((resolve, reject) => {
        tv.findOne({ 'detailId': id }).exec((err, res) => {
            if (err) { reject(err) }
            resolve(res);
        })
    })
};

var getTest = function(filter, page) {
    return new Promise((resolve, reject) => {
        tv.find(filter, { info: 0, linkList: 0, link: 0 }).sort({ 'updateTime': -1 }).skip(page * 9 || 0).limit(9).exec((err, res) => {
            if (err) { reject(err) }
            resolve(res);
        })

    })
};
(async() => {
    let filter = {
        $and: [{ type: ["剧情片", "动作片"] }, { name: { $regex: /多/ } }]
    };
    console.log(filter);
    let a = await getTest(filter, 0);
    console.log(a);

    // tv.find({}, { info: 0, linkList: 0 }).where('type').in(['动作片', '剧情片']).sort({ 'updateTime': -1 }).exec((err, res) => {
    //     console.log(res[0]);
    // })
})()