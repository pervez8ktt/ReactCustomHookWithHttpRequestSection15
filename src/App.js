import React, { useEffect, useState, useCallback } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http';

function App() {
  const [tasks, setTasks] = useState([]);

  const transformedData = useCallback((data)=>{
    const loadedTasks = [];
      console.log(data);
      for (const taskKey in data) {
        loadedTasks.push({ id: taskKey, text: data[taskKey].text });
      }

      setTasks(loadedTasks);
  },[])

  const{isLoading, error, sendRequest:fetchTasks} = useHttp()


  useEffect(() => {
    fetchTasks({
      url:'https://react-practice-eacc1-default-rtdb.firebaseio.com/tasks.json',
    },transformedData);
  }, [fetchTasks,transformedData]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
