const Koa = require("koa");
const Router = require('@koa/router');
const logger = require("koa-logger")
const bodyParser = require('koa-bodyparser')
const ytdl = require("ytdl-core-discord")
const app = new Koa();
const router = new Router();

router.post("/youtube", async (ctx, _) => {
  const body = ctx.request.body
  // get the url
  const url = body.videoURL
  const videoInfo = await ytdl.getBasicInfo(url);

  ctx.body = videoInfo
});

app.use(logger())
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000)