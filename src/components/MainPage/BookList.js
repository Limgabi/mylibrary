import React from "react";
import { Link } from "react-router-dom";
import style from "./BookList.module.css"

function BookList({ books }) {
  return (
    <div className={style.container}>
      {
        books.map((book, idx) => (
          <div key={idx} className={style.bookWrap}>
            <img
              src={book.thumbnail}
              alt={book.title}
            />
            <div className={style.bookInfo}>
              <Link to={`/book/${book.isbn}`} state={{...book}} className={style.title}>
                <p>{book.title}</p>
              </Link> 
              <p style={{fontSize: '12px'}}>
                <span>{book.authors} 저</span>
                <span className={style.publisher}>{book.publisher}</span>
              </p>
              <p className={style.price}>{book.price}원</p>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default BookList;