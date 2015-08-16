//This is used

//Employee constructor to take input from form
var Employee = function(fName, lName, empNum, title, review, salary){
  this.fName = fName || 'Jake';
  this.lName = lName || 'Scearcy';
  this.empNum = empNum || 1000;
  this.title = title || 'Tester';
  this.review = review || 3;
  this.salary = parseInt(salary) || 100000;
}

//the main jQuery event listener
var main = function() {
  //variables used throughout the jquery functions
  var sorterList = [];
  var $salies = $('span#TotalSalary');
  var inst = 0;
  var $myList = $('#EmpTable');
  var employees = [];
  $myList.sortable({
    appendto: document.body,
  })
  //submit button when the form is filled out
  $('#Submit').click(function(e){
    //take form data and store it as an object
    var $emp = new Employee($('#FirstName').val(), $('#LastName').val(), $('#EmpNum').val(),
                            $('#Title').val(), $('#Review').val(), $('#Salary').val());
    $emp.instance = inst; //a unique instance number to avoid duplicate issues
    inst += 1;
    employees.push($emp);
    resetForm();
    e.preventDefault();
  })
  //clear the screen of all employees
  $('#ClearAll').click(function(e){
    $('#EmpTable').empty();
    sorterList = [];
    employees = [];
    inst = 0;
    $('span#TotalSalary').text(salaryUpdate(sorterList));
    e.preventDefault();
  })
  //show the data stored in the variable using function defined below
  $('#Populate').click(function(e){
    employees.forEach(function(emp){
      displayEmployees(emp)
    })
    employees.forEach(function(obj){
      sorterList.push(obj);
    })
    $salies.text(salaryUpdate(sorterList));
    employees = [];
    deleteButton();
    hideButton();
    e.preventDefault();

  })
  //hide but keep employees in memory
  $('#unPopulate').click(function(e){
    $('#EmpTable').empty();
    sorterList.forEach(function(obj){
      employees.push(obj);
    })
    sorterList = [];
    $salies.text(salaryUpdate(sorterList));
    deleteButton();
    hideButton();
    e.preventDefault();
  })
  //sort button action - runs the sorting function and feeds the array into it
  $('#Sort').click(function(e){
    sortList(sorterList);
    deleteButton();
    hideButton();
    e.preventDefault();
  })
  //create an Employee object out of the list provided
  $('#RandEmp').click(function(e){
    var thisEmp = nameTitleGen();
    thisEmp.instance = inst;
    inst += 1;
    employees.push(thisEmp);
    e.preventDefault();
  });
  $('#Reset').click(function(e){
    resetForm();
    e.preventDefault();
  })
  //take an employee object and display on screen
  function displayEmployees(emp){
    var $myListDiv = $('<div>')
    var $myListItem = $('<ul>');
    var $clearButton = $('<button>');
    var $hideButton = $('<button>');
    $myListDiv.attr({id: emp.lName + emp.instance, class: 'listItem'});
    $clearButton.attr({class: 'deleteOne',
                      id: emp.lName + emp.instance});
    $clearButton.html('Delete');
    $hideButton.attr({class: 'hideOne',
                      id: emp.lName + emp.instance});
    $hideButton.html('Hide');
    $myListItem.attr({class: 'empListItem'});
    var listtext = $('<li id="' + emp.fName + '">' + emp.lName + ", " + emp.fName + '<li>Emp. Num: ' + emp.empNum
                    + '<li>Title: ' + emp.title + reviewColor(emp)+ 'Review Score: ' + emp.review + '<li>Salary: $' + emp.salary.toLocaleString() + '</li>');
    $myListItem.append(listtext);
    $myListItem.append($clearButton);
    $myList.append($myListDiv.append($myListItem.append($hideButton)));
  }
  //function to sort the list by last name
  function sortList(array){
    array.sort(function(a,b){
       var keyA = a.lName.toUpperCase() + a.fName.toUpperCase();
       var keyB = b.lName.toUpperCase() + b.fName.toUpperCase();
       if (keyA < keyB) return -1;
       if (keyA > keyB) return 1;
       return 0;
     });
     $('#EmpTable').empty();
     array.forEach(function(obj){
       displayEmployees(obj);
     })
   }
   //function to change class on the review list item depending on score
   function reviewColor(obj){
     switch(parseInt(obj.review)){
      case 1:
        return '<li class="bad"> ';
        break;
      case 2:
        return '<li class="bad"> ';
        break;
      case 3:
        return '<li class="satisfactory"> '
        break;
      case 4:
        return '<li class="good">'
        break;
      case 5:
        return '<li class="good">'
        break;
      default:
        return '<li>'
     }
   }
   //update the total of salaries being displayed
   function salaryUpdate(objArray){
     var salaries = 0;
     if(objArray.length > 0){
       objArray.forEach(function(obj){
         salaries += obj.salary
       })
     }
     return ('$' + salaries.toLocaleString());
   }
   //the function for the event listener to delete an employee
   function deleteButton() {
     $('button.deleteOne').click(function(){
       var thisId = $(this).attr('id');
       $(this).parent().parent().remove();
       sorterList.forEach(function(obj, i){
         if(obj.lName + obj.instance == thisId){
           sorterList.splice(i, 1);
         }
       })
       $('span#TotalSalary').text(salaryUpdate(sorterList));
     })
   }
   function hideButton() {
     $('button.hideOne').click(function(){
       var thisId = $(this).attr('id');
       $(this).parent().parent().remove();
       sorterList.forEach(function(obj, i){
         if(obj.lName + obj.instance == thisId){
           employees.push(obj);
           sorterList.splice(i, 1);
         }
       })
       $('span#TotalSalary').text(salaryUpdate(sorterList));
     })
   }
   function resetForm(){
     $('input.field').val('');
     $('select').prop('selectedIndex', 0);
   }
}


$(main)
