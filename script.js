const employees = [
  { name: "Asha Kumar", role: "Frontend Engineer", department: "Engineering", location: "Bengaluru", email: "asha.kumar@example.com", phone: "+91 987650001" },
  { name: "Vikram Shah", role: "Backend Engineer", department: "Engineering", location: "Hyderabad", email: "vikram.shah@example.com", phone: "+91 987650002" },
  { name: "Meera Iyer", role: "Product Manager", department: "Product", location: "Mumbai", email: "meera.iyer@example.com", phone: "+91 987650003" },
  { name: "Ravi Patel", role: "HR Specialist", department: "Human Resources", location: "Delhi", email: "ravi.patel@example.com", phone: "+91 987650004" },
  { name: "Sana Roy", role: "Data Scientist", department: "Data", location: "Bengaluru", email: "sana.roy@example.com", phone: "+91 987650005" },
  { name: "Ankit Gupta", role: "DevOps Engineer", department: "Infrastructure", location: "Chennai", email: "ankit.gupta@example.com", phone: "+91 987650006" },
  { name: "Leela Menon", role: "UX Designer", department: "Design", location: "Pune", email: "leela.menon@example.com", phone: "+91 987650007" },
  { name: "Irfan Khan", role: "Sales Executive", department: "Sales", location: "Kolkata", email: "irfan.khan@example.com", phone: "+91 987650008" }
];

const grid = document.getElementById("employeeGrid");
const searchInput = document.getElementById("searchInput");
const departmentFilter = document.getElementById("departmentFilter");
const locationFilter = document.getElementById("locationFilter");
const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const closeModal = document.querySelector(".close");

// Populate filters dynamically
function populateFilters() {
  const departments = [...new Set(employees.map(e => e.department))];
  const locations = [...new Set(employees.map(e => e.location))];

  departments.forEach(dep => {
    const option = document.createElement("option");
    option.value = dep;
    option.textContent = dep;
    departmentFilter.appendChild(option);
  });

  locations.forEach(loc => {
    const option = document.createElement("option");
    option.value = loc;
    option.textContent = loc;
    locationFilter.appendChild(option);
  });
}

// Render employee cards
function renderEmployees(list) {
  grid.innerHTML = "";
  list.forEach(emp => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <div class="avatar">${emp.name.split(" ").map(n => n[0]).join("")}</div>
      <h3>${emp.name}</h3>
      <p>${emp.role}</p>
      <small>${emp.department} • ${emp.location}</small>
    `;
    card.addEventListener("click", () => openModal(emp));
    grid.appendChild(card);
  });
}

// Search & filter logic
function filterEmployees() {
  const query = searchInput.value.toLowerCase();
  const dept = departmentFilter.value;
  const loc = locationFilter.value;

  const filtered = employees.filter(e =>
    (dept === "all" || e.department === dept) &&
    (loc === "all" || e.location === loc) &&
    (e.name.toLowerCase().includes(query) ||
     e.role.toLowerCase().includes(query) ||
     e.department.toLowerCase().includes(query))
  );

  renderEmployees(filtered);
}

// Modal open/close
function openModal(emp) {
  modal.style.display = "block";
  modalBody.innerHTML = `
    <h2>${emp.name}</h2>
    <p><strong>Role:</strong> ${emp.role}</p>
    <p><strong>Department:</strong> ${emp.department}</p>
    <p><strong>Location:</strong> ${emp.location}</p>
    <p><strong>Email:</strong> ${emp.email}</p>
    <p><strong>Phone:</strong> ${emp.phone}</p>
  `;
}
closeModal.onclick = () => modal.style.display = "none";
window.onclick = e => { if (e.target === modal) modal.style.display = "none"; };

// Init
populateFilters();
renderEmployees(employees);
searchInput.addEventListener("input", filterEmployees);
departmentFilter.addEventListener("change", filterEmployees);
locationFilter.addEventListener("change", filterEmployees);
