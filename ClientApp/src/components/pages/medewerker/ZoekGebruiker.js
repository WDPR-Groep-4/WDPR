import axios from "axios";

export async function zoekGebruiker(searchTerm){
    try{
        const response = await axios.get(`/api/medewerker/accounts/${searchTerm}`).catch((err) => {
            console.log(err);
        });
        const { Id, Voornaam, Achternaam, emailadres, Telefoon, rol } = response.data;
        changeTable(Id, Voornaam, Achternaam, emailadres, Telefoon, rol);
    } catch {
        console.log("error");

    }
  } 
  export function changeTable(Id, Voornaam, Achternaam, emailadres, Telefoon, rol, rows ,setRows){
    var table = document.getElementById("table");
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    cell1.innerHTML = Id;
    cell2.innerHTML = Voornaam;
    cell3.innerHTML = Achternaam;
    cell4.innerHTML = emailadres;
    cell5.innerHTML = Telefoon;
    cell6.innerHTML = rol;
    setRows([...rows, {Id, Voornaam, Achternaam, emailadres, Telefoon, rol}])
  }
    