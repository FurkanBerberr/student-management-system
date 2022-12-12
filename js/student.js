// Global variables
let students = []
var firstId

// Classes
function Student(id, name, surname){
    this.id = id 
    this.name = name
    this.surname = surname
}


// Selects
const addStudentButton = document.querySelector("#addStudentButton")

// Events
addStudentButton.addEventListener("click", createStudent)

// Functions

function createStudent(){

    // Create DIV
    const studentDiv = document.createElement("div")
    studentDiv.classList.add("student")

    // Create LI
    const studentElement = document.createElement("li")

    // Create INPUTS
    const sId = document.querySelector("#sId")
    const inputId = document.createElement("input")
    inputId.classList.add("studentId")
    inputId.type = "number"
    inputId.value = sId.value
    inputId.setAttribute("readonly", "readonly")
    inputId.setAttribute("min", 0)

    const sName = document.querySelector("#sName")
    const inputName = document.createElement("input")
    inputName.classList.add("studentName")
    inputName.type = "text"
    inputName.value = sName.value
    inputName.setAttribute("readonly", "readonly")

    const sSurname = document.querySelector("#sSurname")
    const inputSurname = document.createElement("input")
    inputSurname.classList.add("studentSurname")
    inputSurname.type = "text"
    inputSurname.value = sSurname.value
    inputSurname.setAttribute("readonly", "readonly")

    // Check if inputs are valid and full
    if(sId.value <= 0 || sName.value == "" || sId.value == "" || sSurname.value == ""){
        alert("Check the imputs are valid and full")
        return
    }

    // Creates the student object
    let student = new Student(sId.value, sName.value, sSurname.value)
    students.push(student)

    // Append INPUTS and LI into the DIV
    studentElement.appendChild(inputId)
    studentElement.appendChild(inputName)
    studentElement.appendChild(inputSurname)
    studentDiv.appendChild(studentElement)

    // Create BUTTONS
    const editButton = document.createElement("button")
    const editIcon = document.createElement("i")
    editIcon.classList.add("fa-solid")
    editIcon.classList.add("fa-pen-to-square")
    editButton.appendChild(editIcon)
    editButton.classList.add("edit")

    const deleteButton = document.createElement("button")
    const deleteIcon = document.createElement("i")
    deleteIcon.classList.add("fa-solid")
    deleteIcon.classList.add("fa-trash")
    deleteButton.appendChild(deleteIcon)
    deleteButton.classList.add("delete")

    // Append BUTTONS into DIV
    studentDiv.appendChild(editButton)
    studentDiv.appendChild(deleteButton)

    // Append final div into Course Lists
    const studentLists = document.querySelector(".studentLists")
    studentLists.appendChild(studentDiv)

    // Clear INPUTS
    sId.value = ""
    sName.value = ""
    sSurname.value = ""

    // Edit element
    editButton.addEventListener("click", function(){
        if(editIcon.classList[1] == "fa-pen-to-square"){
            editIcon.classList.remove("fa-pen-to-square")
            editIcon.classList.add("fa-check")
            inputId.removeAttribute("readonly")
            inputName.removeAttribute("readonly")
            inputSurname.removeAttribute("readonly")
            inputId.focus()
            firstId = inputId.value
        }else{
            if(inputId.value <= 0 || inputName.value == "" || inputId.value == "" || inputSurname.value == ""){
                alert("Check the edit imputs are valid and full")
                return
            }
            students.forEach(function(oneStudent){
                if(oneStudent.id == firstId){
                    oneStudent.id = inputId.value
                    oneStudent.name = inputName.value
                    oneStudent.surname = inputSurname.value
                }
            })
            editIcon.classList.remove("fa-check")
            editIcon.classList.add("fa-pen-to-square")
            inputId.setAttribute("readonly", "readonly")
            inputName.setAttribute("readonly", "readonly")
        }
    })

    // Delete element 
    deleteButton.addEventListener("click", function(){
        for (let i = 0; i < students.length; i++) {
            if (students[i].id == inputId.value) {
                students.splice(i, 1)
            }
        }
        studentLists.removeChild(studentDiv)
    })
}

export { students }