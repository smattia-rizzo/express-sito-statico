const bt1 = document.getElementById("bt1");
const bt2 = document.getElementById("bt2");
const bt3 = document.getElementById("bt3");


bt1.addEventListener("click", () => {
    window.location.pathname = "/pagina1.html";
})

bt2.addEventListener("click", () => {
    window.location.pathname = "/pagina2.html";
})

bt3.addEventListener("click", () => {
    window.location.pathname = "/pagina3.html";
})