import React from "react";
import { Link } from "react-router-dom";

function BookList({ books }) {
  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      margin: "25px auto",
      border: "2px solid lightgray"
    }}>
      {
        books.map((book, idx) => (
          <div key={idx}
            style={{
              // display: "flex",
              // flexDirection: "column", 
              // width: "33%", 
              textAlign: "center",
              marginTop: "3px",
              alignItems: "center",
              margin: "auto 8px",
            }}>
            <img
              style={{ width: "150px", marginTop: "8px" }}
              src={book.thumbnail}
              alt={book.title}
            />
            <div
              style={{
                width: "147px", maxHeight: "213px",
                margin: "10px 0 0 0",
                textAlign: "left",
                paddingLeft: "8px"
              }}>
              <Link to={`/book/${book.isbn}`} state={{...book}}><p style={{
                fontSize: '13px',
                fontWeight: "bold",
                color: "#333"
              }}>{book.title}</p></Link>
              
              <p style={{
                fontSize: '12px',
              }}>
                <span>{book.authors} 저</span>
                <span style={{
                  display: "block",
                  marginTop: "3px",
                }}>{book.publisher}</span>
              </p>
              <p style={{
                fontSize: "14px",
                fontWeight: "bold",
              }}>{book.price}원</p>
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default BookList;