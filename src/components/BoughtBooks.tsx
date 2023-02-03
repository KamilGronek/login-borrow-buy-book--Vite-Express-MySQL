import React  from 'react'
import "../styles/SectionBooks.css";
import { useShowBoughtBooks, useDeleteBoughtBoo } from '../hooks/useDataBooks';



function BoughtBooks() {

    const { data } = useShowBoughtBooks();
    const { mutate: deleteBook } = useDeleteBoughtBoo()




    const deleteBoughtBook = (bookId) => {
        deleteBook(bookId)
    }

        //  const filterArray  = data?.data.filter(book => book.title == "Learning React Native, 2nd Edition")
        //     console.log(filterArray);


        const filterObj  = data?.data.find(book => book.title == "Learning React Native, 2nd Edition")
        console.log(filterObj);


        const firstObj = data?.data[2];
        const secondObj = data?.data[3];

        const obj = Object.assign({}, firstObj, secondObj);

        console.log(obj)

        // const obj = Object.assign({}, firstObj, secondObj);

        // const o1 = { id: 10, a: 1, b: 2, c: 2 };
        // const o2 = { id: 8, a: 2, b: 1, c: 3 };
        // // const o3 = { id: 4, a: 2, b: 1, c: 1 };
        
        // const obj = Object.assign({}, o1, o2);
        // console.log(obj)





    return (
        <>
        {data?.data.length > 0 ?(
                 <section className="gallery"> 
                {data?.data.map(book => (
                    <div key={book.id} className="gallery__book">
                        <img src ={book.cover.small}  alt="" />
                        <h3>{book.title}</h3>
                        <div className="gallery__book-details">
                            <button onClick={() => deleteBoughtBook(book.id)}
                                className="confirm"> Remove Choose
                            </button>
                        </div>
                    </div>
                ))}
            </section>
      ):(<p className="gallery-info">All books are returned</p>)}
      </>
    )
}

export default BoughtBooks
