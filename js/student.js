// Imports
import { courses, Course } from "./app.js"

// Global variables
let students = []
var firstId

// Classes
function Student(id, name, surname){
    this.id = id 
    this.name = name
    this.surname = surname
    this.course = []
}


// Selects
const addStudentButton = document.querySelector("#addStudentButton")
const searchInput = document.getElementById("search")

// Events
addStudentButton.addEventListener("click", createStudent)
searchInput.addEventListener("keyup", searchFunction)

// Functions
function createStudent(){

    // Create DIV
    const studentDiv = document.createElement("div")
    studentDiv.classList.add("student")

    // Create LI
    const studentElement = document.createElement("li")

    // Create INPUTS
    const sId = document.querySelector("#sId")

    
    // Checks the id is already taken
    let exist = false
    students.forEach(function(oneStudent){
        if(oneStudent.id == sId.value){
            exist = true
        }
    })
    if(exist){
        alert("Students can not have same id")
        return
    }

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
    
    const infoButton = document.createElement("button")
    const infoIcon = document.createElement("i")
    infoIcon.classList.add("fa-solid")
    infoIcon.classList.add("fa-circle-info")
    infoButton.appendChild(infoIcon)
    infoButton.classList.add("info")

    // Append BUTTONS into DIV
    studentDiv.appendChild(editButton)
    studentDiv.appendChild(infoButton)
    studentDiv.appendChild(deleteButton)

    // Append final div into Student Lists
    const studentLists = document.querySelector(".studentLists")
    studentLists.appendChild(studentDiv)
    
    // While creating new student i am also adding the students
    // into Add Studens To The Course Section to see all students 
    // and select students according the their ids

    // Create LI for Course List
    const studentCourseElement = document.createElement("li")
    studentCourseElement.classList.add(sId.value)

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
    const containerDiv = document.createElement("div")
    containerDiv.appendChild(studentCourseElement)
    courseInnerStudentLists.appendChild(containerDiv)

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
            let sameId = false
            students.forEach(function(oneStudent){
                if(oneStudent.id == inputId.value && oneStudent.id != firstId){
                    sameId = true
                }
            })
            if(sameId){
                alert("Students can not have the same id")
                return
            }
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
            const courseS = document.getElementsByClassName(firstId);
            for(var i = courseS.length - 1; i >= 0; i--) {
                const courseSChild = courseS[i].childNodes
                courseSChild[0].value = inputId.value
                courseSChild[1].value = inputName.value
                courseSChild[2].value = inputSurname.value
                courseS[i].classList.add(inputId.value)
                courseS[i].classList.remove(`${firstId}`)
            }


            // Changing the icon for edit button
            editIcon.classList.remove("fa-check")
            editIcon.classList.add("fa-pen-to-square")
            // Not giving access to the user to change inputs
            inputId.setAttribute("readonly", "readonly")
            inputName.setAttribute("readonly", "readonly")
            inputSurname.setAttribute("readonly", "readonly")
        }
    })

    // Info button
    infoButton.addEventListener("click", function(){
        const addStudentSection = document.querySelector(".addStudentSection")
        const studentInfoSection = document.querySelector(".studentInfoSection")
        studentInfoSection.style.display = "flex"
        addStudentSection.style.display = "none"

        let studentInfoList = document.querySelector(".studentInfoList")
        studentInfoList.remove()
        studentInfoList = document.createElement("ul")
        studentInfoList.classList.add("studentInfoList")

        // Create LI
        const studentElement = document.createElement("li")

        // Create H1 for title
        const studentTitle = document.createElement("h1")
        studentTitle.innerHTML = inputId.value + "  " + inputName.value.toUpperCase() + " " + inputSurname.value.toUpperCase()

        let selectedStudent
        for (let i = 0; i < students.length; i++) {
            if (students[i].id == inputId.value) {
                selectedStudent = students[i]
            }
        }  

        studentElement.appendChild(studentTitle)
        studentElement.appendChild(document.createElement("br"))

        const table = document.createElement("table")
        const tableRowHeader = document.createElement("tr")
        const tableCourseId = document.createElement("th")
        tableCourseId.innerHTML = "Course Id"
        tableRowHeader.appendChild(tableCourseId)
        const tableCourseName = document.createElement("th")
        tableCourseName.innerHTML = "Course Name"
        tableRowHeader.appendChild(tableCourseName)
        const tableCoursePointScale = document.createElement("th")
        tableCoursePointScale.innerHTML = "Course Point Scale"
        tableRowHeader.appendChild(tableCoursePointScale)
        const tableMidterm = document.createElement("th")
        tableMidterm.innerHTML = "Midter Grade"
        tableRowHeader.appendChild(tableMidterm)
        const tableFinal = document.createElement("th")
        tableFinal.innerHTML = "Final Grade"
        tableRowHeader.appendChild(tableFinal)
        const tableLetter = document.createElement("th")
        tableLetter.innerHTML = "Letter Grade"
        tableRowHeader.appendChild(tableLetter)

        table.appendChild(tableRowHeader)
        
        var sumAvg = 0

        selectedStudent.course.forEach(function(studentCourse){
            courses.forEach(function(selectedCourse){
                if(studentCourse[0] == selectedCourse.id){
                    let tableRow = document.createElement("tr")

                    let tableCourseIdValue = document.createElement("td")
                    tableCourseIdValue.innerHTML = selectedCourse.id
                    tableRow.appendChild(tableCourseIdValue)
                    
                    let tableCourseNameValue = document.createElement("td")
                    tableCourseNameValue.innerHTML = selectedCourse.name
                    tableRow.appendChild(tableCourseNameValue)

                    let tableCoursePointScaleValue = document.createElement("td")
                    tableCoursePointScaleValue.innerHTML = selectedCourse.pointScale
                    tableRow.appendChild(tableCoursePointScaleValue)

                    let tableMidtermValue = document.createElement("td")
                    tableMidtermValue.innerHTML = studentCourse[1]
                    tableRow.appendChild(tableMidtermValue)

                    let tableFinalValue = document.createElement("td")
                    tableFinalValue.innerHTML = studentCourse[2]
                    tableRow.appendChild(tableFinalValue)
                    
                    let tableLetterValue = document.createElement("td")
                    tableLetterValue.innerHTML = studentCourse[3]
                    tableRow.appendChild(tableLetterValue)

                    sumAvg = sumAvg + (studentCourse[1] * 0.4) + (studentCourse[2] * 0.6)
                    table.appendChild(tableRow)
                }
            })
        })

        studentInfoList.appendChild(studentElement)
        if(selectedStudent.course.length > 0){
            let tableRow = document.createElement("tr")
            let gpa = document.createElement("td")
            gpa.setAttribute("colspan", 6)
            gpa.innerHTML = "AVG " + sumAvg / selectedStudent.course.length
            tableRow.appendChild(gpa)
            table.appendChild(tableRow)
            studentInfoList.appendChild(table)
        }
        studentInfoSection.appendChild(studentInfoList)

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
        const courseS = document.getElementsByClassName(inputId.value)
        for(var i = courseS.length - 1; i >= 0; i--) {
            const parrentDiv = courseS[i].parentElement
            parrentDiv.remove()
        }
        courses.forEach(function(selectedCourse){
            for (let i = 0; i < selectedCourse.student.length; i++) {
                if (selectedCourse.student[i].id == inputId.value) {
                    selectedCourse.student.splice(i, 1)
                }
            }
        })
    })
}

function searchFunction(e){
    let currentValue = e.target.value.toLowerCase()
    const studentIds = document.querySelectorAll("input.studentId")
    const studentNames = document.querySelectorAll("input.studentName")
    const studentSurnames = document.querySelectorAll("input.studentSurname")
    for(let i = 0; i < studentIds.length; i++){
        if(studentIds[i].value.includes(currentValue) || studentNames[i].value.toLowerCase().includes(currentValue) || studentSurnames[i].value.toLowerCase().includes(currentValue)){
            studentIds[i].parentNode.parentNode.style.display = ""
        }else{
            studentIds[i].parentNode.parentNode.style.display = "none"
        }
        
    }
}

export { students, Student }