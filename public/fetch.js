function fetchTasks() {
    fetch('/tasks')
      .then(response => response.json())
      .then(tasks => {
        const taskList = document.getElementById('taskList');
        taskList.innerHTML = '';
        tasks.forEach(task => {
          const listItem = document.createElement('li');
          listItem.innerText = `${task.title} - ${task.status}`;
          taskList.appendChild(listItem);
        });
      })
      .catch(error => {
        console.error('Error fetching tasks:', error);
      });
  }
  
  function createTask() {
    const task = {
      title: 'New Task',
      description: 'This is a new task'
    };
  
    fetch('/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
      .then(response => response.json())
      .then(createdTask => {
        console.log('Created task:', createdTask);
      })
      .catch(error => {
        console.error('Error creating task:', error);
      });
  }
  