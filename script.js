let paramtextbox = document.getElementById('paramtextbox')
let jsontextbox = document.getElementById("jsontextbox")
let jsonredio = document.getElementById("jsonredio")
let paramredio = document.getElementById("paramredio")
let addprmbtn = document.getElementById("addprmbtn")
let params = document.getElementById("params")

// initially hide Perameter box 
paramtextbox.style.display = "none"

//  hide PerameterBox to click on Json 
jsonredio.addEventListener("click", hideperem)
function hideperem() {
    paramtextbox.style.display = "none"
    jsontextbox.style.display = "block"

}
//  hide JSON Box to click on PerameterBox 
paramredio.addEventListener("click", hideJSON)
function hideJSON() {
    paramtextbox.style.display = "block"
    jsontextbox.style.display = "none"
}

addprmbtn.addEventListener("click", addprm)
addCoundt = 0
function addprm() {
    let html = ""
    html = `<div class="my-3 row">
                <label for="Perameter" class="col-sm-2 col-form-label">Perameter ${addCoundt + 2}</label>
                <div class="col-sm-4">
                    <input type="text" class="form-control" id="perameterkey${addCoundt + 2}" placeholder="Enter Parameter ${addCoundt + 2} Key">
                </div>
                <div class="col-sm-4">
                    <input type="text" class="form-control" id="perametervalue${addCoundt + 2}" placeholder="Enter Parameter ${addCoundt + 2} value">
                </div>
                <button type="button" id="addprmbtn" class="removePrm col-sm-1 btn btn-primary">-</button>
            </div>`
    params.innerHTML += html
    addCoundt++

    let removePrm = document.getElementsByClassName("removePrm")
    for (let item of removePrm) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove()
        })
    }
}

let sbmbtm = document.getElementById("sbmbtm")
sbmbtm.addEventListener('click', () => {
    let url = document.getElementById("url").value
    let RequestType = document.querySelector("input[type='radio'][name=requesttype]:checked").value
    let ContentType = document.querySelector("input[type='radio'][name=content]:checked").value

    // get data for POST 
    if (ContentType == "JSON") {
        data = document.getElementById("jsontext").value
    }
    else {
        console.log("aaa");
        data = {}
        for (let i = 0; i < addCoundt + 1; i++) {
            if (document.getElementById("perameterkey" + (i + 1)) !== null) {
                let key = document.getElementById("perameterkey" + (i + 1)).value
                let value = document.getElementById("perameterkey" + (i + 1)).value
                data[key] = value
            }
        }
        data = JSON.stringify(data)
    }
    

    if (RequestType == "POST") {
        
        fetch(url, {
            method: 'POST', 
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              }  
        })
        .then(response=> response.text())
        .then((text) =>{
            document.getElementById('respons1').value = text;})
                
                
    }
    else{
        fetch(url)
        .then(response => response.text())
        .then(text => 
        document.getElementById("respons1").value = text
        );
    }

})

