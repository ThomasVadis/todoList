let ID = '1120';
let taskDomain = 'https://fewd-todolist-api.onrender.com/tasks?api_key='




let saveNewTask = function (taskDescription){
  $.ajax({
    type: 'POST',
    url: taskDomain + ID,
    contentType: 'application/json',
    dataType: 'json',
    data: JSON.stringify({
      task: {
        content: taskDescription
      }
    }),
    success: function (response, textStatus) {
      if(textStatus === "success"){
        let ul = $('#todoList')
        ul.append('<li class="todo-item"> <p class="item-desc text-wrap text-break">'+ response.task.content +'</p>'+
        '<button type="button" class="btn btn-danger remove"> remove item</button>'+
        '<span class="hidden-ID">' + response.task.id +'</span></li>')
      }

    },
    error: function (request, textStatus, errorMessage) {
      alert("todo was not added")

    }
  });
}

let addItem = function() {
  let input = $("#newTodo");
  let text = input.val().trim();

  if (text !== "") {

    saveNewTask(text)

    input.val('')
  }
}


let displayTask = function(savedTasks){
  let ul = $("#todoList");

  savedTasks.forEach((task)=>{
    let status = task.completed ? 'completed' : ''

    ul.append('<li class="todo-item"> <p class="item-desc text-wrap text-break ' + status + '">'+ task.content +'</p>'+
    '<button type="button" class="btn btn-danger remove"> remove item</button>'+
    '<span class="hidden-ID">' + task.id +'</span>'+
    '</li>');
  })
}


let getSavedTask = function(){
  $.ajax({
    type: 'GET',
    url: taskDomain + ID,
    dataType: 'json',
    success: function (response, textStatus) {

;      displayTask(response.tasks);
    },
    error: function (request, textStatus, errorMessage) {

      return textStatus;
    }
  });
}




let updateTaskStatus = function(element){
  element.find('p.item-desc').toggleClass('completed');
  let taskID = element.find('.hidden-ID').html()
  let status = element.find('p.item-desc').hasClass("completed") ? 'mark_complete' : 'mark_active';

  $.ajax({
    type: 'PUT',
    url: 'https://fewd-todolist-api.onrender.com/tasks/' + taskID +'/' + status + '?api_key=' +ID,
    dataType: 'json',
    success: function (response, textStatus) {

    },
    error: function (request, textStatus, errorMessage) {
      alert("Could not update todo")
    }
  });


}

let deleteTask = function(element){
  let taskID = element.find('.hidden-ID').html()
  $.ajax({
    type: 'DELETE',
    url: 'https://fewd-todolist-api.onrender.com/tasks/' + taskID + '?api_key=' +ID,
    success: function (response, textStatus) {

      if(textStatus === "success"){
        element.remove();
      }
    },
    error: function (request, textStatus, errorMessage) {
      alert("todo was not deleted")
    }
  });
}








let filterTodos = function(filter)  {

  let todos = $('.todo-item')

  todos.each(function(){
    let todo = $(this)
    let p = todo.find('p.item-desc')


    switch (filter) {
      case "completed":
        todo.css('display', p.hasClass("completed") ? "flex" : "none");
        break;
      case "incomplete":
        todo.css('display',  p.hasClass("completed") ? "none" : "flex");
        break;
      default:
        todo.css('display', "flex");
        break;
    }
  }
  )
}

$(document).ready(function () {

  $(document).on('click', '.todo-item', function(){
    updateTaskStatus($(this))

  })

  $(document).on('click', '.btn.remove',function(){
    deleteTask($(this).closest('li'))
  })


  getSavedTask()




}

)