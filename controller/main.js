const https = require("https");
const RepoData = require("../models/RepoData");
exports.fetch_data = (req, res) => {
  https.get(
    `https://api.github.com/search/repositories?q=created:>${req.params.date}&sort=stars&order=desc&page=1&per_page=100&page_limit=1`,
    {
      headers: {
        "User-Agent": "Amoud94",
        Accept: "*/*",
      },
    },
    (result) => {
      try {
        let data = [];
        if (result.statusCode !== 200) {
          throw Error("Cannot reach this server right now, an error occured");
        }
        result.on("data", (chunk) => {
          data.push(chunk);
        });
        result.on("end", () => {
          const responseData = JSON.parse(Buffer.concat(data).toString());
          const temp = responseData.items.map((el) => {
            return new RepoData(
              el.id,
              el.name,
              el.language,
              el.html_url,
              el.description
            );
          });
          const count = {};
          for (const element of temp) {
            if (element.language !== null) {
              if (count[element.language]) {
                count[element.language] += 1;
              } else {
                count[element.language] = 1;
              }
            }
          }
          res.json({
            message: "Success",
            ReturnedData: temp,
            LngByCount: count,
          });
        });
      } catch (error) {
        console.error(error);
      }
    }
  );
};

exports.listRepos = (req, res) => {
  https.get(
    `https://api.github.com/search/repositories?q=created:%3E${req.params.date}&sort=stars&order=desc&page=1&per_page=100&page_limit=1`,
    {
      headers: {
        "User-Agent": "Amoud94",
        Accept: "*/*",
      },
    },
    (result) => {
      try {
        let data = [];
        if (result.statusCode !== 200) {
          throw Error("Cannot reach this server right now, an error occured");
        }
        result.on("data", (chunk) => {
          data.push(chunk);
        });
        result.on("end", () => {
          const responseData = JSON.parse(Buffer.concat(data).toString());
          const temp = responseData.items.map((el) => {
            return new RepoData(
              el.id,
              el.name,
              el.language,
              el.html_url,
              el.description
            );
          });
          let repoList;
          if (req.params.lng === "null") {
            repoList = temp;
          } else {
            repoList = temp.filter((el) => {
              if (el.language === req.params.lng) {
                return el;
              }
            });
          }
          res.json({
            message: "Success",
            ReturnedData: repoList,
          });
        });
      } catch (error) {
        console.error(error);
      }
    }
  );
};
