import fs from "fs";
import path from "path";

const dbFile = path.resolve(__dirname, "db.json");

const getDbData = async () => {
  return fs.promises.readFile(dbFile).then(data => {
    let dbData = {};
    try {
      dbData = JSON.parse(data.toString());
    } catch (e) {}
    return dbData;
  });
};

const dbUtil = {
  getDbData
};

export { dbUtil };
