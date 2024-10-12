let start = document.querySelector(".control-buttons span");
start.addEventListener("click", () => {
    document.querySelector(".game-head .hello span").innerHTML = document.querySelector(".control-buttons input").value
    document.querySelector(".control-buttons").remove();
    crads.forEach(e => {
        e.classList.add("clicked");
    })
    setTimeout(function () {
        crads.forEach(e => {
            e.classList.remove("clicked");
        })
    } ,3000)
})



let crads = document.querySelectorAll(".card");
// console.log(crads);
let orderRange = [...Array(crads.length).keys()];
// console.log(orderRange);
shuffle(orderRange);
// console.log(orderRange);

crads.forEach((crad, index)=> {
    crad.style.order = orderRange[index];
})
function shuffle(array) {
    let current = array.length, temp, random;
    while(current > 0) {
        random = Math.floor(Math.random() * current);
        current--;
        temp = array[current];
        array[current] = array[random];
        array[random] = temp;
    }
    return array;
}
let wrongAttempts = 0;
crads.forEach(e => {
    e.addEventListener("click", function () {
        e.classList.add("clicked");
        let clicked = document.getElementsByClassName("clicked");
        if(Array.from(clicked).length === 2) {
            stopClicking();
            let imgs = document.querySelectorAll(".clicked .back img");
            chechMatch(imgs[0].getAttribute("src"), imgs[1].getAttribute("src"))
            
        }
    })
})
function chechMatch(first, second) {
    let clicked = document.getElementsByClassName("clicked");
    if(first === second) {
        Array.from(clicked).forEach(el => {
            el.classList.add("answerd");
            el.classList.remove("clicked");
        })
        document.querySelector(".success").play();
    }else {
        setTimeout(function() {
            Array.from(clicked).forEach(el => {
                el.classList.remove("clicked");
            })
        }, 1000)
        setTimeout(function() {
            wrongAttempts++;
            document.querySelector(".game-head .wcount span").innerHTML = wrongAttempts;
            document.querySelector(".failure").play();
        }, 1000)
    }
}
function stopClicking() {
    document.querySelector(".cards-wrapper").classList.add("no-click");
    setTimeout(() => {
        document.querySelector(".cards-wrapper").classList.remove("no-click");
    }, 1000)
}
