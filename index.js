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
const arrayLink = require("./arrayLink");
console.log(arrayLink);

// const URL = `https://monngonmoingay.com/tim-kiem-mon-ngon/page/1/`;

// console.log(URL);

// let data = [];

// const options = {
//   uri: URL,
//   transform: function (body) {
//     //Khi lấy dữ liệu từ trang thành công nó sẽ tự động parse DOM
//     return cheerio.load(body);
//   },
// };

// (async function crawler() {
//   try {
//     // Lấy dữ liệu từ trang crawl đã được parseDOM
//     var $ = await rp(options);
//   } catch (error) {
//     return error;
//   }

//   const title = $(".list-recipes > div");

//   for (let i = 0; i < title.length; i++) {
//     const infoFood = $(title[i]);
//     const linkFood = infoFood.find(".info-list").find("a").attr("href");
//     const titleFood = infoFood.find(".info-list").find("a").text().trim();
//     let linkImage = infoFood
//       .find(".text-center")
//       .find(".img-fluid")
//       .attr("data-lazy-src");
//     // console.log(titleFood);
//     if (linkImage === undefined) {
//       console.log(linkImage);
//       linkImage =
//         "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg";
//     }

//     data.push({
//       linkFood,
//       titleFood,
//       linkImage,
//     });
//   }
//   console.log(data);

//   // cứ thêm dòng này khi chạy npm start là nó cứ reset đi reset lại
//   const dataJson = JSON.stringify(data);
//   fs.writeFileSync("data.json", dataJson);
// })();
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function crawler() {
  await sleep(1000);
  for (i in arrayLink) {
    const linkchay = arrayLink[i];

    try {
      const options = {
        uri: linkchay,
        transform: function (body) {
          //Khi lấy dữ liệu từ trang thành công nó sẽ tự động parse DOM
          return cheerio.load(body);
        },
      };
      var $ = await rp(options);
    } catch (error) {
      console.log("Link dang dung:" + arrayLink[i]);
      return error;
    }

    const title = $(".list-recipes > div");
    let data = [];

    for (let i = 0; i < title.length; i++) {
      const infoFood = $(title[i]);
      const linkFood = infoFood.find(".info-list").find("a").attr("href");
      const titleFood = infoFood.find(".info-list").find("a").text().trim();
      let linkImage = infoFood
        .find(".text-center")
        .find(".img-fluid")
        .attr("data-lazy-src");
      // console.log(titleFood);
      if (linkImage === undefined) {
        console.log(linkImage);
        linkImage =
          "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg";
      }

      data.push({
        linkFood,
        titleFood,
        linkImage,
      });
    }
    console.log(data);

    fs.writeFileSync("data.json", JSON.stringify(data));
    console.log(linkchay + "------------->done");

    await sleep(1000);
  }
}
//call crawler
crawler();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
