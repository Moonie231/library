"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const keywordsSchema = new mongoose_1.Schema({
    keyword: String
});
const bookSchema = new mongoose_1.Schema({
    type: String,
    title: String,
    author: String,
    keyWord: [keywordsSchema],
    company: { type: mongoose_1.Schema.Types.ObjectId, ref: "Company" }
});
const Book = (0, mongoose_1.model)('Book', bookSchema);
exports.Book = Book;
//# sourceMappingURL=book.model.js.map