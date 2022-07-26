import React from "react";
import React, { useRef, useState } from "react";


const [tasks, setTasks] = useState([]) 
	const inputRef = useRef();

	const onAddButtonClick = (e) => {
		e.preventDefault();

		const taskTitle = inputRef.current.value;
		 if (taskTitle === ""){return} 
		setTasks([...tasks, taskTitle]); 
		inputRef.current.value = ""; 
	}
	const onDeleteButtonClick = (position) => { 
		tasks.splice(position,1); 
		setTasks([...tasks])
	}


//create your first component
const Home = () => {
	return (
        <div className="container">
            <h1>Todos</h1> 
            <form onSubmit={onAddButtonClick} className="input-group mb-3">
                <input ref={inputRef} type="text" className="form-control" aria-label="Text input with segmented dropdown button" />
            </form>

            {tasks.length === 0
            ? (<span>No hay tareas, añadir tareas</span>) 
            : tasks.map((taskElement, i) => { 
                return ( <li key ={i}>{taskElement}<button type="button" className="btn-close" aria-label="Delete" onClick={() => onDeleteButtonClick(i)}>X</button></li> ) 
              })
            }
        </div>
    );
};

export default Home;


