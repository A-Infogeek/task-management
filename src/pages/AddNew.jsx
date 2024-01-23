import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import { child, get, ref, set } from 'firebase/database';
import {v4 as uuidv4} from 'uuid';

const AddNew = (props) => {
    const [usersList, setUsersList] = useState([]);
    const [formData, setFormData] = useState({
        title: null, description: null, status: null, assigned_user: null, due_date: null
    });
    
    const getUserList = () => {
        get(child(ref(db), `users`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                const data = snapshot.val();
                setUsersList(Object.values(data));
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    useEffect(() => {
        getUserList();
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault();
        const taskId= uuidv4();
        set(ref(db, 'tasks/' + taskId), formData);
        props.setShowModal(false);
    }
    return (
        <div className="position-fixed z-index-1 left-0 top-0 w-100 h-100 overflow-auto"
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            onClick={() => props.setShowModal(false)}
        >
            <div className="bg-white m-10 mx-auto p-4 w-50" onClick={(e) => e.stopPropagation()}>
                <div className="mb-3">
                    <button style={{ float: 'right' }} className='btn btn-danger' onClick={() => props.setShowModal(false)}>Close</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputTitle" className="form-label">Title</label>
                        <input type="text" className="form-control" id="exampleInputTitle" name="title" onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputDescription" className="form-label">Description</label>
                        <textarea name='description' className="form-control" id="exampleInputDescription" rows={5} onChange={handleChange}></textarea>
                    </div>
                    <div className='d-flex'>
                        <div className="mb-3 col-3 me-3">
                            <label htmlFor="status" className='form-label'>Status</label>
                            <select name='status' className='form-select' onChange={handleChange}>
                                <option >Select status</option>
                                <option value="to_do">To Do</option>
                                <option value="in_progress">In Progress</option>
                                <option value="done">Done</option>
                            </select>
                        </div>
                        <div className="mb-3 col-3 me-3">
                            <label htmlFor="assigned_user" className='form-label' >Assigned User</label>
                            <select name='assigned_user' className='form-select' onChange={handleChange}>
                                <option >Select User</option>
                                {/* Get users data dynamically */}
                                {usersList.map((item) => {
                                    return (
                                        <option key={item.id} value={item.id}>{`${item.username} <${item.email}>`}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className="mb-3 col-3 me-3">
                            <label htmlFor="due_date" className='form-label'>Due Date</label>
                            <input type="date" className='form-control' name="due_date" id="due_date"
                                min={new Date().toISOString().split("T")[0]}
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-success">Create New Task</button>
                </form>
            </div>
        </div>
    )
}

export default AddNew
