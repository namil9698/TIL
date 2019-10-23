// 7. 모든 요소의 completed 프로퍼티 값을 true로 설정
const todos = [
  { id: 3, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: false }
];

function toggleCompletedAll() {
  Object.assign(todos, todos.map((todo) => {
    if (!todo.completed) todo.completed = !todo.completed;
    return todo;
  }));
}


// function toggleCompletedAll() {
//   Object.assign(todos, todos.map((todo) => ({ ...todo, completed: true })));
// }

toggleCompletedAll();

console.log(todos);
/*
[    return { ...todo, completed: true }
  { id: 3, content: 'HTML', completed: true },
  { id: 2, content: 'CSS', completed: true },
  { id: 1, content: 'Javascript', completed: true }
]
*/
