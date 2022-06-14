import React, { useState } from 'react';
import style from "./Pagination.module.css";

function Pagination({ bookLimit, totalBooks, paginate }) {
  const [clicked, setClicked] = useState(1);

  const pageNumbers = [];
  for (let i=1; i<=Math.ceil(totalBooks/bookLimit); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={style.container}>
      {
        pageNumbers.map((num) => (
          <span 
            key={num}
            onClick={() => {paginate(num); setClicked(num)}}
            style={num === clicked ? {backgroundColor: "lightgray"} : {backgroundColor: "inherit"}}
          >{num}</span>
        ))
      }
    </div>
  );
}

export default Pagination;