document.addEventListener('DOMContentLoaded', () => {
    const usersContainer = document.getElementById('usersContainer');
  
   
    fetch('https://dummyjson.com/users')
      .then(response => {
       
        if (!response.ok) {
          throw new Error(`Network response was not ok, status: ${response.status}`);
        }
       
        return response.json();
      })
      .then(users => {
     
        const slicedUsers = users.users.slice(0, 15);
  
        
        slicedUsers.forEach(user => {
          renderUser(user, usersContainer);
        });
      })
      .catch(error => {
        
        console.error('Error during fetch operation:', error);
      });
  });
  
 
   /
  function renderUser(user, container) {
    const userCard = document.createElement('div');
    userCard.classList.add('user-card');
  
    userCard.innerHTML = `
      <img src="${user.image}" alt="User Image" class="user-image">
      <div class="user-details">
        <p>${user.firstName} ${user.lastName}</p>
        <p>Age: ${user.age}</p>
        <p>Email: ${user.email}</p>
        <p>Phone: ${user.phone}</p>
      </div>
    `;
  
    container.appendChild(userCard);
  }
  
  