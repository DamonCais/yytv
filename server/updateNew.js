const { tv } = require('./model');
const axios = require('axios');
const cheerio = require('cheerio');




var getRes = function(url) {
    return new Promise((resolve, reject) => {

        axios.get(url).then(res => {
            let $ = cheerio.load(res.data);
            let arr = [];
            $('.xing_vb ul').each(function(i, item) {
                if ($(this).find('li span').hasClass('xing_vb4')) {
                    let vb4_name = $(this).find('li .xing_vb4 a').text();
                    // console.log(vb4_name)
                    let vb4_link = $(this).find('li .xing_vb4 a').attr('href');
                    let reg = /\d+/;
                    let detailId = vb4_link.match(reg)[0];
                    let vb5_type = $(this).find('li .xing_vb5').text();
                    let vb6_time = $(this).find('li .xing_vb6').text() || $(this).find('li .xing_vb7').text();
                    arr.push({ name: vb4_name, detailId, link: vb4_link, type: vb5_type, updateTime: vb6_time })
                }
            })

            resolve(arr);
        }).catch(err => {
            console.log(url + 'errRes');

            reject(err);
        })
    })
};
var getDetail = function(item) {
    return new Promise((resolve, reject) => {
        let url = 'http://www.zuidazy.net' + item.link;
        axios.get(url).then(res => {
            let $ = cheerio.load(res.data);
            item.img = $('.vodImg img').attr('src');
            item.info = $('.vodInfo').html();
            let linkList = [];
            console.log(item.name);
            $('.vodplayinfo').find('li').each(function(i, it) {
                linkList.push($(this).text());
            })
            item.linkList = linkList;
            resolve(item)
        }).catch(err => {
            console.log(item.name + 'errDetail');
            reject(err);
        })

    })
};
var schedule = require('node-schedule')
var rule1 = new schedule.RecurrenceRule();
var times1 = [1, 6, 10, 12, 16, 19, 22];
// rule1.second = times1;
rule1.hour = times1;

schedule.scheduleJob(rule1, function() {

    (async() => {
        let url;
        let errArr = [];

        // try {
        for (let pg = 1; pg < 4; pg++) {
            if (pg === 1) {
                url = 'http://www.zuidazy.net/'
            } else {
                url = `http://www.zuidazy.net/?m=vod-index-pg-${pg}.html`
            }
            let arr;

            try {
                arr = await getRes(url);

            } catch (error) {
                arr = []
                errArr.push(pg);
                continue;
            }
            // console.log(arr.length);
            for (var i = 0; i < arr.length; i++) {
                try {
                    arr[i] = await getDetail(arr[i]);
                    var conditions = { detailId: arr[i].detailId };
                    var update = { $set: arr[i] };
                    var options = { upsert: true };
                    await tv.update(conditions, update, options);
                } catch (error) {
                    break;

                }
                // console.log(arr[i])
            }
        }



    })()
})