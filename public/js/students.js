const addStudentHandler = async (event) => {
    event.preventDefault();
    console.log('button clicked')
    const first_name = document.querySelector('#firstName-createStudent').value.trim();
    const last_name = document.querySelector('#lastName-createStudent').value.trim();
    const email = document.querySelector('#email-createStudent').value.trim();
    
    function makePassword(maxLengthPass) {
        var collectionOfLetters = "abcdefghijklmnopqrstuvwxyz0123456789";
        var generatedPassword = "";
        var size = collectionOfLetters.length;
        for (var i = 0; i < maxLengthPass; ++i) {
           generatedPassword = generatedPassword + collectionOfLetters.charAt(Math.floor(Math.random() * size));
        }
        return generatedPassword;
     } 
    
    const password = makePassword(8)//generate random password
    const is_teacher = 0

    if (first_name && last_name && email) {
        console.log(first_name , last_name , email , password , is_teacher )
        const response = await fetch('/api/student', {
            method: 'POST',
            body: JSON.stringify({ first_name, last_name, email, password, is_teacher}),
            headers: { 'Content-Type': 'application/json' },
        })
        if(response.ok) {
            alert(`${first_name} ${last_name} successfully added as student!\nPlease write down student's password: ${password}`)
            document.location.replace('/students');
        } else {
            alert('Failed to add student. Please check to make sure all fields have been filled out correctly.')// change to a modal
        }
    }
}

//works for first line only
const deleteStudent = async (event) => {
    event.preventDefault();
    console.log('delete button clicked');

    const studentId = $(this).parent
    console.log(this)
    console.log(studentId);

    // if (studentId) {
    //     const id = studentId;
    
    //     const response = await fetch(`/api/student/${id}`, {
    //       method: 'DELETE',
    //     });
    
    //     if (response.ok) {
    //       console.log("student deleted");
    //       document.location.replace('/students');
    //     } else {
    //       alert('Failed');
    //     }
    //   }
    
}

const viewStudents = async (event) => {
    
    const getUsers = async () => {
            const results = await sequelize.query('SELECT user.id, user.is_teacher, CONCAT (user.first_name, " ", user.last_name) AS name FROM user', { type: QueryTypes.SELECT });
            const student = results.filter(teacher => teacher.is_teacher == 0);
            
            student.forEach(({ name }) => {
                console.log(name );
            });
            return results
        };
        getUsers(); 
    
    const response = await fetch('api/students', {
        method: 'GET',
        })

        if (response.ok) {
            console.log(getUsers)
        }
    

}

//works for first line only
const updateStudent = async (event) => {
    event.preventDefault();
    console.log('button clicked')
    
    const studentId = document.querySelector('#delete-student-btn').value
    
    console.log(studentId);

    const first_name = document.querySelector('#update-firstname').value.trim();
    const last_name = document.querySelector('#update-lastname').value.trim();
    const email = document.querySelector('#update-email').value.trim();

    if (studentId) {
        const id = studentId;
    
        const response = await fetch(`/api/student/${id}`, {
          method: 'PUT',
          body: JSON.stringify({
           first_name,
           last_name,
           email
        }),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.ok) {
          alert(`${first_name} ${last_name} successfully updated.`);
          document.location.replace('/students');
        } else {
          alert('Failed');
        }
      }
}

// $('.add-student-form').submit(addStudentHandler)
$(document).on('click', '.delete-student-btn', deleteStudent);
// $(document).on('click', '.update-student-btn', updateStudent);

document
  .querySelector('.add-student-form')
  .addEventListener('submit', addStudentHandler);

// document
//   .querySelector('.delete-student-btn')
//   .addEventListener('click', deleteStudent);

document
  .querySelector('.update-student-btn')
  .addEventListener('click', updateStudent);