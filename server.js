const inquirer=require('inquirer');

const mysql=require('mysql2/promise');
//import chalk from 'chalk';
let db;




// Connect to database
// const db = mysql.createConnection(
//   {
//     host: 'localhost',
//     user: 'root',
//     password: 'Pot@to85!',
//     database: 'employee_db'
//   },
//   console.log(`Connected to the employee_db database.`)
// );


console.log('EMPLOYEE MANAGEMENT');

const menu= [
    {
        type: 'list',
        message: "What would you like to do?",
        choices: [
            "View All Employees", 
            "Add Employee", 
            "Update Employee Role",
             "View All Roles", 
             "Add Role", 
             "View All Departments",
              "Add Department",
               "Quit"],
        name: 'task',
     },
]
// Introduction question/task
// const newEmployeeQuestions=[
    
//     { type:'input',
//       message: 'New Employee First Name',
//       name: 'first_name',
//       //when: (answers) => answers['task'] === 'Add Employee'

//     },
//     {
//         type: 'input',
//         message: 'New Employee Last Name',
//         name: 'last_name',
//         //when: (answers) =>  (answers['first_name'])
//     },
//     {
//         type: 'list' ,
//         message: "What is employee's role?",
//         choices: roles,
       
//         name: 'role',
//         //when: (answers)=> (answers['last_name'])

//     }
// ];
// app.get('/api/employee/role', (req,res) =>{
//     const query=`SELECT id AS value, name FROM role;`;
//     let roles=db.query(query, function(err, result){
//         console.log(result);
        
//         return result;
//     })


// function for viewing all employees table
async function AllEmployeesTable(){
   const [employees]= await db.query('SELECT id, first_name, last_name FROM employee');
  //console.log(employees);
   
   console.table(employees);
   menuPrompt();
};
function allRolesTable(){
    db.query('SELECT * FROM role', function(err,results){
        console.table(results);
    })
}

function allDepartmentsTable(){
    db.query('SELECT * FROM department', function(err, results){
        console.table(results)
    })
}
async function addEmployee(){    
   const [roles]=await db.query('SELECT title FROM role ');
   
   console.log(roles);
   var titles= [];
   for (var i; i<roles.length;i++){
    console.log(roles[i].title);
    
    titles[i]=roles[i].title;
    titles.push(title[i]);
    return titles;
   }
   console.log(titles);
   
   const newEmployeeQuestions=[
    
    { type:'input',
      message: 'New Employee First Name',
      name: 'first_name',
      //when: (answers) => answers['task'] === 'Add Employee'

    },
    {
        type: 'input',
        message: 'New Employee Last Name',
        name: 'last_name',
        //when: (answers) =>  (answers['first_name'])
    },
    {
        type: 'list' ,
        message: "What is employee's role?",
        choices: titles,
       
        name: 'role',
        //when: (answers)=> (answers['last_name'])

    }
    ];
   inquirer
      .prompt(newEmployeeQuestions)
      .then((data) => {
        console.log(data)
      }
      )
   
 }
async function init(){
     db =await  mysql.createConnection(
        {
          host: 'localhost',
          user: 'root',
          password: 'Pot@to85!',
          database: 'employee_db'
        },
        console.log(`Connected to the employee_db database.`) 
      );
      menuPrompt();
};     
       
function menuPrompt(){
       inquirer
             .prompt(menu)
             .then((data) => {
                switch (data.task){
                case 'View All Employees' :
                    console.log('You selected - view employees');
                    AllEmployeesTable();
                    break;
                 case 'Add Employee':
                    console.log('You selected - Add new employee');
                     addEmployee();
                     console.log(data);
                     break;

                case 'Update Employee Role':
                    console.log('update role');
                      break;   
                case 'View All Roles':
                    console.log('You selected - view roles');
                    allRolesTable();
                    break;
                 
                case  'View All Departments':
                    console.log('You selected - view departments');
                    allDepartmentsTable();
                    break;


                case 'Quit':
                    console.log('See You Soon!');
                    break;

                };
               // console.log(data);
                
              
                console.log('Thank you!');
                
            })
             
    }
init();
    

  

    //   let roles = db.query(`SELECT id AS value, name FROM role;`, function(err, result) { 
    //     console.log(result)}
    // );
    // return roles;     