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
// const arrayLink = require("./arrayLink");
const db = require("./config/db");

const arrayLink2 = require("./arrayLink2");
console.log(arrayLink2);
// const FoodsModel = require("./model");

// db.connectDB();
// console.log(arrayLink);

// function sleep(ms) {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// }

// let DATA = [];
// async function crawler() {
//   await sleep(1000);
//   for (i in arrayLink) {
//     const linkchay = arrayLink[i];

//     try {
//       const options = {
//         uri: linkchay,
//         transform: function (body) {
//           //Khi lấy dữ liệu từ trang thành công nó sẽ tự động parse DOM
//           return cheerio.load(body);
//         },
//       };
//       var $ = await rp(options);
//     } catch (error) {
//       console.log("Link dang dung:" + arrayLink[i]);
//       return error;
//     }

//     const title = $(".list-recipes > div");
//     let data = [];

//     for (let i = 0; i < title.length; i++) {
//       const infoFood = $(title[i]);
//       const linkFood = infoFood.find(".info-list").find("a").attr("href");
//       const titleFood = infoFood.find(".info-list").find("a").text().trim();
//       let linkImage = infoFood
//         .find(".text-center")
//         .find(".img-fluid")
//         .attr("data-lazy-src");
//       // console.log(titleFood);
//       if (linkImage === undefined) {
//         console.log(linkImage);
//         linkImage =
//           "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg";
//       }

//       data.push({
//         linkFood,
//         titleFood,
//         linkImage,
//       });
//     }
//     // console.log(data);

//     // const newFood = FoodsModel.insertMany(data);
//     // if (newFood) {
//     //   console.log("thành công");
//     // } else {
//     //   console.log("thất bại");
//     // }
//     DATA.push(...data);
//     console.log(DATA);

//     fs.writeFileSync("data.json", JSON.stringify(DATA));
//     console.log(linkchay + "------------->done");

//     await sleep(1000);
//   }
// }
// //call crawler
// crawler();

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

let DATA = [];
async function crawler() {
  await sleep(1000);
  for (i in arrayLink2) {
    const linkchay = arrayLink2[i];

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

    const title = $(".container .row .col h1").text().trim();
    let img = $(".video .youtube").attr("data-img");
    if (img === undefined) {
      img =
        "https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg";
    }

    const ingredients = $(".block-nguyenlieu ul > li");

    let data = [];

    let ingredientArray = [];
    for (let i = 0; i < ingredients.length; i++) {
      let ingredient = $(ingredients[i]).find("span").text().trim();
      if (ingredient !== "") {
        ingredientArray.push(ingredient);
      }
    }
    // console.log(ingredientArray);

    const doings = $(".container > .mb-3 ");

    const preprocessing = $(doings[1]).find(".col").find("p").text().trim();
    const perform = $(doings[2]).find(".col").find("p").text().trim();

    data.push({
      title,
      img,
      ingredientArray,
      preprocessing,
      perform,
    });
    // console.log(data);
    // console.log(title, img);
    DATA.push(...data);
    console.log(DATA);

    fs.writeFileSync("data2.json", JSON.stringify(DATA));
    console.log(linkchay + "------------->done");

    await sleep(1000);
  }
}
//call crawler
crawler();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
