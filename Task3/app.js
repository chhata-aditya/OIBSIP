const addBtn = document.getElementById('add-btn');
const navbar = document.getElementById('navbar');
let arrayList = [];
let varyTypeOfPanel = 'all';
let variedTypeOfPanel = [];

const save_text = () => {
  const listJson = JSON.stringify(arrayList);
  localStorage.setItem('ListValue', listJson);
};

const getTextValue = () => JSON.parse(localStorage.getItem('ListValue')) || [];

addBtn.addEventListener('click', (event) => {
  event.preventDefault();

  const textValue = document.getElementById('input-text-value').value;
  const dateClass = document.getElementById('input-text-date').value;

  if (textValue && dateClass) {
    const todo = {
      text: textValue, date: dateClass, state: 'pending', id: new Date().getTime(),
    };
    arrayList = [...arrayList, todo];

    save_text();
    if (varyTypeOfPanel === 'all') {
      getAllValues();
    } else {
      getText_filter(varyTypeOfPanel);
    }

    document.getElementById('input-text-value').value = '';
    document.getElementById('input-text-date').value = '';
  }
});

const getAllValues = (filter, variedTypeOfPanel) => {
  const ListsValue = sortItems(variedTypeOfPanel);
  const ListValue = document.getElementById('list-container');
  ListValue.innerHTML = '';

  if (ListsValue.length === 0) {
    const emptyListString = filter
      ? `${filter} list is empty!`
      : `Add Tasks!`;
    ListValue.innerHTML = `<p style="text-align:center;">${emptyListString}</p>`;
  } else {
    ListsValue.forEach((item) => {
      const itemValue = document.createElement('li');
      itemValue.dataset.id = item.id;
      itemValue.classList = item.state;

      const elementValue = createElement(item);
      itemValue.innerHTML = elementValue;
      ListValue.appendChild(itemValue);
    });
  }
};

const sortItems = (variedTypeOfPanel) => {
  const ListValue = variedTypeOfPanel ? variedTypeOfPanel : getTextValue();
  arrayList = getTextValue();

  ListValue.sort((a, b) => {
    if (a.state === b.state) {
      return new Date(a.date) - new Date(b.date);
    } else {
      return a.state === 'completed' ? 1 : -1;
    }
  });

  return ListValue;
};

const createElement = (todo) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const overdue =
    changeDateType(getDate(todo.date)) < today && todo.state === 'pending';
  const dateClass = overdue ? 'input-text-date overdue' : 'input-text-date';
  const ButtonIconClass =
    todo.state === 'pending' ? 'fa-circle' : 'fa-circle-check';

  return `
    <div class="todo">
      <button class="todo-btn"><i class="fa-regular ${ButtonIconClass}"></i></button>
      <div>
        <p class="input-text-value">${todo.text}</p>
        <span class="${dateClass}">${getDate(todo.date)}</span>
      </div>
    </div>
    <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
  `;
};

document.body.addEventListener('click', (event) => {
  if (event.target.closest('.todo-btn')) {
    const itemValue = event.target.closest('li');
    itemStatetoggle(itemValue);
  }

  if (event.target.closest('.delete-btn')) {
    const itemValue = event.target.closest('li');
    itemDelete(itemValue);
  }
});

const itemStatetoggle = (itemValue) => {
  const todo = arrayList.find(
    (todo) => todo.id === Number(itemValue.dataset.id)
  );

  if (todo.state === 'pending') {
    todo.state = 'completed';
    itemValue.classList = 'completed';
    itemValue.querySelector('.fa-regular').classList =
      'fa-regular fa-circle-check';
  } else if (todo.state === 'completed') {
    todo.state = 'pending';
    itemValue.classList = 'pending';
    itemValue.querySelector('.fa-regular').classList = 'fa-regular fa-circle';
  }

  save_text();
};

const itemDelete = (itemValue) => {
  let todos = variedTypeOfPanel.length > 0 ? variedTypeOfPanel : arrayList;

  todos = todos.filter((todo) => todo.id !== Number(itemValue.dataset.id));
  arrayList = arrayList.filter(
    (todo) => todo.id !== Number(itemValue.dataset.id)
  );

  save_text();
  getAllValues(varyTypeOfPanel, todos);
};

const getText_filter = (filter) => {
  varyTypeOfPanel = filter;
  const today = new Date().setHours(0, 0, 0, 0);

  switch (filter) {
    case 'pending':
      variedTypeOfPanel = getItemState('pending');
      getAllValues(filter, variedTypeOfPanel);
      break;

    case 'completed':
      variedTypeOfPanel = getItemState('completed');
      getAllValues(filter, variedTypeOfPanel);
      break;

    case 'all':
    default:
      variedTypeOfPanel = [];
      getAllValues();
      break;
  }
};

const getItemState = (state) => {
  const itemsstate = arrayList.filter((todo) => todo.state === state);
  return itemsstate;
};

const changeDateType = (dateString) => {
  const [day, month, year] = dateString.split('/');
  return new Date(year, month - 1, day);
};

const getDate = (dateClass) => {
  const date = new Date(dateClass);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

navbar.addEventListener('click', (event) => {
  const navButtons = navbar.querySelectorAll('button');

  navButtons.forEach((button) => (button.classList = ''));

  const button = event.target.closest('button');
  if (button) {
    button.classList = 'active';
    const filter = button.dataset.filter;
    getText_filter(filter);
  }
});

getAllValues();