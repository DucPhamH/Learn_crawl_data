const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const port = 4000;
const morgan = require("morgan");

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());
app.use(cors());
app.use(morgan("combined"));

const rp = require("request-promise");
const cheerio = require("cheerio");
const fs = require("fs");

const URL = `https://monngonmoingay.com/lau-vit-tia-to/`;

const options = {
  uri: URL,
  transform: function (body) {
    //Khi lấy dữ liệu từ trang thành công nó sẽ tự động parse DOM
    return cheerio.load(body);
  },
};

(async function crawler() {
  try {
    // Lấy dữ liệu từ trang crawl đã được parseDOM
    var $ = await rp(options);
  } catch (error) {
    return error;
  }

  const title = $(".block-nguyenlieu ul li").text().trim();
  console.log(title);

  // test thử data
  const data = {
    duc: "duc",
  };
  // cứ thêm dòng này khi chạy npm start là nó cứ reset đi reset lại
  fs.writeFileSync("data.json", JSON.stringify(data));
})();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
