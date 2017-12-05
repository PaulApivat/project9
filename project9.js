


var todoList = {
	todos: [],					
	// displayTodos: function(todos){						
	// 		if (this.todos.length === 0){				
	// 		console.log("Paul's todo list is EMPTY");						
	// 		} else {									
	// 		console.log("Paul's todo list:");              
	// 			for (i = 0; i < this.todos.length; i++){
	// 			if (this.todos[i].completed === true) {
	// 				console.log(this.todos[i].todoText, "(x)");	
	// 			} else {
	// 				console.log(this.todos[i].todoText, "( )");	
	// 				}
	// 		}
	// 	}
	// },
	addTodos: function(todoText){  
		this.todos.push({			
			todoText: todoText,		
			completed: false		
		});
	//	this.displayTodos();				
	},
	changeTodos: function(position, todoText){     
		this.todos[position] = {    
			todoText: todoText,
			completed: false
		};
	//	this.displayTodos();			
	},
	deleteTodos: function(position) {
		this.todos.splice(position, 1);
	//	this.displayTodos();
	},
	toggleCompleted: function(position){			
		var todo = this.todos[position];			
		todo.completed = !todo.completed;
	//	this.displayTodos();			
	},
	toggleAll: function() {
		var totalTodos = this.todos.length;				//creating new variables
		var completedTodos = 0;							//why set to '0'?

		//Get number of completed todos; if 'everything is true' is for-loop counting              
		for (var i = 0; i < totalTodos; i++) {
			if (this.todos[i].completed === true){
				completedTodos++;
			}
		}

		//If everything's true, make everything false
				if (completedTodos === totalTodos) {
					for (var i = 0; i < totalTodos; i++){
					this.todos[i].completed = false;
				}
			}
		//Otherwise, make everything true
			else {
				for (var i = 0; i < totalTodos; i++){     // add else with for-loop
					this.todos[i].completed = true;
				}
			}
	//		this.displayTodos();
		}

}

//1. access displayTodos button
//2. run displayTodos method, when click on the button. 


var handlers = {
	//displayTodos: function(){
	//	todoList.displayTodos();
	//},
	addTodos: function(){
		var addTodoTextInput = document.getElementById("addTodoTextInput");
		todoList.addTodos(addTodoTextInput.value);
		addTodoTextInput.value = '';
		view.displayTodos();
	},
	changeTodos: function(){
		var changeTodoPositionInput = document.getElementById("changeTodoPositionInput");
		var changeTodoTextInput = document.getElementById("changeTodoTextInput");
		todoList.changeTodos(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
		changeTodoPositionInput.value ='';
		changeTodoTextInput.value ='';
		view.displayTodos();
	},
	deleteTodos: function(position){
	//	var deleteTodoPositionInput = document.getElementById("deleteTodoPositionInput");
		todoList.deleteTodos(position);
	//	deleteTodoPositionInput.value ='';
		view.displayTodos();
	},
	toggleCompleted: function(){
		var toggleCompletedPositionInput = document.getElementById("toggleCompletedPositionInput");
		todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
		toggleCompletedPositionInput.value ='';
		view.displayTodos();
	},
	toggleAll: function(){
		todoList.toggleAll();
		view.displayTodos();
	}
};

var view = {
	displayTodos: function(){
		var todosUl = document.querySelector('ul');
		todosUl.innerHTML = '';
		for (var i = 0; i < todoList.todos.length; i++)  {
			var todoLi = document.createElement('li');
			var todo = todoList.todos[i];
			var todoTextWithCompletion = '';

			if (todo.completed === true) {
				todoTextWithCompletion = '(x) ' + todo.todoText;
			} else {
				todoTextWithCompletion = '( ) ' + todo.todoText;
			}

			//if (todoList.todos[i].completed === true) {
			//		todoTextWithCompletion = todoList.todos[i].todoText + "(x)";	
			//	} else {
			//		todoTextWithCompletion = todoList.todos[i].todoText + "( )";
			//	}

			todoLi.id = i;
			todoLi.textContent = todoTextWithCompletion;
			todoLi.appendChild(this.createDeleteButton());
			todosUl.appendChild(todoLi);
		}
	},
	createDeleteButton: function(){
		var deleteButton = document.createElement('button');
		deleteButton.textContent = "Delete";
		deleteButton.className = "deleteButton";
		return deleteButton;
	},
	setUpEventListeners: function() {
		var todosUl = document.querySelector('ul');
		
		todosUl.addEventListener('click', function(event) {
			console.log(event.target.parentNode.id);

			//Get the element that was clicked on
			var elementClicked = event.target;

			//Check if elementCLicked is a delete button
			if (elementClicked.className === 'deleteButton'){
				handlers.deleteTodos(parseInt(elementClicked.parentNode.id));
			}
		});
	}
};

view.setUpEventListeners();

