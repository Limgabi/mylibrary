import React from "react";

function BookList({books}) {
  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      textAlign: "center"
    }}>
      {
        books.map((book, idx) => (
          <div key={idx} style={{width: "30%"}}>
            <img src={book.thumbnail}/>
            <p>{book.title}</p>
            <p>{book.authors}</p>
          </div>
        ))
      }
    </div>
  )
}

export default BookList;