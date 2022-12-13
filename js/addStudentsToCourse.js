// Imports
import { students, Student } from "./student.js"
import { courses, Course } from "./app.js"


// Global variables
var selectedCourse


// Selects
const addStudentToCourseButton = document.querySelector("#addStudentToCourseButton")

// Events
addStudentToCourseButton.addEventListener("click", addStudentsToCourse)


// Functions
function addStudentsToCourse(){

    // Create DIV
    const studentCourseDiv = document.createElement("div")
    studentCourseDiv.classList.add("courseStudent")
    studentCourseDiv.classList.add(selectedCourse.id)

    const studentId = document.querySelector("#studentId")

    // Checks the id is already taken
    let exist = false
    selectedCourse.student.forEach(function(student){
        if(student.id == studentId.value){
            exist = true
        }
    })
    if(exist){
        alert("Student already added to the course")
        return
    }

    // Find the right student
    let selectedStudent
    students.forEach(function(student){
        if(student.id == studentId.value){
            selectedStudent = student
        }
    })
    if(typeof selectedStudent === "undefined"){
        alert("Student does not exist")
        return
    }
    
    // Create LI
    const studentCourseElement = document.createElement("li")
    studentCourseElement.classList.add(selectedStudent.id)


    // Create INPUTS
    const inputId = document.createElement("input")
    inputId.classList.add("courseStudentId")
    inputId.type = "number"
    inputId.value = studentId.value
    inputId.setAttribute("readonly", "readonly")
    inputId.setAttribute("min", 0)

    const inputName = document.createElement("input")
    inputName.classList.add("courseStudentName")
    inputName.type = "text"
    inputName.value = selectedStudent.name
    inputName.setAttribute("readonly", "readonly")

    const inputSurname = document.createElement("input")
    inputSurname.classList.add("courseStudentSurname")
    inputSurname.type = "text"
    inputSurname.value = selectedStudent.surname
    inputSurname.setAttribute("readonly", "readonly")
    
    const courseStudentMidScore = document.querySelector("#sMidtermScore")
    const midtermScore = document.createElement("input")
    midtermScore.classList.add("courseStudentMidScore")
    midtermScore.type = "number"
    midtermScore.value = courseStudentMidScore.value
    midtermScore.setAttribute("readonly", "readonly")
    midtermScore.setAttribute("min", 0)
    
    const sFinalScore = document.querySelector("#sFinalScore")
    const finalScore = document.createElement("input")
    finalScore.classList.add("courseStudentMidScore")
    finalScore.type = "number"
    finalScore.value = sFinalScore.value
    finalScore.setAttribute("readonly", "readonly")
    finalScore.setAttribute("min", 0)

    // Check if inputs are valid and full
    if(studentId.value <= 0 || courseStudentMidScore.value <= 0 && courseStudentMidScore.value > 100 || sFinalScore.value <= 0 && sFinalScore.value > 100){
        alert("Check the imputs are valid and full")
        return
    }

    // Adding students grades into student obj
    console.log(selectedStudent.course)
    selectedStudent.course.push([selectedCourse.id, courseStudentMidScore.value, sFinalScore.value])
    console.log(selectedStudent.course)

    // Append INPUTS and LI into the DIV
    studentCourseElement.appendChild(inputId)
    studentCourseElement.appendChild(inputName)
    studentCourseElement.appendChild(inputSurname)
    studentCourseElement.appendChild(midtermScore)
    studentCourseElement.appendChild(finalScore)
    studentCourseDiv.appendChild(studentCourseElement)

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
    studentCourseDiv.appendChild(editButton)
    studentCourseDiv.appendChild(deleteButton)

    // Append final div into Student Lists
    const courseStudentsList = document.querySelector(".courseStudentsList")
    courseStudentsList.appendChild(studentCourseDiv)

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
            const courseS = document.getElementsByClassName(firstId);
            for(var i = 0; i < courseS.length; i++) {
                console.log(courseS[i])
                const courseSChild = courseS[i].childNodes
                courseSChild[0].value = inputId.value
                courseSChild[1].value = inputName.value
                courseSChild[2].value = inputSurname.value
                studentCourseElement.classList.remove(firstId)
                studentCourseElement.classList.add(inputId.value)
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


function getCourse(course){
    selectedCourse = course
}


export { getCourse }