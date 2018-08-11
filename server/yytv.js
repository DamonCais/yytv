const path = require('path')

const Koa = require('koa')
const static = require('koa-static')

var cors = require('koa-cors');

const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const app = new Koa()

app.use(bodyParser());
const staticPath = '../dist'
app.use(static(
    path.join(__dirname, staticPath)
))


app.use(cors());

app.use(async(ctx, next) => {

    try {
        ctx.error = (code, message) => {
            if (typeof code === 'string') {
                message = code;
                code = 500;
            }
            ctx.throw(code || 500, message || '服务器错误');
        };
        await next();
    } catch (e) {
        console.log(e);
        let status = e.status || 500;
        let message = e.message || '服务器错误';
        ctx.response.status = status
        ctx.response.body = { message }
    }
});



let router = new Router();


router.post('/list', require('./list')())
router.post('/detail', require('./detail')())


app.use(router.routes());

app.listen(8081);
console.info('Now running on localhost:8081');