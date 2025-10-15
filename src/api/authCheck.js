import { currentUser, userToken, checkAuth } from "./api.js";

export class AuthCheck {
  constructor() {
    this.isAuthenticated = false;
  }

  async initialize() {
    this.isAuthenticated = await checkAuth();
    return this.isAuthenticated;
  }

  // Проверка авторизации синхронно
  isUserAuthenticated() {
    return !!userToken && !!currentUser;
  }

  // Получить данные текущего пользователя
  getCurrentUser() {
    return currentUser;
  }

  // Получить токен
  getToken() {
    return userToken;
  }

  // Подписка на изменения авторизации
  onAuthChange(callback) {
    this.authChangeCallback = callback;
  }

  // Уведомление об изменении авторизации
  notifyAuthChange() {
    if (this.authChangeCallback) {
      this.authChangeCallback(this.isUserAuthenticated(), currentUser);
    }
  }
}

// Создаем экземпляр для использования
export const authCheck = new AuthCheck();
