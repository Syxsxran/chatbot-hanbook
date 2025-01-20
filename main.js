const categoryButtonsContainer = document.getElementById('categoryButtons');
    const itemList = document.getElementById('itemList');
    const loadingIndicator = document.getElementById('loading');

    // Show loading indicator
    loadingIndicator.style.display = 'block';

    // Fetch data from Google Sheets API
    fetch('https://script.google.com/macros/s/AKfycbzF7sLLJtM2g94vEHCY2nuUH0P1UqXsrbn9Q8FX3-w26J4mLuBr0Z07Qn9cv0961fRKaw/exec')
      .then(response => response.json())
      .then(data => {
        const categories = {};

        // Organize data by category
        data.forEach(item => {
          const { category, name, url } = item;
          if (!categories[category]) {
            categories[category] = [];
          }
          categories[category].push({ name, url });
        });

        // Create buttons for each unique category
        Object.keys(categories).forEach(category => {
          const button = document.createElement('button');
          button.className = 'btn categoryButton';
          button.setAttribute('data-category', category);
          button.innerHTML = `<div>${category}</div>`;
          button.addEventListener('click', () => {
            itemList.innerHTML = '';
            categoryButtonsContainer.querySelectorAll('.categoryButton').forEach(btn => {
              btn.classList.remove('active');
            });
            button.classList.add('active');

            categories[category].forEach(item => {
              const listItem = document.createElement('li');
              listItem.textContent = item.name;
              listItem.classList.add('list-group-item', 'list-group-item-action');
              listItem.addEventListener('click', () => {
                window.open(item.url, '_blank');
              });
              itemList.appendChild(listItem);
            });
          });
          categoryButtonsContainer.appendChild(button);
        });

        // Hide loading indicator
        loadingIndicator.style.display = 'none';
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        loadingIndicator.textContent = 'เกิดข้อผิดพลาดในการโหลดข้อมูล';
      });
