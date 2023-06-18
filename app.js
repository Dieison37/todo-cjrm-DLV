const formAddTodo = document.querySelector('.form-add-todo')
const inputSearchTodo = document.querySelector('.form-search input')
const todosContainer = document.querySelector('.todos-container')

// Modificando a função 'addtodo' para armazenar os dados  na localStorage.
const addTodo = inputValue => {
  if (inputValue.length) {
    todosContainer.innerHTML += `
    <li class="list-group-item d-flex justify-content-between align-items-center" data-todo="${inputValue}">
     <span>${inputValue}</span>
     <i class="far fa-trash-alt" data-trash="${inputValue}"></i>
    </li>
  `
    event.target.reset()

    // Armazenando os dados na localStorage.
    const todos = JSON.parse(localStorage.getItem('todos')) || []
    todos.push(inputValue)
    localStorage.setItem('todos', JSON.stringify(todos))

  }
}

// Mantendo os dados da localStorage ao recarregar a página. 
window.addEventListener('DOMContentLoaded', () => {
  const todos = JSON.parse(localStorage.getItem('todos')) || []
  todos.forEach(todo => {
    todosContainer.innerHTML += `
    <li class="list-group-item d-flex justify-content-between align-items-center" data-todo="${todo}">
     <span>${todo}</span>
     <i class="far fa-trash-alt" data-trash="${todo}"></i>
    </li>
  `
  })
})

formAddTodo.addEventListener('submit', event => {
  event.preventDefault()

  const inputValue = event.target.add.value.trim()
 addTodo(inputValue) 
})

const removeTodo = clickedElement => {
  const trashDataValue = clickedElement.dataset.trash
  const todo = document.querySelector(`[data-todo="${trashDataValue}"]`)
  
  if (trashDataValue) {
    todo.remove()
  }
}

todosContainer.addEventListener('click', event => {
  const clickedElement = event.target
  removeTodo(clickedElement)
})

const filterTodos = (todos, inputValue, returnMatchedTodos) => todos
    .filter(todo => {
      const matchedTodos = todo.textContent.toLowerCase().includes(inputValue)
      return returnMatchedTodos ? matchedTodos : !matchedTodos 
    })

const manipulateClasses = (todos, classToAdd, classToRemove) => {
  todos.forEach(todo => {
    todo.classList.remove(classToRemove)
    todo.classList.add(classToAdd)
  })
}

const hideTodos = (todos, inputValue) =>{
    const todosToHide = filterTodos(todos, inputValue, false)
    manipulateClasses(todosToHide, 'hidden', 'd-flex')
}

const showTodos = (todos, inputValue) => {
    const todosToShow = filterTodos(todos, inputValue, true)
    manipulateClasses(todosToShow, 'd-flex', 'hidden')
}

inputSearchTodo.addEventListener('input', event => {
  const inputValue = event.target.value.trim().toLowerCase()
  const todos = Array.from(todosContainer.children)

  hideTodos(todos, inputValue)
  showTodos(todos, inputValue)
})

/* Adicionando um evento de clique para os ícones de lixeira no evento 'DOMContentLoaded', logo após a criação dos elementos na tela. */

window.addEventListener('DOMContentLoaded', () => {
  const trashIcons = document.querySelectorAll('.fa-trash-alt')
  trashIcons.forEach(icon => {
    icon.addEventListener('click', () => {
      removeTodoIcon(icon)
    })
  })
})

/* Criando uma nova função chamada 'removeTodoIcon' que será responsável por remover o item quando o ícone de lixeira for clicado. */
const removeTodoIcon = clickedIcon => {
  const trashDataValue = clickedIcon.dataset.trash
  const todo = document.querySelector(`[data-todo="${trashDataValue}"]`)
  
  if (trashDataValue) {
    todo.remove()
    removeTodoFromLocalStorage(trashDataValue)
  }
}

/* Adicionando uma nova função chamada 'removeTodoFromLocalStorage' para remover o item correspondente do armazenamento local. */
const removeTodoFromLocalStorage = todoValue => {
  const todos = JSON.parse(localStorage.getItem('todos')) || []
  const updatedTodos = todos.filter(todo => todo !== todoValue)
  localStorage.setItem('todos', JSON.stringify(updatedTodos))
}
