document.addEventListener("DOMContentLoaded", () => {
    const monsterContainer = document.getElementById("monster-container");
    const formContainer = document.getElementById("create-monster");
    const loadMoreBtn = document.getElementById("load-more");
    let page = 1; // Track the current page
  
    // ✅ 1️⃣ Create Monster Form
    function createMonsterForm() {
      const form = document.createElement("form");
      form.innerHTML = `
        <input type="text" id="name" placeholder="Monster Name" required>
        <input type="number" id="age" placeholder="Monster Age" required>
        <input type="text" id="description" placeholder="Monster Description" required>
        <button type="submit">Create Monster</button>
      `;
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        createMonster();
      });
      formContainer.appendChild(form);
    }
  
    // ✅ 2️⃣ Fetch Monsters (Paginated)
    function fetchMonsters(pageNumber) {
      fetch(`http://localhost:3000/monsters?_limit=50&_page=${pageNumber}`)
        .then((res) => res.json())
        .then((monsters) => {
          monsters.forEach(displayMonster);
        })
        .catch((error) => console.error("Error fetching monsters:", error));
    }
  
    // ✅ 3️⃣ Display Monster in DOM
    function displayMonster(monster) {
      const div = document.createElement("div");
      div.innerHTML = `
        <h2>${monster.name}</h2>
        <p>Age: ${monster.age}</p>
        <p>${monster.description}</p>
        <hr>
      `;
      monsterContainer.appendChild(div);
    }
  
    // ✅ 4️⃣ Create a New Monster
    function createMonster() {
      const name = document.getElementById("name").value;
      const age = parseFloat(document.getElementById("age").value);
      const description = document.getElementById("description").value;
  
      fetch("http://localhost:3000/monsters", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name, age, description }),
      })
        .then((res) => res.json())
        .then((newMonster) => {
          displayMonster(newMonster);
        })
        .catch((error) => console.error("Error creating monster:", error));
    }
  
    // ✅ 5️⃣ Load More Monsters
    loadMoreBtn.addEventListener("click", () => {
      page++;
      fetchMonsters(page);
    });
  
    // ✅ Initialize App
    createMonsterForm();
    fetchMonsters(page);
  });
  