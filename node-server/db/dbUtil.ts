import * as fs from "fs";
import * as path from "path";
import { ProjectsArray } from "../types/db";

const dbFile = path.resolve(__dirname, "db.json");

const initDb = async (): Promise<void> => {
  if (fs.existsSync(dbFile)) {
    return;
  }
  return fs.promises.writeFile(dbFile, "[]");
};

const getDbData = async (): Promise<ProjectsArray> => {
  return fs.promises.readFile(dbFile).then(data => {
    let dbData = [];
    try {
      dbData = JSON.parse(data.toString());
    } catch (e) {}
    return dbData;
  });
};

const saveDbData = async (newData: ProjectsArray): Promise<void> => {
  return fs.promises.writeFile(dbFile, JSON.stringify(newData));
};

const dbUtil = {
  getDbData,
  saveDbData,
  initDb
};

export { dbUtil };
