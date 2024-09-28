function loadFile(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('code-editor').textContent = data;
        })
        .catch(error => console.error('Error loading the file:', error));
}

function toggleVisibility(groupId) {
    const group = document.getElementById(groupId);
    if (group) {
        if (group.classList.contains('hidden')) {
            group.classList.remove('hidden');
            group.classList.add('visible');
        } else {
            group.classList.remove('visible');
            group.classList.add('hidden');
        }
    }
}

function processUrls() {
    const listItems = document.querySelectorAll('#url-list li span');
    let textContent = '';

    listItems.forEach(item => {
        textContent += item.textContent.trim() + '\n';
    });

    const urlsText = textContent.trim();
    
    const urlsArray = urlsText.split('\n').map(url => url.trim()).filter(url => url !== '');
    const csvContent = urlsArray.join(',');
    
    sendDataToBackend(csvContent);
}
  
// Function to send the CSV data to the backend
async function sendDataToBackend(csvContent) {
    if(csvContent == "") {
        document.getElementById('outcome-editor').value = "No url's provided."
    }
    else {
        try {
            const response = await fetch('http://localhost:8080/process-urls', {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/csv',
                },
                body: csvContent,
            });
      
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to process URLs: ${errorText}`);
            }
      
            // Get the response data from the backend
            const result = await response.text();
            document.getElementById('outcome-editor').value = result; // Display the result in the outcome textarea
        } catch (error) {
            document.getElementById('outcome-editor').value = 'Unfortunately netlify, the host of this website only allows for static webpages. Check out the code to make this website functional here!\nhttps://github.com/ReilleyMilne/ApartmentScraperBackend';
        }
    }
}

function addUrl() {
    const taskInput = document.getElementById('url-input');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const taskList = document.getElementById('url-list');

    const taskItem = document.createElement('li');
    taskItem.classList.add('info-btn');
    taskItem.style.marginBottom = '10px';

    const taskTextElement = document.createElement('span');
    taskTextElement.textContent = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'x';

    deleteBtn.addEventListener('click', () => {
        taskList.removeChild(taskItem);
    });

    taskItem.appendChild(taskTextElement);
    taskItem.appendChild(deleteBtn);

    taskList.appendChild(taskItem);

    taskInput.value = '';
}
