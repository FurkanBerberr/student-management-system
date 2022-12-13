// Imports
import { getCourse } from "./addStudentsToCourse.js"


// Global variables
let courses = []
var firstId

// Classes
function Course(id, name, pointScale){
    this.id = id 
    this.name = name
    this.pointScale = pointScale
    this.student = []
}


// Selects
const addCourseSection = document.querySelector(".addCourseSection")
const addStudentSection = document.querySelector(".addStudentSection")
const addStudentsToCourseSection = document.querySelector(".addStudentsToCourseSection")

const addCourseSectionB = document.querySelector(".addCourseSectionB")
const addStudentSectionB = document.querySelector(".addStudentSectionB")
const addStudentsToCourseSectionB = document.querySelector(".addStudentsToCourseSectionB")

const addCourseButton = document.querySelector("#addCourseButton")


// Events
addCourseSectionB.addEventListener("click", selectAddCourseSection)
addStudentSectionB.addEventListener("click", selectAddStudentSection)
addStudentsToCourseSectionB.addEventListener("click", selectAddStudentsToCourseSection)

addCourseButton.addEventListener("click", createCourse)


// Functions

// Shows only Select Add Course Section
function selectAddCourseSection(){
    addCourseSection.style.display = ""
    addStudentSection.style.display = "none"
    addStudentsToCourseSection.style.display = "none"
}

// Shows only Select Add Student Section
function selectAddStudentSection(){
    addCourseSection.style.display = "none"
    addStudentSection.style.display = "unset"
    addStudentsToCourseSection.style.display = "none"
}

// Shows only Select Add Students To The Course Section
function selectAddStudentsToCourseSection(){
    addCourseSection.style.display = "none"
    addStudentSection.style.display = "none"
    addStudentsToCourseSection.style.display = "unset"
}

function createCourse(){

    // Create DIV
    const courseDiv = document.createElement("div")
    courseDiv.classList.add("course")

    // Create LI
    const courseElement = document.createElement("li")

    // Create INPUTS
    const cId = document.querySelector("#cId")

    
    // Checks the id is already taken
    let exist = false
    courses.forEach(function(oneCourse){
        if(oneCourse.id == cId.value){
            exist = true
        }
    })
    if(exist){
        alert("Courses can not have same id")
        return
    }

    const inputId = document.createElement("input")
    inputId.classList.add("courseId")
    inputId.type = "number"
    inputId.value = cId.value
    inputId.setAttribute("readonly", "readonly")
    inputId.setAttribute("min", 0)

    const cName = document.querySelector("#cName")
    const inputName = document.createElement("input")
    inputName.classList.add("courseName")
    inputName.type = "text"
    inputName.value = cName.value
    inputName.setAttribute("readonly", "readonly")

    // Check if inputs are valid and full
    if(cId.value <= 0 || cName.value == "" || cId.value == ""){
        alert("Check the imputs are valid and full")
        return
    }

    // Creates the course object
    const pointScaleInp = document.querySelector("#pScale")
    let course = new Course(cId.value, cName.value, pointScaleInp.value)
    courses.push(course)

    // Append INPUTS and LI into the DIV
    courseElement.appendChild(inputId)
    courseElement.appendChild(inputName)
    courseDiv.appendChild(courseElement)

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

    const addStudentButton = document.createElement("button")
    const addStudentIcon = document.createElement("i")
    addStudentIcon.classList.add("fa-solid")
    addStudentIcon.classList.add("fa-user-plus")
    addStudentButton.appendChild(addStudentIcon)
    addStudentButton.classList.add("addStudentB")

    // Append BUTTONS into DIV
    courseDiv.appendChild(editButton)
    courseDiv.appendChild(addStudentButton)
    courseDiv.appendChild(deleteButton)

    // Append final div into Course Lists
    const courseLists = document.querySelector(".courseLists")
    courseLists.appendChild(courseDiv)

    // Clear INPUTS
    cId.value = ""
    cName.value = ""

    // Edit element
    editButton.addEventListener("click", function(){
        if(editIcon.classList[1] == "fa-pen-to-square"){
            // Changing the icon for edit button
            editIcon.classList.remove("fa-pen-to-square")
            editIcon.classList.add("fa-check")
            // Giving access to the user to change inputs
            inputId.removeAttribute("readonly")
            inputName.removeAttribute("readonly")
            inputId.focus()
            // Storing the first id to check later
            firstId = inputId.value
        }else{
            // Checking the edited values are valid or not
            if(inputId.value <= 0 || inputName.value == "" || inputId.value == ""){
                alert("Check the edit imputs are valid and full")
                return
            }
            // If they valid changing the stored student values
            courses.forEach(function(oneCourse){
                if(oneCourse.id == firstId){
                    oneCourse.id = inputId.value
                    oneCourse.name = inputName.value
                }
            })
            // Changing the icon for edit button
            editIcon.classList.remove("fa-check")
            editIcon.classList.add("fa-pen-to-square")
            // Changing the icon for edit button
            inputId.setAttribute("readonly", "readonly")
            inputName.setAttribute("readonly", "readonly")
        }
    })

    // Add Student element
    addStudentButton.addEventListener("click", function(){
        addCourseSection.style.display = "none"
        addStudentSection.style.display = "none"
        addStudentsToCourseSection.style.display = "unset"

        const info = document.getElementById("info")
        info.innerHTML = inputId.value + " " + inputName.value + " " + pointScaleInp.value + " Point Scale"

        let selectedCourse
        for (let i = 0; i < courses.length; i++) {
            if (courses[i].id == inputId.value) {
                selectedCourse = courses[i]
            }
        }
        getCourse(selectedCourse)

    })

    // Delete element 
    deleteButton.addEventListener("click", function(){
        for (let i = 0; i < courses.length; i++) {
            if (courses[i].id == inputId.value) {
                courses.splice(i, 1)
            }
        }
        courseLists.removeChild(courseDiv)
    })
}


export { courses, Course }