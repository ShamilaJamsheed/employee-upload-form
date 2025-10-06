import { db, storage } from "../firebase-config.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-storage.js";

// Get form and popup elements
const form = document.getElementById("employeeForm");
const popup = document.getElementById("popup");
const closePopup = document.getElementById("closePopup");

// Function to upload a file to Firebase Storage and get its download URL
async function uploadFile(file, folder) {
  if (!file) return "";
  const fileRef = ref(storage, `${folder}/${Date.now()}_${file.name}`);
  await uploadBytes(fileRef, file);
  const url = await getDownloadURL(fileRef);
  return url;
}

// Handle form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const formData = new FormData(form);

    // Upload all files to Firebase Storage
    const cvUrl = await uploadFile(formData.get("cv"), "cv");
    const passportUrl = await uploadFile(formData.get("passportCopy"), "passport");
    const iqamaUrl = await uploadFile(formData.get("iqamaCopy"), "iqama");
    const medicalUrl = await uploadFile(formData.get("medical"), "medical");
    const insuranceUrl = await uploadFile(formData.get("insurance"), "insurance");
    const abshirUrl = await uploadFile(formData.get("abshir"), "abshir");

    // Save form data + file URLs to Firestore
    await addDoc(collection(db, "employees"), {
      name: formData.get("name"),
      iqama: formData.get("iqama"),
      iqamaExpiry: formData.get("iqamaExpiry"),
      passport: formData.get("passport"),
      jobTitle: formData.get("jobTitle"),
      qualification: formData.get("qualification"),
      experience: formData.get("experience"),
      contact: formData.get("contact"),
      cv: cvUrl,
      passportCopy: passportUrl,
      iqamaCopy: iqamaUrl,
      medical: medicalUrl,
      insurance: insuranceUrl,
      abshir: abshirUrl,
      submittedAt: serverTimestamp()
    });

    // Show success popup
    popup.classList.remove("hidden");

    // Reset form
    form.reset();

  } catch (error) {
    console.error("Error submitting form:", error);
    alert("❌ Submission failed! Please try again.");
  }
});

// Close popup
closePopup.addEventListener("click", () => {
  popup.classList.add("hidden");
});
