console.log('Welcome to notes app');
shownotes();
//If user adds a note then store it on localstorage

let addBtn = document.getElementById('addBtn');
addBtn.addEventListener("click", function (e) {

    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');
    let notes = localStorage.getItem("notes");
    // console.log("Notes",notes);

    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let myObj ={
        title : addTitle.value,
        text : addTxt.value
    };

    if(myObj.title == "")
        myObj.title = "No title";
    if(myObj.text == "")
        myObj.text = "No text";
        
    notesObj.push(myObj);     // notesObj is an array of objects
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";
    //  console.log(notesObj);
    shownotes();
})

function shownotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html +=
            `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                    <div class="card-body">
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text">${element.text}</p>          
                        <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
                        <button id="b${index}" onclick="colorNote(this.id)" class="btn btn-primary"><i class="bi bi-bookmark-star-fill"></i></button>
                    </div>
            </div>`;
    });
    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    }
    else {
        notesElm.innerHTML = `Nothing to show. Add a note from above`;
    }
}

function colorNote(index) {
    console.log("Clicked on bookmark no", index);
    let ind = parseInt(index[1]);
    let cardBody = document.getElementsByClassName("card-body")[ind + 1];
    console.log("color",cardBody);
    if (cardBody.style.backgroundColor != "red")
        cardBody.style.backgroundColor = "red";
    else
        cardBody.style.backgroundColor = "transparent";
}

function deleteNote(index) {
    //console.log("Deleting ", index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    shownotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function (element) {

    let input = search.value.toLowerCase();
    //console.log("Input", input);
    let noteCards = document.getElementsByClassName("noteCard");
    //let notec = document.getElementById("notes");
    //console.log(noteCards);
    //console.log(notec);
    Array.from(noteCards).forEach(function (element) {
        //selects content inside <p>. 0 is used as there is only 1 p tag
        console.log(element);
        let cardBody = element.getElementsByClassName("card-body")[0];
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        //console.log(element);     displays entire notecard
        //console.log(cardTxt);   //displays text within p in notecard
        if (cardTxt.includes(input) || cardBody.style.backgroundColor=="red") {
            element.style.display = "block"; // Element is rendered as a block-level element
        }
        else {
            element.style.display = "none"; // hides the display
        }
    })
})
