using System.ComponentModel.DataAnnotations;

namespace CRUD.Models
{
    public class Student
    {
        [Key]
        public int ID { get; set; }
        public string? Name { get; set; }
        public string? Courses { get; set; }


    }
}
