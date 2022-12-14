import {Router} from "express";
import multer from 'multer';
import  {Book} from "../schema/book.model";
import {Company} from "../schema/publishingCompany.model";


const bookRouter = Router();
const upload = multer()

bookRouter.get('/create', (req : any, res : any) => {
    res.render('createBook');
})

bookRouter.post('/create', async (req : any, res : any) => {
    try {
        const companyNew = new Company({
            name: req.body.company
        })

        const bookNew = new Book({
            type: req.body.type,
            title: req.body.title,
            author: req.body.author,
            company: companyNew,
        })

        bookNew.keyWord.push({keyword: req.body.keyword})
        const p1 = companyNew.save()
        const p2 = bookNew.save();
        let [company, book] = await Promise.all([p1, p2])
        console.log(book)
        if (book) {
            res.redirect('/book/list')
        } else {
            res.render('error')
        }
    } catch (err) {
        res.render('error')
    }
})

bookRouter.get('/list', async (req, res) => {
    try {
        let query = {};

        if (req.query.Keyword && req.query.Keyword !== "") {
            let keywordFind = req.query.Keyword || "";
            console.log(keywordFind)
            query = {
                "keyWord.keyword": {
                    $regex: keywordFind
                }
            }
        }

        if (req.query.company && req.query.company !== "") {
            let companyFind = req.query.company || "";
            let company = await Company.findOne({name: {$regex: companyFind}})
            query = {
                ...query,
                company: company
            }
        }

        const books = await Book.find(query).populate({
            path: 'company',
            select: 'name'
        })
        console.log(books)
        res.render('listBook', {books: books})
    }catch(err) {
       console.log(err.message)
    }
})


bookRouter.delete('/delete/:id', async (req, res) => {
    try {
        const book = await Book.findOne({_id: req.params.id})
        if (book) {
            await book.remove()
            res.status(200).json({message: 'success'})
        }else {
            res.render('error')
        }
    } catch (err) {
        res.render('error')
    }
})

export default bookRouter;