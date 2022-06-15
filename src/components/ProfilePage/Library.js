import React, { useCallback, useEffect, useState } from 'react';
import style from "./Library.module.css";
import { TiDeleteOutline } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';

function Library({ userObj }) {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const bookArr = JSON.parse(localStorage.getItem("books"));
    setBooks(bookArr);
  }, []);

  const onClickRecord = (title) => {
    navigate('/record', {
      state: {
        title: title
      }
    })
  }

  const onDelete = (idx) => {
    let bookarr = [...books];
    bookarr.splice(idx, 1);
    setBooks(bookarr);
    localStorage.setItem("books", JSON.stringify(bookarr));
  }

  return (
    <div className={style.container}>
      <h2>{userObj.displayName}님의 📚</h2>
      {books &&
        books.map((book, idx) => (
          <div key={idx} className={style.book}>
            <div className={style.bookImg}><img src={book.img} /></div>
            <div className={style.bookInfo}>
              <p className={style.title}>{book.title}</p>
              <p className={style.author}>{book.author}</p>
              <div className={style.btn}>
                <button className={style.recordBtn} onClick={()=>onClickRecord(book.title)}>기록하기</button>
              </div>
            </div>
            <span className={style.deleteBtn} onClick={() => onDelete(idx)}><TiDeleteOutline size={24}/></span>
          </div>
        ))
      }
    </div>
  );
}

export default Library;