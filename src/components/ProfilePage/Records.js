import React, { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
import { dbService } from '../../fbase';
import style from "./Records.module.css";
import { MdDelete } from "react-icons/md";

function Records({ userObj }) {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    const q = query(
      collection(dbService, "records"),
      where("creatorId", "==", userObj.uid));
    onSnapshot(q, (snapshot) => {
      const recordArr = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecords(recordArr);
    })
  }, []);

  const onDelete = async (id) => {
    const ok = window.confirm('해당 기록을 삭제하시겠습니까?');
    const deleteRef = doc(dbService, "records", id)
    if (ok) {
      await deleteDoc(deleteRef);
    }
  }

  return (
    <div className={style.container}>
      <h2>{userObj.displayName}님의 📝</h2>
      <div className={style.recordWrap}>
        {records &&
          records.map((record) => (
            <div key={record.id} className={style.record}>
              <div className={style.bookInfo}>
                <p className={style.title}>{record.title}</p>
              </div>
              <div className={style.recordContent}>
                <p className={style.content}>{record.content}</p>
                <span className={style.deleteBtn}><MdDelete onClick={() => onDelete(record.id)} size={21}/></span>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Records;