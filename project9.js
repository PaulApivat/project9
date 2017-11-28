


var todoList = {
	todos: [],					
	displayTodos: function(todos){						
			if (this.todos.length === 0){				
			console.log("Paul's todo list is EMPTY");						
			} else {									
			console.log("Paul's todo list:");              
				for (i = 0; i < this.todos.length; i++){
				if (this.todos[i].completed === true) {
					console.log(this.todos[i].todoText, "(x)");	
				} else {
					console.log(this.todos[i].todoText, "( )");	
					}
			}
		}
	},
	addTodos: function(todoText){  
		this.todos.push({			
			todoText: todoText,		
			completed: false		
		});
		this.displayTodos();				
	},
	changeTodos: function(position, todoText){     
		this.todos[position] = {    
			todoText: todoText,
			completed: false
		};
		this.displayTodos();			
	},
	deleteTodos: function(position, numberOfItems){
		this.todos.splice(position, numberOfItems);
		this.displayTodos();
	},
	toggleCompleted: function(position){			
		var todo = this.todos[position];			
		todo.completed = !todo.completed;
		this.displayTodos();			
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
			this.displayTodos();
		}

}

//1. access displayTodos button

var displayTodosButton = document.getElementById("displayTodosButton");
console.log(displayTodosButton);

//2. run displayTodos method, when click on the button. 

displayTodosButton.addEventListener('click', function(){
	todoList.displayTodos();
});


var toggleAllButton = document.getElementById("toggleAllButton");
console.log(toggleAllButton);

toggleAllButton.addEventListener('click', function(){
	todoList.toggleAll();
});
