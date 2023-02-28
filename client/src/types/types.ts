export type BookId = {
    id: number
}

export type PassBook = {
    book: DataItem,
    body: object,
    id: number,
}

export type DataItem = {
    data : DataArray[]
}
  
type DataArray = {
    id: number,
    cover:Cover,
    price: string,
    title: string,
    author: string,
    releaseDate: number
    pages: string,
    link: string,
}
  
type Cover =  {
    large: string,
    small: string
}
