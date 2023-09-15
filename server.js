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



// function for viewing all employees table
async function AllEmployeesTable(){
   const [employees]= await db.query('SELECT id, first_name, last_name FROM employee');
  //console.log(employees);
   
   console.table(employees);
   menuPrompt();
};
async function allRolesTable(){
    const [roles]=await db.query('SELECT * FROM role');
        console.table(roles);
        menuPrompt();
    
}
async function allEmployeesArray(){
    const [managers]=await db.query('SELECT first_name, last_name FROM employee ');
    let managersNames=managers.map(getFullName);
    function getFullName(item){
        return [item.first_name, item.last_name].join(' ');
    }
    managersNames.push('None');
   //console.log(managersNames);
    return managersNames;
}




async function allDepartmentsTable(){
   const[departments]= await  db.query('SELECT * FROM department');
        console.table(departments);
    menuPrompt();
};

async function addRoleToDb(){
    const [roles]=await db.query('SELECT title FROM role ');
   
   console.log(roles);
   

   const [departments]=await db.query('SELECT id, name FROM department');
        console.log(departments);

   const addRoleQuestion=[
    {
        type: 'input',
        message: 'Please, write the new role name',
        name: 'newRoleName'
    },
    {
        type: 'input',
        message: 'What is the salary for the new role',
        name: 'newRoleSalary',
        
    },
    {
        type: 'list',
        message: 'What department is this role belong to?',
        choices: departments,
        name: 'newRoleDepartment'
    }
   ]
   inquirer
     .prompt(addRoleQuestion)
     .then((data) => {
        console.log(data); 
        console.log(data.newRoleDepartment);
        let depId;
      for (var i=0; i< departments.length; i++){
        if(departments[i].name ===data.newRoleDepartment){
            depId=departments[i].id;
        }
      }
       console.log(depId);
       
        db.query(`INSERT INTO role VALUES ('${roles.length + 1}','${data.newRoleName}', '${data.newRoleSalary}', '${depId}')`);
     })
}

async function addEmployee(){    
   const [roles]=await db.query('SELECT title FROM role ');
   
   console.log(roles);
   var titles= [];
   for (var i=0; i<roles.length;i++){
    let {title: role}=roles[i];
        titles.push(role);
    
   }
   console.log(titles);
   //const manager= allEmployeesArray();
   const [managers]= await db.query('SELECT id, first_name, last_name FROM employee ');
   console.log(managers);
   let allNames=[];
   for (var i=0; i< managers.length; i++){
    let item={};
    item.fullName=managers[i].first_name+' '+managers[i].last_name
    item.id=managers[i].id;
    allNames.push(item);
    
   }
    
    allNames.push('None');
   console.log(allNames);
   
   const newEmployeeQuestions=[
    
    { type:'input',
      message: 'New Employee First Name',
      name: 'first_name',
      
    },
    {
        type: 'input',
        message: 'New Employee Last Name',
        name: 'last_name',
    },
    {
        type: 'list' ,
        message: "What is employee's role?",
        choices: titles,
       
        name: 'role',
     },
     {
        type: 'list',
        message: 'Who is an employee manager?',
        choices: allNames.fullName,
        name:'employeeManager',
        render(){
            let managerId;
            for (var i=0; i< allNames.length; i++){
              if(allNames[i].fullName===this.employeeManager){
                  managerId=allNames[i].id;
                  return managerId;
              }
            }  
        }
     }
    ];
   inquirer
      .prompt(newEmployeeQuestions)
      .then((data) => {
        console.log(data);
           
        db.query(`INSERT INTO employee VALUES  (9,' ${data.first_name}', '${data.last_name}', ${data.employeeManager.render()})`);
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

                case 'Add Role':
                    console.log('you selected - add role');
                    addRoleToDb();
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
                    db.exit;
                    break;

                };
               // console.log(data);
                
              
                console.log('Thank you!');
                
            })
             
    }
init();
    
  