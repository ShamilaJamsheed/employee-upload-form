import { db } from "../firebase-config.js";
import { collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Table body
const dataBody = document.getElementById("dataBody");
const searchInput = document.getElementById("searchInput");

// Load all employees from Firestore
async function loadEmployees() {
  const q = query(collection(db, "employees"), orderBy("submittedAt", "desc"));
  const snapshot = await getDocs(q);
  const employees = [];
  snapshot.forEach(doc => {
    employees.push({ id: doc.id, ...doc.data() });
  });
  displayEmployees(employees);
}

// Display employees in table
function displayEmployees(employees) {
  const searchTerm = searchInput.value.toLowerCase();
  dataBody.innerHTML = "";

  employees
    .filter(emp => 
      emp.name.toLowerCase().includes(searchTerm) ||
      (emp.passport && emp.passport.toLowerCase().includes(searchTerm)) ||
      (emp.iqama && emp.iqama.toLowerCase().includes(searchTerm))
    )
    .forEach(emp => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td class="py-2 px-4">${emp.name || "-"}</td>
        <td class="py-2 px-4">${emp.iqama || "-"}</td>
        <td class="py-2 px-4">${emp.passport || "-"}</td>
        <td class="py-2 px-4">${emp.jobTitle || "-"}</td>
        <td class="py-2 px-4">${emp.qualification || "-"}</td>
        <td class="py-2 px-4">${emp.experience || "-"}</td>
        <td class="py-2 px-4">${emp.contact || "-"}</td>
        <td class="py-2 px-4 space-x-2">
          ${emp.cv ? `<a href="${emp.cv}" target="_blank" class="text-blue-600 underline">CV</a>` : ""}
          ${emp.passportCopy ? `<a href="${emp.passportCopy}" target="_blank" class="text-blue-600 underline">Passport</a>` : ""}
          ${emp.iqamaCopy ? `<a href="${emp.iqamaCopy}" target="_blank" class="text-blue-600 underline">Iqama</a>` : ""}
          ${emp.medical ? `<a href="${emp.medical}" target="_blank" class="text-blue-600 underline">Medical</a>` : ""}
          ${emp.abshir ? `<a href="${emp.abshir}" target="_blank" class="text-blue-600 underline">Abshir</a>` : ""}
          ${emp.insurance ? `<a href="${emp.insurance}" target="_blank" class="text-blue-600 underline">Insurance</a>` : ""}
        </td>
        <td class="py-2 px-4">${emp.submittedAt ? new Date(emp.submittedAt.seconds * 1000).toLocaleString() : "-"}</td>
      `;
      dataBody.appendChild(row);
    });
}

// Search functionality
searchInput.addEventListener("input", () => {
  loadEmployees();
});

// Initial load
loadEmployees();
