import { MongoClient, Db } from "mongodb";

class DbClient {
  public db: Db;

  public async connect() {
    // async / await approach:

    this.db = await MongoClient.connect(
      "mongodb://localhost:27017/Parab-Parth-CS554-Lab7"
    );
    // console.log("Connecting to db..");
    return this.db;
  }
}

export = new DbClient();
