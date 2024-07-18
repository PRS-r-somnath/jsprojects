document.getElementById("addBtn").addEventListener("click", addItem);

function addItem() {
  const newItemText = document.getElementById("newItem").value;
  if (newItemText === "") return;

  const itemsList = document.getElementById("itemsList");

  const newItemDiv = document.createElement("div");
  newItemDiv.classList.add("item");

  const itemInput = document.createElement("input");
  itemInput.type = "text";
  itemInput.value = newItemText;
  itemInput.disabled = true;

  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit";
  editBtn.addEventListener("click", () => {
    if (itemInput.disabled) {
      itemInput.disabled = false;
      editBtn.textContent = "Save";
      itemInput.focus(); // Focus the input field when enabling edit mode
    } else {
      itemInput.disabled = true;
      editBtn.textContent = "Edit";
    }
  });

  const removeBtn = document.createElement("button");
  removeBtn.textContent = "Remove";
  removeBtn.addEventListener("click", () => {
    itemsList.removeChild(newItemDiv);
  });

  newItemDiv.appendChild(itemInput);
  newItemDiv.appendChild(editBtn);
  newItemDiv.appendChild(removeBtn);

  itemsList.appendChild(newItemDiv);

  document.getElementById("newItem").value = "";
}
