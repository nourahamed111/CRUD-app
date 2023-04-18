import axios from "axios";
import { useEffect, useState } from "react";
export default function StudentCrud() {
    const [id, setId] = useState('');
    const [name, setName] = useState('');
    const [courses, setCourse] = useState('');
    const [students, setUsers] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    useEffect(() => {
      Load();
    }, []);
    async function Load() {
      const result = await axios('https://localhost:7061/api/Student/GetStudent');
      setUsers(result.data);
    }
    async function save(event) {
      event.preventDefault();
      if (!name || !courses) {
        alert('Please fill out all fields');
        return;
      }
      try {
        await axios.post('https://localhost:7061/api/Student/AddStudent', {
          name: name,
          courses: courses,
        });
        alert('Student Registeration Successfully');
        setId('');
        setName('');
        setCourse('');
        Load();
      } catch (err) {
        alert("Registeration Failed");
      }
    }
    async function editStudent(students) {
      setName(students.name);
      setCourse(students.courses);
      setId(students.id);
      setIsEdit(true);
    }
  
    async function DeleteStudent(id) {
      await axios.delete('https://localhost:7061/api/Student/DeleteStudent/' + id);
      alert('Student deleted Successfully');
      Load();
    }
    async function update(event) {
      event.preventDefault();
      if (!id || !name || !courses) {
        alert('Please fill out all fields');
        return;
      }
      try {
        await axios.patch(
          'https://localhost:7061/api/Student/UpdateStudent/' +
            students.find((u) => u.id === id).id ||
            id,
          {
            id: id,
            name: name,
            courses: courses,
          }
        );
        alert('Registation Updated');
        setId('');
        setName('');
        setCourse('');
        setIsEdit(false);
        Load();
      } catch (err) {
        alert("Please check if this user is already existed and the field is not empty");
      }
    }
  return (
    <div className="Container">
        <div>
        <form>
            <input 
              type="text"
              className="form-control"
              id="id"
              hidden
              value={id}
              onChange={(event) => {
                setId(event.target.value);
              }}
            />
            <label>Student Name</label>
            <input
              type="text"
              id="stname"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
              }}
            />
          
          <div >
            <label>Course</label>
            <input
              type="text"
              id="course"
              value={courses}
              onChange={(event) => {
                setCourse(event.target.value);
              }}
            />
          </div>
          <div>
          <button className="btn btn-primary mt-4" onClick={save} disabled={isEdit}>
              Register
            </button>
            <button className="btn btn-warning mt-4" onClick={update}>
              Update
            </button>
          </div>
        </form>
      </div>
      <br></br>
 
      <table className="table table-striped table-hover" >
        <thead>
          <tr>
            <th scope="col">Student Id</th>
            <th scope="col">Student Name</th>
            <th scope="col">Course</th>
            <th scope="col">Option</th>
          </tr>
        </thead>
        {students.map((student) => (
            <tbody key={student.id}>
              <tr>
                <th scope="row">{student.id} </th>
                <td>{student.name}</td>
                <td>{student.courses}</td>
                
                <td>
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => editStudent(student)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => DeleteStudent(student.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
        
        ))}
      </table>
    </div>

  )
}