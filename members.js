const membersDiv = document.querySelector("#members");
let table = document.createElement("table");

const response = function(response) {
        return response.json();
    };
    
const band = function(band) {
        membersDiv.innerHTML += "<h2>Current and old members of " +band.name + "</h2>"
        displayMembers(band.members);
    };

const error = function(error){
        console.log('Error during fetch: ' + error.message);
        let heading = document.createEkement("H2")
        heading.classList.add("card-title")
        let text = "No Results"
        heading.appendChild(text)
        membersDiv.innerHTML += heading
    };

const member = function(member){
    
    //iterate on the array of members
    const row = table.insertRow();
    const memberNameCell = row.insertCell();
    
    memberNameCell.innerHTML = member.name;
    
    //Show instruments played by this member
    const instrumentCell = row.insertCell();
    
    member.instruments.forEach(function(inst, index){
        instrumentCell.innerHTML += inst;
        if(index !== member.instruments.length - 1){
            instrumentCell.innerHTML += ",";
        }
    });

    let activeYearsCell = row.insertCell();
    activeYearsCell.innerHTML += member.begin;
    
    if(member.end !== ""){
        activeYearsCell.innerHTML += " - " + member.end;
    } else {
        activeYearsCell.innerHTML += " - still active in band!";
    }
    
};

function init(){

    console.log("Page Loaded");
    table.classList.add("table");
    table.classList.add("table-striped");
    search();

}

function search(){

    var bandName = document.querySelector("#bandName").value;
    console.log(bandName);
    
    // API for getting info about an artist/band by name
    const url = encodeURI("https://wasabi.i3s.unice.fr/api/v1/artist/name/" + bandName);
    
    console.log(url);
    membersDiv.innerHTML = "";
    
    fetch(url).then(response).then(band).catch(error);

}

function displayMembers(listOfMembers){

    listOfMembers.forEach(member);
    membersDiv.appendChild(table);

}

