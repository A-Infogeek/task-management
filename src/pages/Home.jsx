import TaskCard from "../components/TaskCard"
import AddNew from "./AddNew";
import { db } from '../firebase';
import { child, get, ref, set } from 'firebase/database';
import { useEffect, useState } from "react";

const Home = () => {
    const[showModal, setShowModal]= useState(false);
    const[tasksList, setTasksList]= useState({
      "to_do":{},
      "in_progress":{},
      "done":{}
    });

    const getTasksList = () => {
      get(child(ref(db), `tasks`)).then((snapshot) => {
          if (snapshot.exists()) {
              const data = snapshot.val();
              const filtered_data= {
                "to_do":{},
                "in_progress":{},
                "done":{}
              }
              Object.keys(data).forEach(key=>{
                const item= data[key];
                filtered_data[item['status']][key]= item;
              })
              setTasksList(filtered_data);
              console.log(filtered_data);
          }
      }).catch((error) => {
          console.error(error);
      });
  }
    const handleClick=()=>{
        setShowModal(!showModal);
    }

    useEffect(()=>{
      getTasksList();
    },[tasksList]);
  return (
    <>
    <div className="d-flex container mt-3">
      <div className="col-3 mx-3">
        <div className="bg-primary px-3 py-3 rounded">TO DO</div>
        <div>
          {Object.keys(tasksList['to_do']).map(key=>{
            return <TaskCard key={key} props={{...tasksList['to_do'][key], ['key']:key}}/>
          })}
          </div>
      </div>
      <div className="col-3 mx-3">
        <div className="bg-warning px-3 py-3 rounded">In Progress</div>
        <div>
        {Object.keys(tasksList['in_progress']).map(key=>{
            return <TaskCard key={key} props={{...tasksList['in_progress'][key], ['key']:key}}/>
          })}
        </div>
      </div>
      <div className="col-3 mx-3">
        <div className="bg-success px-3 py-3 rounded">Done</div>
        <div>
        {Object.keys(tasksList['done']).map(key=>{
            return <TaskCard key={key} props={{...tasksList['done'][key], ['key']:key}}/>
          })}
        </div>
      </div>
      <div className="col-3 mx-3">
        <button className="btn btn-dark rounded" onClick={handleClick}>Add new task</button>
      </div>
    </div>
    {showModal && <AddNew showModal={showModal} setShowModal={setShowModal} /> }
    </>
  )
}

export default Home
