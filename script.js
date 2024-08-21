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