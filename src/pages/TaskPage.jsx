import React, { useEffect, useState } from 'react'
import { db } from '../firebase';
import { child, get, ref, remove, set } from 'firebase/database';
import { useParams, useNavigate } from 'react-router-dom';

const TaskPage = () => {
    const history= useNavigate();
    const { taskId } = useParams();
    const [usersList, setUsersList] = useState([]);
    const [formData, setFormData] = useState({
        title: '', description: '', status: '', assigned_user: '', due_date: ''
    });

    const getUserList = () => {
        get(child(ref(db), `users`)).then((snapshot) => {
            if (snapshot.exists()) {
                // console.log(snapshot.val());
                const data = snapshot.val();
                setUsersList(Object.values(data));
            } else {
                console.log("No users available");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    const getTaskDetails=()=>{
        get(child(ref(db), `tasks/${taskId}`)).then((snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
                const data = snapshot.val();
                setFormData(data);
            } else {
                console.log("No task data available");
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
        getTaskDetails();
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault();
        set(ref(db, `tasks/${taskId}`), formData);
        window.alert("Task Updated!");
        history("/home");
    }
    const handleDelete=(e)=>{
        remove(ref(db, `tasks/${taskId}`));
        window.alert("Task Deleted!");
        history("/home");
    }
    return (
            <div className="m-10 mx-auto p-4 w-50">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="exampleInputTitle" className="form-label">Title</label>
                        <input type="text" className="form-control" id="exampleInputTitle" name="title" 
                        onChange={handleChange} 
                        value={formData.title} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputDescription" className="form-label">Description</label>
                        <textarea name='description' className="form-control" id="exampleInputDescription" rows={5} 
                        onChange={handleChange} value={formData.description}></textarea>
                    </div>
                    <div className='d-flex'>
                        <div className="mb-3 col-3 me-3">
                            <label htmlFor="status" className='form-label'>Status</label>
                            <select name='status' className='form-select' onChange={handleChange} value={formData.status}>
                                <option >Select status</option>
                                <option value="to_do">To Do</option>
                                <option value="in_progress">In Progress</option>
                                <option value="done">Done</option>
                            </select>
                        </div>
                        <div className="mb-3 col-3 me-3">
                            <label htmlFor="assigned_user" className='form-label' >Assigned User</label>
                            <select name='assigned_user' className='form-select' onChange={handleChange} value={formData.assigned_user}>
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
                                onChange={handleChange} value={formData.due_date}
                            />
                        </div>
                    </div>
                    <button type="submit" className="btn btn-success">Update Task</button>
                    <button className="btn btn-danger mx-3" onClick={handleDelete}>Delete Task</button>
                </form>
            </div>
    )
}

export default TaskPage
