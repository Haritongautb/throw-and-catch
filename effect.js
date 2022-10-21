"use strict";
const btnOpenModal = document.querySelectorAll("[data-open-modal]");
const modalWindow = document.querySelector(".modal__window");
const form = document.querySelectorAll(".form");
const body = document.body;

if(body){
    body.addEventListener("click", event => {
        const target = event.target

        if(target && target.classList.contains("button")){
            openModal();

            modalWindow.addEventListener("click", event => {
                const target = event.target
                if(target && target.classList.contains("modal__window") || target && target.classList.contains("form__btn-close")){
                    closeModal();
                }
            })
        }

    })
}

function openModal() {
    modalWindow.classList.remove("hide")
    modalWindow.classList.add("show", "fade");
    body.style.overflow = "hidden"
}

function closeModal() {
    modalWindow.classList.remove("show", "fade")
    modalWindow.classList.add("hide");
    body.style.overflow = "auto"
}

const getPost = async(url, body) => {
    const result = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: body
    })
        
    if(!result.ok){
        throw new Error(`Could not fetch ${url}, status: ${result.status}`);
    }

    return await result.JSON();
} 

form.forEach(item => {
    bindPostData(item);
})


function bindPostData(form){

    form.addEventListener("submit", event => {
        event.preventDefault();

        const formData = new FormData(form);

        const dataJSON = JSON.stringify(Object.fromEntries(formData.entries()));

        getPost("hello4000", dataJSON)
        .then((data) => console.log("Everything is Good!"))
        .catch(() => {
            console.log("Something is wrong!!")
        })
    })
}
