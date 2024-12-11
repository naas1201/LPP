document.addEventListener('DOMContentLoaded', () => {
    const userName = 'John Doe';
    const savedCodes = {
      civil: [],
      criminal: [],
    };
  
    // Update Welcome Message
    document.querySelector('.dashboard-container h1').textContent = `Welcome, ${userName}!`;
  
    // Update Saved Codes Count
    const updateCodesCount = () => {
      const totalCodes = savedCodes.civil.length + savedCodes.criminal.length;
      document.getElementById('codesCount').textContent = `Total Saved Codes: ${totalCodes}`;
    };
  
    // Render Codes
    const renderCodes = (category) => {
      const list = document.getElementById(`${category}Codes`);
      list.innerHTML = savedCodes[category]
        .map(
          (code) => `
          <li>
            <span class="code-title">${code}</span>
            <div class="action-buttons">
              <button class="btn-edit" data-category="${category}" data-title="${code}">Edit</button>
              <button class="btn-delete" data-category="${category}" data-title="${code}">Delete</button>
            </div>
          </li>
        `
        )
        .join('');
    };
  
    // Add New Code
    const addNewCode = (title, category) => {
      savedCodes[category].push(title);
      renderCodes(category);
      updateCodesCount();
    };
  
    // Handle Add New Code Form
    const addNewCodeButton = document.getElementById('addNewCodeButton');
    const newCodeForm = document.getElementById('newCodeForm');
    const submitNewCode = document.getElementById('submitNewCode');
  
    addNewCodeButton.addEventListener('click', () => {
      newCodeForm.style.display = newCodeForm.style.display === 'none' ? 'block' : 'none';
    });
  
    submitNewCode.addEventListener('click', () => {
      const title = document.getElementById('newCodeTitle').value.trim();
      const category = document.getElementById('newCodeCategory').value;
  
      if (title) {
        addNewCode(title, category);
        document.getElementById('newCodeTitle').value = '';
        newCodeForm.style.display = 'none';
        alert('New code added!');
      } else {
        alert('Please enter a title.');
      }
    });
  
    // Handle Search
    const searchBar = document.getElementById('searchSavedCodes');
    searchBar.addEventListener('input', () => {
      const searchTerm = searchBar.value.toLowerCase();
      ['civil', 'criminal'].forEach((category) => {
        const list = document.getElementById(`${category}Codes`);
        Array.from(list.children).forEach((li) => {
          const title = li.querySelector('.code-title').textContent.toLowerCase();
          li.style.display = title.includes(searchTerm) ? 'flex' : 'none';
        });
      });
    });
  
    // Handle Edit and Delete Buttons
    const container = document.querySelector('.dashboard-container');
    container.addEventListener('click', (e) => {
      if (e.target.classList.contains('btn-delete')) {
        const category = e.target.getAttribute('data-category');
        const title = e.target.getAttribute('data-title');
        savedCodes[category] = savedCodes[category].filter((code) => code !== title);
        renderCodes(category);
        updateCodesCount();
        alert('Code deleted!');
      }
  
      if (e.target.classList.contains('btn-edit')) {
        const category = e.target.getAttribute('data-category');
        const title = e.target.getAttribute('data-title');
        const newTitle = prompt('Edit Code Title:', title);
  
        if (newTitle) {
          savedCodes[category] = savedCodes[category].map((code) =>
            code === title ? newTitle : code
          );
          renderCodes(category);
          alert('Code updated!');
        }
      }
    });
  
    // Handle Dark Mode Toggle
    const toggleDarkMode = document.getElementById('toggleDarkMode');
    toggleDarkMode.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
    });
  
    // Handle Export Codes
    const exportButton = document.getElementById('exportCodes');
    exportButton.addEventListener('click', () => {
      const allCodes = [...savedCodes.civil, ...savedCodes.criminal];
      const blob = new Blob([allCodes.join('\n')], { type: 'text/plain' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'saved_codes.txt';
      link.click();
    });
  
    // Initialize with Sample Data
    addNewCode('Civil Code of France', 'civil');
    addNewCode('Criminal Code of the Philippines', 'criminal');
  });
  