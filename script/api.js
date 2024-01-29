var apiUrl = 'http://192.168.0.108:3000/'; 
var owner = 'fmariani'; // obbligatorio

function loadTasks(callBack) {
  makeXHRRequest('GET', apiUrl + owner + '/tasks')
    .then(data => {
      if (Array.isArray(data)) {
        Array.from(data).forEach(i => callBack(i));
      }
    })
    .catch(error => {
      console.error('Errore durante la richiesta:', error);
    });
}

function saveTask(taskText, callback) {
  if (taskText !== undefined && taskText.trim() !== "") {
    const taskData = {
      description: taskText.trim()
    }

    makeXHRRequest('POST', apiUrl + owner + '/task', taskData)
      .then(data => {
        console.log('Nuovo task creato:', data);
        callback(data);
      })
      .catch(error => {
        console.error('Errore durante la richiesta:', error);
      });
  }
}

function deleteTask(taskId, callback) {
  if (taskId !== undefined)  {
    makeXHRRequest('DELETE', apiUrl + owner + `/task/${taskId}`)
      .then(data => {
        console.log(data);
        callback(taskId);
      })
      .catch(error => {
        console.error('Errore durante la richiesta:', error);
      });
  }
}

function editTask(taskId, taskText, callback) {
  if (taskId !== undefined && taskText !== undefined && taskText.trim() !== "") {
    const taskData = {
      description: taskText.trim()
    }

    makeXHRRequest('PUT', apiUrl + owner + `/task/${taskId}`, taskData)
      .then(data => {
        console.log('Task aggiornato:', data);
        callback(data);
      })
      .catch(error => {
        console.error('Errore durante la richiesta:', error);
      });
  }
}

function makeXHRRequest(method, url, data = null) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject({ status: xhr.status, statusText: xhr.statusText });
      }
    };

    xhr.onerror = function () {
      reject({ status: xhr.status, statusText: xhr.statusText });
    };

    if (data) {
      xhr.send(JSON.stringify(data));
    } else {
      xhr.send();
    }
  });
}