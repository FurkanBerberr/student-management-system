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

    // Append final div into Student Lists
    const studentLists = document.querySelector(".studentLists")
    studentLists.appendChild(studentDiv)
    
    // While creating new student i am also adding the students
    // into Add Studens To The Course Section to see all students 
    // and select students according the their ids

    // Create LI for Course List
    const studentCourseElement = document.createElement("li")
    studentCourseElement.id = sId.value

    // Creat INPUT for Course List
    const studentInputId = document.createElement("input")
    studentInputId.classList.add("courseStudentId")
    studentInputId.type = "number"
    studentInputId.value = sId.value
    studentInputId.setAttribute("readonly", "readonly")
    studentInputId.setAttribute("min", 0)

    const studentInputName = document.createElement("input")
    studentInputName.classList.add("courseStudentName")
    studentInputName.type = "text"
    studentInputName.value = sName.value
    studentInputName.setAttribute("readonly", "readonly")

    const studentInputSurname = document.createElement("input")
    studentInputSurname.classList.add("courseStudentSurname")
    studentInputSurname.type = "text"
    studentInputSurname.value = sSurname.value
    studentInputSurname.setAttribute("readonly", "readonly")

    // Append INPUTS into the LI
    studentCourseElement.appendChild(studentInputId)
    studentCourseElement.appendChild(studentInputName)
    studentCourseElement.appendChild(studentInputSurname)

    // Append LI into Course Inner Student Lists
    const courseInnerStudentLists = document.querySelector(".courseInnerStudentLists")
    courseInnerStudentLists.appendChild(studentCourseElement)

    // Clear INPUTS
    sId.value = ""
    sName.value = ""
    sSurname.value = ""

    // Edit element
    editButton.addEventListener("click", function(){
        if(editIcon.classList[1] == "fa-pen-to-square"){
            // Changing the icon for edit button
            editIcon.classList.remove("fa-pen-to-square")
            editIcon.classList.add("fa-check")
            // Giving access to the user to change inputs
            inputId.removeAttribute("readonly")
            inputName.removeAttribute("readonly")
            inputSurname.removeAttribute("readonly")
            inputId.focus()
            // Storing the first id to check later
            firstId = inputId.value
        }else{
            // Checking the edited values are valid or not
            if(inputId.value <= 0 || inputName.value == "" || inputId.value == "" || inputSurname.value == ""){
                alert("Check the edit imputs are valid and full")
                return
            }
            // If they valid changing the stored student values
            students.forEach(function(oneStudent){
                if(oneStudent.id == firstId){
                    oneStudent.id = inputId.value
                    oneStudent.name = inputName.value
                    oneStudent.surname = inputSurname.value
                }
            })
            // Editing Add Studens To The Course Sections values
            const courseS = document.getElementById(firstId)
            const courseSChild = courseS.childNodes
            courseSChild[0].value = inputId.value
            courseSChild[1].value = inputName.value
            courseSChild[2].value = inputSurname.value
            courseS.id = inputId.value


            // Changing the icon for edit button
            editIcon.classList.remove("fa-check")
            editIcon.classList.add("fa-pen-to-square")
            // Not giving access to the user to change inputs
            inputId.setAttribute("readonly", "readonly")
            inputName.setAttribute("readonly", "readonly")
            inputSurname.setAttribute("readonly", "readonly")
        }
    })

    // Delete element 
    deleteButton.addEventListener("click", function(){
        // Deleting the stored student from array
        for (let i = 0; i < students.length; i++) {
            if (students[i].id == inputId.value) {
                students.splice(i, 1)
            }
        }
        studentLists.removeChild(studentDiv)
        const courseS = document.getElementById(inputId.value)
        courseInnerStudentLists.removeChild(courseS)
    })
}

export { students }