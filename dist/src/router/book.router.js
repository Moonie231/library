"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const book_model_1 = require("../schema/book.model");
const publishingCompany_model_1 = require("../schema/publishingCompany.model");
const bookRouter = (0, express_1.Router)();
const upload = (0, multer_1.default)();
bookRouter.get('/create', (req, res) => {
    res.render('createBook');
});
bookRouter.post('/create', async (req, res) => {
    try {
        const companyNew = new publishingCompany_model_1.Company({
            name: req.body.company
        });
        const bookNew = new book_model_1.Book({
            type: req.body.type,
            title: req.body.title,
            author: req.body.author,
            company: companyNew,
        });
        bookNew.keyWord.push({ keyword: req.body.keyword });
        const p1 = companyNew.save();
        const p2 = bookNew.save();
        let [company, book] = await Promise.all([p1, p2]);
        console.log(book);
        if (book) {
            res.redirect('/book/list');
        }
        else {
            res.render('error');
        }
    }
    catch (err) {
        res.render('error');
    }
});
bookRouter.get('/list', async (req, res) => {
    try {
        let query = {};
        if (req.query.Keyword && req.query.Keyword !== "") {
            let keywordFind = req.query.Keyword || "";
            console.log(keywordFind);
            query = {
                "keyWord.keyword": {
                    $regex: keywordFind
                }
            };
        }
        if (req.query.company && req.query.company !== "") {
            let companyFind = req.query.company || "";
            let company = await publishingCompany_model_1.Company.findOne({ name: { $regex: companyFind } });
            query = Object.assign(Object.assign({}, query), { company: company });
        }
        const books = await book_model_1.Book.find(query).populate({
            path: 'company',
            select: 'name'
        });
        console.log(books);
        res.render('listBook', { books: books });
    }
    catch (err) {
        console.log(err.message);
    }
});
bookRouter.delete('/delete/:id', async (req, res) => {
    try {
        const book = await book_model_1.Book.findOne({ _id: req.params.id });
        if (book) {
            await book.remove();
            res.status(200).json({ message: 'success' });
        }
        else {
            res.render('error');
        }
    }
    catch (err) {
        res.render('error');
    }
});
exports.default = bookRouter;
//# sourceMappingURL=book.router.js.map