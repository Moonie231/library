import {Schema,model} from 'mongoose'

interface IBook {
    type: string
    title: string
    author: string
    keyWord: object[]
    company: object
}

const keywordsSchema = new Schema({
    keyword: String
})

const bookSchema = new Schema<IBook> ({
    type: String,
    title: String,
    author: String,
    keyWord: [keywordsSchema],
    company: {type: Schema.Types.ObjectId, ref: "Company"}
})

const Book = model<IBook>('Book', bookSchema)

export { Book };