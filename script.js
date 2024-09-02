const addBtn = document.getElementById("addBtn");
const saveBtn = document.getElementById("saveBtn");
const app = document.getElementById("app");

let noteList = [];
let savedItems = [];

addBtn.addEventListener("click", () => {
  createNoteApp();
});

const createNoteApp = () => {
  noteList.unshift({ id: noteList.length + 1, text: "" });
  app.innerHTML = "";
  renderNote();
};

const renderNote = () => {
  app.innerHTML = "";

  noteList.map((note) => {
    const noteApp = document.createElement("div");

    noteApp.innerHTML = ` <div class="w-[300px] h-[240px] rounded-lg overflow-hidden">
        
        <div
          class="bg-gray-800 h-[40px] w-full flex items-center gap-6 justify-end px-3"
        >
          <i onclick="saveNote(${note.id})"
            class="fa-regular fa-floppy-disk text-white scale-125 cursor-pointer hover:opacity-50 transition duration-150"
          ></i>
          <i
            class="fa-regular fa-trash-can text-white scale-125 cursor-pointer hover:opacity-50 transition duration-150"
            onclick="deleteNote(${note.id})"
          ></i>
        </div>

       
        <textarea
          class="w-full h-[200px] bg-gray-700 outline-none p-2 text-white resize-none"
          placeholder="Type your note here..."
          autofocus
          oninput="handleChangeText(${note.id}, this.value)"
        >${note.text}</textarea>
      </div>`;

    app.append(noteApp);
  });
};

// calls for the first time to render
const firstRender = () => {
  const localSaved = localStorage.getItem("savedItems");
  if (localSaved) {
    noteList = JSON.parse(localSaved);
    savedItems = JSON.parse(localSaved);
  }
  renderNote();
};

firstRender();

// function to delete a note
const deleteNote = (id) => {
  noteList = noteList.filter((note) => note.id !== id);
  const ifIsInSavedNote = savedItems.find((note) => note.id === id);
  if (ifIsInSavedNote) {
    savedItems = savedItems.filter((note) => note.id !== id);
    localStorage.setItem("savedItems", JSON.stringify(savedItems));
  }

  renderNote();
};

renderNote();

// function  to save a note
const saveNote = (id) => {
  const note = noteList.find((note) => note.id === id);
  const ifExists = savedItems.find((note) => note.id === id);
  if (!ifExists) {
    savedItems.unshift(note);
    localStorage.setItem("savedItems", JSON.stringify(savedItems));
  }
};

// function to change text
const handleChangeText = (id, text) => {
  const note = noteList.find((note) => note.id === id);
  if (note) {
    note.text = text;
  }
};

// if there is no note saved, launch a new note window
if (noteList.length === 0) createNoteApp();
