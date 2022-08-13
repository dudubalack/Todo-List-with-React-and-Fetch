import React, { useEffect, useRef, useState } from "react";





//create your first component
const Home = () => {

    const [tasks, setTasks] = useState([]) 
    const [list, setList] = useState([])
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


    const carga =async ()=>{
       await fetch('https://assets.breatheco.de/apis/fake/todos/user/dudubalack')
          .then(resp => {
              console.log(resp.ok); // will be true if the response is successfull
              console.log(resp.status); // the status code = 200 or code = 400 etc.
              
              return resp.json(); // (returns promise) will try to parse the result as json as return a promise that you can .then for results
          })
          .then(data => {
              //here is were your code should start after the fetch finishes
              console.log(data); //this will print on the console the exact object received from the server
              setList(data)

          })
          .catch(error => {
              //error handling
              console.log(error);
          });
    }

    useEffect (()=>{
        carga()
    },[])

    useEffect (()=>{
        console.log(list)
    },[list])







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

