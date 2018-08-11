const axios = require('axios');
const cheerio = require('cheerio');




var movie = function() {
    return async function(ctx) {
        const { id, page } = ctx.request.body;
        let url;
        let pg = Math.ceil(page / 5)
        if (pg === 1) {
            url = `http://zuidazy.net/?m=vod-type-id-${id}.html`
        } else {
            url = `http://www.zuidazy.net/?m=vod-type-id-${id}-pg-${pg}.html`
        }
        let arr = await getRes(url, page);

        for (var i = 0; i < arr.length; i++) {
            arr[i] = await getDetail(arr[i]);
        }
        ctx.body = arr;
    }
}

var getRes = function(url, page) {
    return new Promise((resolve, reject) => {
        let max = page * 10;
        let min = (page - 1) * 10;
        axios.get(url).then(res => {
            let $ = cheerio.load(res.data);
            let arr = [];
            $('.xing_vb ul').each(function(i, item) {
                if ($(this).find('li span').hasClass('xing_vb4')) {
                    let vb4_name = $(this).find('li .xing_vb4 a').text();
                    let vb4_link = $(this).find('li .xing_vb4 a').attr('href');
                    let vb5_type = $(this).find('li .xing_vb5').text();
                    let vb6_time = $(this).find('li .xing_vb6').text();
                    arr.push({ name: vb4_name, link: vb4_link, type: vb5_type, time: vb6_time })
                }
            })

            resolve(arr.filter((item, i) => i >= min && i < max));
        })
    })
}
var getDetail = function(item) {
    return new Promise((resolve, reject) => {
        let url = 'http://www.zuidazy.net' + item.link;
        axios.get(url).then(res => {
            let $ = cheerio.load(res.data);
            item.img = $('.vodImg img').attr('src');
            item.info = $('.vodInfo').html();
            let href = [];
            console.log($('.vodplayinfo').find('li').length);
            $('.vodplayinfo').find('li').each(function(i, item) {
                href.push($(this).text());
            })
            item.href = href;
            resolve(item)
        })

    })
}

module.exports = movie