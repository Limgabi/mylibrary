import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, deleteDoc, getDocs, onSnapshot, query, where } from 'firebase/firestore';
import { dbService } from '../../fbase';
import style from "./Library.module.css";
import { MdOutlineClose } from "react-icons/md";

function Library({ userObj }) {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const q = query(
      collection(dbService, "books"),
      where("userId", "==", userObj.uid));
    onSnapshot(q, (snapshot) => {
      const bookArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(bookArr);
    })
  }, []);

  const onClickRecord = (title, img) => {
    navigate('/record', {
      state: {
        title: title,
        img: img
      }
    })
  }

  const onDelete = async (uid, title) => {
    const ok = window.confirm("ν΄λΉ μ±μ πμμ μ­μ νμκ² μ΅λκΉ?");
    const bookQuery = query(
      collection(dbService, "books"),
      where("userId", "==", uid),
      where("title", "==", title));
    if (ok) {
      const data = await getDocs(bookQuery);
      await deleteDoc(data.docs[0].ref);
    }
  }

  return (
    <div className={style.container}>
      <h2>{userObj.displayName}λμ π</h2>
      {books &&
        books.map((book, idx) => (
          <div key={idx} className={style.book}>
            <div className={style.bookImg}><img src={book.img} /></div>
            <div className={style.bookInfo}>
              <p className={style.title}>{book.title}</p>
              <p className={style.author}>{book.author}</p>
              <div className={style.btn}>
                <button className={style.recordBtn} onClick={()=>onClickRecord(book.title, book.img)}>κΈ°λ‘νκΈ°</button>
              </div>
            </div>
            <span className={style.deleteBtn} onClick={() => onDelete(userObj.uid, book.title)}><MdOutlineClose size={24}/></span>
          </div>
        ))
      }
    </div>
  );
}

export default Library;