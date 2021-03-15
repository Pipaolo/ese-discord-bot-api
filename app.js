const YTSearchAPI = require("youtube-search-api");
const Koa = require("koa");
const Router = require("@koa/router");
const logger = require("koa-logger");
const bodyParser = require("koa-bodyparser");
const ytdl = require("ytdl-core-discord");
const app = new Koa();
const router = new Router();

router.post("/youtube", async (ctx, _) => {
  const body = ctx.request.body;
  // get the url
  const url = body.videoURL;
  const videoInfo = await ytdl.getInfo(url);

  ctx.body = videoInfo;
});

router.get("/youtube-search", async (ctx, _) => {
  const { searchTerm } = ctx.request.body;
  const { items: searchResults } = await YTSearchAPI.GetListByKeyword(
    searchTerm
  );

  // Only fetch video results
  // we dont need channels
  const filteredResults = searchResults.filter(
    (result) => result.type === "video"
  );

  ctx.body = filteredResults ? filteredResults : [];
});

app.use(logger());
app.use(bodyParser());
app.use(router.routes());
app.use(router.allowedMethods());

console.log("Server running at localhost:4040");
app.listen(4040);
