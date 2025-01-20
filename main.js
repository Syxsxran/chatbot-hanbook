const categoryButtonsContainer = document.getElementById('categoryButtons');
const itemList = document.getElementById('itemList');
const loadingIndicator = document.getElementById('loading');

// Show loading indicator
loadingIndicator.style.display = 'block';

// Fetch data from Google Sheets API
fetch('https://script.google.com/macros/s/AKfycbxyGSpz978syhGuBGfTrUsK18vmm_PerUZmT4i1MO0RztWN15tk9CGUfK_1Vaz4l950Wg/exec')
  .then(response => response.json())
  .then(data => {
    const categories = {};

    // Organize data by category
    data.forEach(item => {
      const { category, name, description, img, url } = item;
      if (!categories[category]) {
        categories[category] = [];
      }
      categories[category].push({ name, description, img, url });
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
          const card = document.createElement('div');
          card.className = 'card';
          card.innerHTML = `
            <div class="card-content">
              <h2 class="card-title">${item.name}</h2>
              <p class="card-description">${item.description}</p>
              <a href="${item.url}" target="_blank" class="card-button">อ่านคู่มือ</a>
            </div>
            <img src="${item.img}" alt="${item.name}" class="card-image" />
          `;
          itemList.appendChild(card);
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
