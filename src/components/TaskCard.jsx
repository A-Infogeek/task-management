import React from 'react'

const TaskCard = ({props}) => {
    return (
        <a href={"/tasks/" + props.key} className='text-decoration-none'>
        <div className='bg-light'>
            <div className='card mt-3 shadow-sm'>
                <div className="card-body">{props.title}</div>          
            </div>
        </div>
        </a>
    )
}

export default TaskCard
