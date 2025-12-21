const API_URL = 'http://localhost:3001';

// GET запросы
export const fetchUsers = () => {
  return fetch(`${API_URL}/users`).then(res => res.json());
};

export const fetchFeedback = () => {
  return fetch(`${API_URL}/feedback`).then(res => res.json());
};

// POST запрос
export const createFeedback = (feedback) => {
  return fetch(`${API_URL}/feedback`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(feedback)
  }).then(res => res.json());
};

// PUT запрос на редактирование
export const updateUser = (id, userData) => {
  return fetch(`${API_URL}/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  }).then(res => res.json());
};

// DELETE запрос на удаление отзыва
export const deleteFeedback = (id) => {
  return fetch(`${API_URL}/feedback/${id}`, {
    method: 'DELETE'
  }).then(res => res.json());
};

// POST запрос для авторизации
export const loginUser = (credentials) => {
  return fetch(`${API_URL}/users?username=${credentials.username}&password=${credentials.password}`)
    .then(res => res.json())
    .then(users => {
      if (users.length > 0) return users[0];
      throw new Error('Неверные данные');
    });
};