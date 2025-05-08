  const upload = document.getElementById('upload');
  const profileImage = document.getElementById('profileImage');

  upload.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
      profileImage.src = URL.createObjectURL(file);
    }
  });

  function generateId1() {
    return Math.random().toString(36).substring(2, 15);
  }


  let isEditable = false;

  function toggleEdit() {
    const inputs = document.querySelectorAll('.card-container input, .card-container textarea');
    const button = document.getElementById('editbutton');

    isEditable = !isEditable;

    inputs.forEach(input => {
      input.disabled = !isEditable; 
    });

    button.textContent = isEditable ? "Save Details" : "Edit Profile";

    if (!isEditable) {
        let res = document.getElementById("fname").value;
        document.getElementById("Name").textContent = res + "  (sch" + generateId1()+")";
    }      

  }

  window.onload = function () {
    document.querySelectorAll('.card-container input, .card-container textarea').forEach(input => {
      input.disabled = true;
    });
}
let isEducationEditable = false;

function toggleCardEdit(button) {
    const inputs = button.parentElement.querySelectorAll('input');
    const isEditable = inputs[0].disabled;
  
    inputs.forEach(input => {
      input.disabled = !isEditable;
    });
  
    button.textContent = isEditable ? "Save" : "Edit";
  }
  
  function addEducation() {
    const container = document.getElementById('education-container');
  
    const newDiv = document.createElement('div');
    newDiv.className = 'educationdetailsdiv';
    newDiv.innerHTML = `
      <label>Enter Degree</label>
      <input type="text" placeholder="Enter Degree" disabled><br>
      <label>Enter Institution</label>
      <input type="text" placeholder="Enter Institution" disabled><br>
      <label>Select Start year</label>
      <input type="date" disabled><br>
      <label>Select End year</label>
      <input type="date" disabled><br>
      <label>Enter Percentage</label>
      <input type="number" placeholder="Enter Percentage" disabled><br>
      <button onclick="toggleCardEdit(this)">Edit</button>
    `;
  
    container.appendChild(newDiv);
  }

  const resumeInput = document.getElementById('resumeattach');
  const fileNameDisplay = document.getElementById('filename');

    resumeInput.addEventListener('change', function () {
  const file = this.files[0];
  if (file) {
    fileNameDisplay.textContent = `Selected File: ${file.name}`;
  } else {
    fileNameDisplay.textContent = '';
  }
    });


