const createEvent = async (event) => {
    event.preventDefault();

    //const userDate = document.querySelector('#date-schedule').value.trim();
    const pickedDate = document.querySelector('#datepicker').value
    const userStartTime = document.querySelector('#startTime-scheduleLesson').value;
    //const userEndTime = document.querySelector('#endTime-scheduleLesson').value.trim();
    const studentName = document.querySelector('#studentName-scheduleLesson').value
    const studentId = document.querySelector('#studentId-scheduleLesson').value;
    const teacherId = document.querySelector('#teacherId-scheduleLesson').value;
    
    console.log(pickedDate && userStartTime)

    if (pickedDate && userStartTime) {
        console.log(pickedDate && userStartTime)
    } else {
        alert('not working')
    }
}

document
    .querySelector('.scheduleLessonForm')
    .addEventListener('submit', createEvent)
