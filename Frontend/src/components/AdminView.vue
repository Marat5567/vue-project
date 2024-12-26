<template>
  <div class="MainContainer">
    <h1 style="text-align: center; padding-top: 15px;">Панель администратора</h1>
    <h2 style="text-align: left;">Управление пользователями</h2>
    <form>
      <input @input="ClearError()" v-model="user.username" class="input" type="text" placeholder="Логин" required />
      <input @input="ClearError()" v-model="user.password" class="input" type="text" placeholder="Пароль" required />
      <input @input="ClearError()" v-model="user.role" class="input" type="text" placeholder="Роль (например: admin, user, librarian)" required/>
      <button @click="AddUser()" type="button" class="addButton">Добавить</button>
    </form>
    <h3 style="color: red;">{{error}}</h3>
    <h2 style="text-align: center;">Список пользователей</h2>
    <table class="userTable">
      <thead>
        <tr>
          <th style="width: 30%;">Имя пользователя</th>
          <th style="width: 25%">Пароль</th>
          <th style="width:10%">Роль</th>
          <th style="width: 35%; text-align: center;">Действия</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.username }}</td>
          <td>{{ user.password }}</td>
          <td>{{ user.role }}</td>
          <td style="text-align: center;">
            <button type="button" @click="OpenPasswordModal(user)" class="changeButton">
              Изменить пароль
            </button>
            <button type="button" @click="RemoveUser(user.id)" class="deleteButton">
              Удалить пользователя
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="PasswordModalOpen" class="modal">
      <div class="modal-content">
        <h2>Изменение пароля для {{ selectedUser.username }}</h2>
        <input v-model="newPassword" class="input" type="text" placeholder="Новый пароль" />
        <button type="button" @click="ChangePassword" class="addButton">Сохранить</button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      PasswordModalOpen: false,
      newPassword: "",
      selectedUser: null,
      error: "",
      users: [
        { id: 1, username: "admin", password: "123456", role: "admin" },
        { id: 2, username: "user1", password: "password", role: "user" },
        { id: 3, username: "user2", password: "password123", role: "user" }
      ],

      user:{
        username: "",
        password: "",
        role: ""
      }
    };
  },
  methods: 
  {
    ClearError(){
      if (!this.user.username || !this.user.password || !this.user.role){
        this.error = null;
      }
    },
    AddUser() 
    {
      if (this.user.username && this.user.password && this.user.role) 
        {
          const newUser = {
            id: this.users.length + 1,
            username: this.user.username,
            password: this.user.password,
            role: this.user.role
          };
          this.users.push(newUser);
          
          this.user.username = "";
          this.user.password = "";
          this.user.role = "";
        }
        else{
          this.error = "Заполните все поля !";
        }
    },
    RemoveUser(userId){
      this.users = this.users.filter(user => user.id !== userId);
    },
    OpenPasswordModal(user){
      this.selectedUser = user;
      this.newPassword = "";
      this.PasswordModalOpen = true;
    },
    ChangePassword(){
      if (this.newPassword){
        this.selectedUser.password = this.newPassword;
        this.PasswordModalOpen = false;
      }
      this.PasswordModalOpen = false;
    }
  }
};
</script>

<style scoped>
.MainContainer {
  width: 1000px;
  height: auto;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 12px #c9c6bd;
  margin: 0 auto;
  padding: 15px;
}

form {
  display: flex;
  flex-direction: column;
}

.input {
  width: 60%;
  padding: 10px;
  margin: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.addButton {
  width: 120px;
  height: 40px;
  margin: 5px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

h2 {
  font-weight: 100;
  padding: 10px;
}

.userTable {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
  background-color: #ffffff;
}

.userTable th,
.userTable td {
  border: 1px solid #ddd;
  text-align: left;
  padding: 8px;
}

.userTable th {
  font-weight: bold;
  background-color: #e3e0d8;
}

.changeButton {
  margin-right: 5px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.deleteButton {
  margin-right: 5px;
  padding: 5px 10px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}


.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  width: 300px;
  text-align: center;
}
</style>