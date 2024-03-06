const notes = [
  { content: "Mi primera nota" },
  { content: "Esta es una nota larga que ocupa más de una línea" },
  { content: "Otra nota de ejemplo" },
  { content: "Otra nota de ejemplo" },
];

function createNote(event) {
  event.preventDefault();
  const form = event.target;
  const newContent = form.elements["new-note"].value;
  if (newContent.trim() === "") {
    alert("Debes agregar una nota.");
    return;
  }

  const newNote = { content: newContent };
  notes.push(newNote);
  form.reset();
  renderTasks();
}

function deleteNote(event) {
  event.preventDefault();

  const buttonIdToDelete = event.target.id + "";

  const noteIdToDelete = buttonIdToDelete.split("button_")[1];
  notes.splice(noteIdToDelete, 1);
  renderTasks();
}

function createListItem(note, index) {
  const li = document.createElement("li"); // <li></li>
  li.id = "note_" + index;
  li.className = "note-box";

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Eliminar";
  deleteButton.id = "button_" + index;
  deleteButton.className = "delete-note-button";
  deleteButton.addEventListener("click", deleteNote);
  const span = document.createElement("span");

  span.textContent = note.content;

  li.append(span, deleteButton);
  return li;
}

function renderTasks() {
  const ulElement = document.querySelector("#notes-list");

  ulElement.innerHTML = "";

  for (let index = 0; index < notes.length; index++) {
    const note = notes[index];
    const liElement = createListItem(note, index);
    ulElement.append(liElement);
  }
}

const formElement = document.querySelector("#new-notes-form");

formElement.addEventListener("submit", createNote);
renderTasks();
