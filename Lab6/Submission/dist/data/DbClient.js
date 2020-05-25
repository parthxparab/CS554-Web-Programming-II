"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const mongodb_1 = require("mongodb");
class DbClient {
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            // async / await approach:
            this.db = yield mongodb_1.MongoClient.connect("mongodb://localhost:27017/Parab-Parth-CS554-Lab7");
            // console.log("Connecting to db..");
            return this.db;
        });
    }
}
module.exports = new DbClient();
