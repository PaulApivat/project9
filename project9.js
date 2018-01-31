



var todoList = {										//create todoList object
	todos: [],											//create todos array attribute 
	
	addTodos: function(todoText){  			//create addTodos function that passes todoText argument
			this.todos.push({					//addTodos function adds 'todo' items into todos array through .push method, 'this' refers to todoList object coz todos array 'belongs to' 'this' (todoList object)
			todoText: todoText,				//each to 'todo' item has two value attributes - todoText (a string that is the todolist item) and whether 'completed' boolean (default: false)
			completed: false		
		});		
	},
	changeTodos: function(position, todoText){   //create changeTodos function passing two arguments - position & todoText; when changing a todoList item, we need to know it's position and its text
		this.todos[position] = {    			//indicate a specific item in todos array by - todos[position] - 'this' refers to todoList object
			todoText: todoText,
			completed: false
		};			
	},
	deleteTodos: function(position) {		//create deleteTodos function passing one argument - position; coz that's all you need to know to delete an item
		this.todos.splice(position, 1);		//a .splice method is passed onto todos array; 'position' argument signifies which item to delete; '1' prevents .splice from deleting everyting after a position; 'this' refers to todoList object
	},
	toggleCompleted: function(position){	//creating toggleCompleted function with one argument		
	    var todo = this.todos[position];	//store this.todos[position] in variable 'todo'	(shorter code)	
		todo.completed = !todo.completed;	//the .completed property of an item becomes it's opposite ( = !)
	},
	toggleAll: function() {
		var totalTodos = this.todos.length;		//todos.length counts the total number of items in the todos array; 'this' refers to todoList obj; store it inside totalTodos variable
 		var completedTodos = 0;					//create completedTodos variable, set to '0' initially

// this function exists to verify that all todo items in the todos array is completed; to increment the 'number of completedTodos'.
		this.todos.forEach(function(todo) {		//run forEach method on todos array; function(todo) is a call-back function; function within function; running forEach triggers another function that passes 'todo' argumemt 
			if (todo.completed === true){		//function checks that IF a todo, an argument to the call-back function, is completed (checked with hard === true);
				completedTodos++;			//Then 'adds' a number to completedTodos (increments with ++), which was set to '0' initially
			}
		});

// this function exists to check once 'number of completed Todos' equaled the number of 'todos in total', then..
		this.todos.forEach(function(todo) {    //run call-back function on each todo
			// case 1: if everything's true, make everything false
				if (completedTodos === totalTodos) {   //IF completedTodos (which increments ++) is equal to totalTodos (or total number of items in the todos array)
					todo.completed = false;				//then make everything false
					//case 2: otherwise make everything true
				} else {
					todo.completed = true;	//then make everything true
				}
		});
	}
};




var handlers = {				//create handlers object, to handle all data on interface
	addTodos: function(){		//create addTodos function
		var addTodoTextInput = document.getElementById("addTodoTextInput");   //get user input on DOM by  (id = "addTodoTextInput" on html) and store in variable addTodoTextInput
		todoList.addTodos(addTodoTextInput.value);		//call addTodos function with addTodoTextInput as argument; .value coz (type = "text" in html); pass it into todoList object
		addTodoTextInput.value = '';		//clear textfield once onclicked
		view.displayTodos();				//call view object, run displayTodos function (see below)
	},
	changeTodos: function(){																//create changeTodos function
		var changeTodoPositionInput = document.getElementById("changeTodoPositionInput");	//get user input on DOM by (id="changeTodoPositionInput"), store in changeTodoPositionInput
		var changeTodoTextInput = document.getElementById("changeTodoTextInput");			//get user input on DOM by (id="changeTodoTextInput"), store in changeTodoTextInput
		todoList.changeTodos(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);  //run changeTodos function on todoList object with two argument (type="text", type="number" on html)
		changeTodoPositionInput.value ='';	//clear textfield once onclicked
		changeTodoTextInput.value ='';		//clear textfield once onclicked
		view.displayTodos();				//call view object, run displayTodos function (see below)
	},
	deleteTodos: function(position){		//create deleteTodos function with one argument
		todoList.deleteTodos(position);		//run deleteTodos function on todoList object, reference deleteTodos function already IN todoList object
		view.displayTodos();				//call view object, run displayTodos function (see below)
	},
	toggleCompleted: function(){			//create toggleCompleted function
		var toggleCompletedPositionInput = document.getElementById("toggleCompletedPositionInput");	//get user input on DOM by (id="toggleCompletedPositionInput"), store in toggleCompletedPositionInput variable
		todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);	//run toggleCompleted function on todoList object, with one argument (type="number" in html)
		toggleCompletedPositionInput.value =''; //clear textfield once onclicked
		view.displayTodos();				//call view object, run displayTodos function (see below)
	},
	toggleAll: function(){			//create to toggleAll function
		todoList.toggleAll();		//run toggleAll function on todoList object; reference toggleAll function already IN todoList object
		view.displayTodos();		//call view object, run displayTodos function (see below)
	}
};

//question: everytime function (see above) is run on todoList object, is it referencing the function in todoList object or handlers object? use Debugger?


var view = {		//create view object (note: model = todoList; view = view; control = handlers)
	displayTodos: function(){		//create displayTodos function
		var todosUl = document.querySelector('ul');	//get DOM element ('ul'), store in variable todosUl (querySelector for element already there)
		todosUl.innerHTML = '';		//clear textfield once

		todoList.todos.forEach(function(todo, position) {	//run call back function (todo, position arguments) for each item in todos array, in todoList object
		 	var todoLi = document.createElement('li');		//creat DOM element ('li'), store in variable todoLi (createElement for element NOT already there)
			var todoTextWithCompletion = '';				//clear text field

			if (todo.completed === true) {						//if todo item is completed
				todoTextWithCompletion = '(x) ' + todo.todoText;	//then '(x) ' followed by todo item with todoText attribute (?)
			} else {											//else
				todoTextWithCompletion = '( ) ' + todo.todoText;	//then '( ) ' followed by todo item with todoText attribute (?)
			}
															//code below adds a 'li' (list) element (todoLi) within the 'ul' (unordered list) frame (todosUl)
			todoLi.id = position;							// ???  todoLi.id is set to position (not sure what .id does); position is an argument in the call-back function
			todoLi.textContent = todoTextWithCompletion;	// ???  todoText is set to todoLi stored on todoTextWithCompletion (not sure what's going on here)
			todoLi.appendChild(this.createDeleteButton());	//run appendChild method onto todoLi, with createDeleteButton function, on "this", which reference todoList object
			todosUl.appendChild(todoLi);					//run appendChild method with todoLi as argument, passed onto todosUl variable.
		}, this);											//"this" as second argument for the call-back function forEach so that todoList global variable can be referenced
	},
	createDeleteButton: function(){							//make createDeleteButton function
		var deleteButton = document.createElement('button');	//create DOM element ('button'), store onto deleteButton (createElement for element NOT already there)
		deleteButton.textContent = "Delete";				//create 'Delete' text on each button created
		deleteButton.className = "deleteButton";			//give each button a class ("deleteButton") by using .className method
		return deleteButton;								//show delete button on screen
	},
	setUpEventListeners: function() {						//create setUpEventListeners function
		var todosUl = document.querySelector('ul');			//get DOM element ('ul'), store in variable todosUl (querySelector for element already there)
		
		todosUl.addEventListener('click', function(event) {		//call function on todosUl with two arguments, one being a call-back function
			console.log(event.target.parentNode.id);		//ensure that each event 'click' has unique id; event has properties of target.parentNode.id (see inspect console)

			//Get the element that was clicked on
			var elementClicked = event.target;		//event.target clicked on

			//Check if elementCLicked is a delete button
			if (elementClicked.className === 'deleteButton'){		
				handlers.deleteTodos(parseInt(elementClicked.parentNode.id));	//run deleteTodos function on handlers object; deleteTodos function has argument gets element clicked with specific id)
			}																	// ??? parseInt changes deleteTodos argument into a number
		});
	}
};

view.setUpEventListeners();			// ??? view object won't run unless it's called outside of view (?)



