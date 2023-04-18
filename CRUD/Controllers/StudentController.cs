using CRUD.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRUD.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly StudentContext _studentContext;
        
        //constructor to initiate student contex
        public StudentController(StudentContext studentContext)
        {
            _studentContext = studentContext;
        }
        [HttpGet]
        [Route("GetStudent")]
        public async Task<IEnumerable<Student>>GetStudents()
        {
            return await _studentContext.Students.ToListAsync();
        }

        [HttpPost]
        [Route("AddStudent")]
        public async Task<Student> AddStudent( Student objStudent)
        {
            _studentContext.Students.Add(objStudent);
            await _studentContext.SaveChangesAsync();
            return objStudent;
        }

        [HttpPatch]
        [Route("UpdateStudent/{id}")]
        public async Task<Student> UpdateStudent(Student objStudent)
        {
            _studentContext.Students.Entry(objStudent).State= EntityState.Modified;
            await _studentContext.SaveChangesAsync();
            return objStudent;
        }
 
        [HttpDelete]
        [Route("DeleteStudent/{id}")]
        public string DeleteStudent(int id)
        {
            string a  ;
            var student = _studentContext.Students.Find(id);
            if (student != null)
            {
                a = "Student Deleted";

                _studentContext.Students.Entry(student).State = EntityState.Deleted;
                 _studentContext.SaveChanges();
            }
            else
            {
                a = "Sory we can not find this student";
            }
         
            return  a;
        }


    }
}
