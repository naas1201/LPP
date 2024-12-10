const filterCodes = () => {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const codes = document.querySelectorAll('#legalCodes li');
  
    codes.forEach(code => {
      const title = code.getAttribute('data-title').toLowerCase();
      code.style.display = title.includes(searchTerm) ? 'block' : 'none';
    });
  };
  