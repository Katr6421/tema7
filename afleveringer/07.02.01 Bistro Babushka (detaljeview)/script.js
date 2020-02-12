let personer = []
const endpoint = "https://spreadsheets.google.com/feeds/list/1udiFtGLu72E616uMWI_2CwrDNcOoE2xNy_gqnh-l4BQ/od6/public/values?alt=json";
let filter = "alle";
const container = document.querySelector(".container");
const theTemplate = document.querySelector("template");



document.addEventListener("DOMContentLoaded", start);

function start() {
    loadData();
    //            visPersoner();
    addEventListersToButtons();

}

async function loadData() {

    const jsonData = await fetch(endpoint);
    console.log(jsonData)

    personer = await jsonData.json();
    console.log(personer);

    visPersoner();


}


function visPersoner() {
    container.innerHTML = "";

    //løb listen igennem og indsæt data i en template

    personer.feed.entry.forEach(person => {

        if (filter == "alle" || filter == person.gsx$kategori.$t) {

            let klon = theTemplate.cloneNode(true).content;

            klon.querySelector("h2").textContent = person.gsx$navn.$t;

            klon.querySelector("img").src = `billeder/small/${person.gsx$billede.$t}-sm.jpg`;

            klon.querySelector(".kortBeskrivelse").textContent += person.gsx$kort.$t;

            klon.querySelector(".pris").textContent += `${ person.gsx$pris.$t} kr,-`;

            klon.querySelector(".personer").addEventListener("click", () => {


                location.href = "detalje.html?id=" + person.gsx$id.$t;
            })


            container.appendChild(klon);
        }

    })
}


function addEventListersToButtons() {
    console.log("jeg har klikket på knappen")
    document.querySelectorAll(".filter").forEach(elm => {
        elm.addEventListener("click", filtering);
    })
}


function filtering() {
    console.log("filter");
    filter = this.dataset.kategori;

    document.querySelector("h1").textContent = this.textContent;

    document.querySelectorAll(".filter").forEach(elm => {
        elm.classList.remove("valgt");
    })

    this.classList.add("valgt");

    visPersoner();
}
