// getting the open-modal button , the paragraph whats textcontent to be changed
const openModalBtn=document.querySelector("#open-modal");

const changedText=document.querySelector(".text");

// getting the cross icon and the modal-div
const crossIcon=document.querySelector(".cross-icon");
const modalDiv=document.querySelector(".modal");

// referring the hide-or-open modal function as user clicks on open-modal button or cross-icon 
function hideOrOpenModal () {
    //add the hide class to modal if not and remove if added
    modalDiv.classList.toggle("hide")
   // if the modal is opened, disable the open-modal button
    if(!modalDiv.classList.contains("hide")){
      openModalBtn.setAttribute("disabled","true")
    }else{
        openModalBtn.removeAttribute("disabled")
    }
    
    


    
}
// referring the function
openModalBtn.onclick=hideOrOpenModal

crossIcon.onclick=hideOrOpenModal


// getting the form inside modal and the input tag inside it
const modalForm=document.querySelector("form");
const modalTextInput=document.querySelector("#input")

// onsubmit function of the form
modalForm.onsubmit=function (e) {
    // preventing browsers default behaviour
  e.preventDefault();    
  
  //if the input field is blank, don't submit
  if(modalTextInput.value!==""){
    //show the submitted text in the paragraph
  changedText.textContent=modalTextInput.value
  //clear the field after submitting
  modalTextInput.value=""
  //hide the modal and enable the open-modal button
  modalDiv.classList.add("hide");
  openModalBtn.removeAttribute("disabled");
  
  }

}
