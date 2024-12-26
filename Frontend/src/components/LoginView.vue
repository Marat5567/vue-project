<template>
  <div class="MainContainer">
    <h1 style="text-align: center;">Вход</h1>
    <form>
      <label>Логин</label>
      <input @input="ClearError()" v-model="username" class="input" type="text" placeholder="Введите логин" required/>
       <label>Пароль</label>
      <input @input="ClearError()" v-model="password" class="input" type="password" placeholder="Введите пароль" required/>
      <button @click="login()" class="buttonLogin" type="button">Войти</button>
    </form>
    <h3 style="color: red; text-align: center;">{{error}}</h3>
  </div>
</template>
  
<script>
  export default {
    data() {
      return {
        username: '',
        password: '',
        error: ''
      };
    },
    methods: {
      login() {
        //Для примера жёстко привязана имя и пароль
        if (this.username == 'admin' && this.password == 'admin') {
          localStorage.setItem('role', 'admin');
          this.$router.push({ name: 'admin' });
        } else if (this.username == 'librarian' && this.password == 'librarian') {
          localStorage.setItem('role', 'librarian');
          this.$router.push({ name: 'librarian' });
        } else if (this.username == 'client' && this.password == 'client') {
          localStorage.setItem('role', 'client');
          this.$router.push({ name: 'client' });
        } else {
          this.error = 'Неверный логин или пароль!'
        }
      },
      ClearError(){
        if (!this.username || !this.password){
          this.error = null;
        }
      }
    }
  };
</script>
  
<style scoped>
.MainContainer{
  width: 400px;
  height: auto;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 12px #c9c6bd;
  margin: 0 auto;
  padding: 10px; 
  background-color: #000;
  color: #fff;
}
form{
  display: flex;
  flex-direction: column;
  align-items: center;
}
label{
  text-align: center;
  
}
.input{
  padding: 10px;
  margin: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 20px;
  font-size: 18px;
}
.buttonLogin{
  width: 160px;
  height: 40px;
  margin-top: 10px;
  text-align: center;
  background-color:  greenyellow;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
</style>
  