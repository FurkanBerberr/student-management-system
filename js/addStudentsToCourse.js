// Imports
import { students, Student } from "./student.js"
import { courses, Course } from "./app.js"


// Global variables
var selectedCourse


// Selects
const addStudentToCourseButton = document.querySelector("#addStudentToCourseButton")
const studentFilter = document.querySelector("#studentFilter")

// Events
addStudentToCourseButton.addEventListener("click", addStudentsToCourse)
studentFilter.addEventListener("click", filterStudent)


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
    if(studentId.value <= 0 || courseStudentMidScore.value <= 0 || courseStudentMidScore.value > 100 || sFinalScore.value <= 0 || sFinalScore.value > 100){
        alert("Check the imputs are valid and full")
        return
    }

    // Calculate student letter grades
    const letterGrade = calculateLetterGrade(courseStudentMidScore.value, sFinalScore.value, selectedCourse.pointScale)
    const inputLetterGrade = document.createElement("input")
    inputLetterGrade.classList.add("letterGrade")
    inputLetterGrade.type = "text"
    inputLetterGrade.value = letterGrade
    inputLetterGrade.setAttribute("readonly", "readonly")
    if(letterGrade == "F"){
        studentCourseDiv.classList.add("failed")
    }


    // Adding students grades into student obj
    selectedStudent.course.push([selectedCourse.id, courseStudentMidScore.value, sFinalScore.value, letterGrade])
    selectedCourse.student.push(selectedStudent)

    // Append INPUTS and LI into the DIV
    studentCourseElement.appendChild(inputId)
    studentCourseElement.appendChild(inputName)
    studentCourseElement.appendChild(inputSurname)
    studentCourseElement.appendChild(midtermScore)
    studentCourseElement.appendChild(finalScore)
    studentCourseElement.appendChild(inputLetterGrade)
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

    // Append final div into Course Student Lists
    const courseStudentsList = document.querySelector(".courseStudentsList")
    courseStudentsList.appendChild(studentCourseDiv)

    // Clear INPUTS
    studentId.value = ""
    courseStudentMidScore.value = ""
    sFinalScore.value = ""

    // Edit element
    editButton.addEventListener("click", function(){
        if(editIcon.classList[1] == "fa-pen-to-square"){
            // Changing the icon for edit button
            editIcon.classList.remove("fa-pen-to-square")
            editIcon.classList.add("fa-check")
            // Giving access to the user to change inputs
            midtermScore.removeAttribute("readonly")
            finalScore.removeAttribute("readonly")
            midtermScore.focus()
        }else{
            // Checking the edited values are valid or not
            if(midtermScore.value <= 0 || midtermScore.value > 100 || finalScore.value <= 0 || finalScore.value > 100){
                alert("Check the edit imputs are valid and full")
                return
            }
            let lGrade = calculateLetterGrade(midtermScore.value, finalScore.value, selectedCourse.pointScale)
            // If they valid changing the stored student values
            students.forEach(function(selectedStudent){
                if(selectedStudent.id == inputId.value){
                    selectedStudent.course.forEach(function(studentCourse){
                        if(studentCourse[0] == selectedCourse.id){
                            studentCourse[1] = midtermScore.value
                            studentCourse[2] = finalScore.value
                            studentCourse[3] = lGrade
                        }
                    })
                }
            })

            inputLetterGrade.value = lGrade
            if(lGrade == "F" && !studentCourseDiv.classList.contains("failed")){
                studentCourseDiv.classList.add("failed")
            }
            if(lGrade != "F" && studentCourseDiv.classList.contains("failed")){
                studentCourseDiv.classList.remove("failed")
            }
            // Changing the icon for edit button
            editIcon.classList.remove("fa-check")
            editIcon.classList.add("fa-pen-to-square")
            // Not giving access to the user to change inputs
            midtermScore.setAttribute("readonly", "readonly")
            finalScore.setAttribute("readonly", "readonly")
        }
    })

    // Delete element 
    deleteButton.addEventListener("click", function(){
        // Deleting the stored student from array
        for (let i = 0; i < selectedCourse.student.length; i++) {
            if (selectedCourse.student[i].id == inputId.value) {
                selectedCourse.student.splice(i, 1)
            }
        }
        students.forEach(function(selectedStudent){
            if(selectedStudent.id == inputId.value){
                for (let i = 0; i < selectedStudent.course.length; i++) {
                    if (selectedStudent.course[i][0] == selectedCourse.id) {
                        selectedStudent.course.splice(i, 1)
                    }
                }
            }
        })
        courseStudentsList.removeChild(studentCourseDiv)
    })

}

// Filteres the students
function filterStudent(e){
    const courseStudents = document.querySelector(".courseStudentsList").childNodes
    for(let i = 0; i < courseStudents.length; i++){
        if(courseStudents[i].classList && courseStudents[i].classList.contains(selectedCourse.id)){
            switch(e.target.value){
                case "all":
                    courseStudents[i].style.display = ""
                    break
                case "fStudent":
                    if(courseStudents[i].classList.contains("failed")){
                        courseStudents[i].style.display = ""
                    }else{
                        courseStudents[i].style.display = "none"
                    }
                    break
                case "pStudent":
                    if(!courseStudents[i].classList.contains("failed")){
                        courseStudents[i].style.display = ""
                    }else{
                        courseStudents[i].style.display = "none"
                    }
                    break
            }
        }
    }

}

// Calculates letter grade
function calculateLetterGrade(midtermScore, finalScore, pointScale){
    let result = (midtermScore * 0.4) + (finalScore * 0.6)
    if(pointScale == 10){
        switch (true) {
            case result >= 90:
                return "A"
            case result >= 80:
                return "B"
            case result >= 70:
                return "C"
            case result >= 60:
                return "D"
            case result >= 0:
                return "F"
        }
    }else{
        switch (true) {
            case result >= 93:
                return "A"
            case result >= 82:
                return "B"
            case result >= 77:
                return "C"
            case result >= 70:
                return "D"
            case result >= 0:
                return "F"
        }
    }
}


function getCourse(course){
    selectedCourse = course
}


export { getCourse }