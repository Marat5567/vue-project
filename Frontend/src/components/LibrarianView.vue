<template>
  <div class = "MainContainer">
    <h1 style="text-align: center;">Панель библиотекаря</h1>
    <h2 style="text-align: left;">Управление книгами</h2>
    <form>
      <input v-model="book.bookName" class="input" type="text" placeholder="Название книги" required/>
      <input v-model="book.author" class="input" type="text" placeholder="Автор" required/>
      <input v-model="book.genre" class="input" type="text" placeholder="Жанр" required/>
      <input v-model="book.publisher" class="input" type="text" placeholder="Издатель" required/>
      <input v-model="book.numberOfBooks" class="input" type="number" placeholder="Количество книг" required/>
      <button @click="AddBook()" type="button" class="addButton">Добавить</button>
    </form>
    <h3 style="color: red;">{{error}}</h3>

    <h2>Готовые к получению книги</h2>

    <table class="Table">
    <thead>
      <tr>
        <th style="width: 45%;">Книга</th>
        <th style="width: 30%;">Клиент</th>
        <th style="width: 15%;">Статус</th>
        <th style="width: 10%;">Действие</th>
      </tr>
    </thead>
    <tbody >
        <tr v-for="item in ReceivedByUser" :key="item.id">
          <td>{{item.bookName}}</td>
          <td>{{item.client}}</td>
          <td>{{item.status}}</td>
          <td>
            <button @click="takeBookUser(item.id)" type="button" v-if="item.status == 'Получена'" class="buttonAction" style="background-color: #ffc107;;">{{item.action}}</button>
          </td>
        </tr>
    </tbody>
    </table>


    <h2>Забронированные книги</h2>

    <table class="Table">
      <thead>
        <tr>
          <th style="width: 45%;">Книга</th>
          <th style="width: 30%;">Клиент</th>
          <th style="width: 15%;">Статус</th>
          <th style="width: 10%;">Действие</th>
        </tr>
      </thead>
      <tbody >
          <tr v-for="item in BookedByUsers" :key="item.id">
            <td>{{item.bookName}}</td>
            <td>{{item.client}}</td>
            <td>{{item.status}}</td>
            <td>
              <button @click="giveBookUser(item.id)" type="button" v-if="item.status == 'Забронирована'" class="buttonAction" style="background-color: #009608;">{{item.action}}</button>
            </td>
          </tr>
      </tbody>
      </table>

      <h2>Выданные книги</h2>

      <table class="Table">
      <thead>
        <tr>
          <th style="width: 45%;">Книга</th>
          <th style="width: 30%;">Клиент</th>
          <th style="width: 15%;">Статус</th>
          <th style="width: 10%;">Отсавшееся время</th>
        </tr>
      </thead>
      <tbody>
          <tr v-for="item in IssuedBooks" :key="item.id">
            <td>{{item.bookName}}</td>
            <td>{{item.client}}</td>
            <td>{{item.status}}</td>
            <td>{{}}</td>
          </tr>
      </tbody>
      </table>
    
      <h2>Список книг</h2>

      <table class="Table" style="font-size: medium;">
        <thead>
          <tr>
            <th style="width: 20%;">Название</th>
            <th style="width: 15%;">Автор</th>
            <th style="width: 15%;">Жанр</th>
            <th style="width: 20%;">Издатель</th>
            <th style="width: 5%;">Всего шт</th>
            <th style="width: 10%;">Статус</th>
            <th style="width: 5%;">Кол шт</th>
            <th style="width: 10%;">Действие</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in ListBooks" :key="book.id">
            <td v-if="book.status == 'Свободны'" style="background-color: #009608;">{{book.bookName}}</td>
            <td>{{book.bookName}}</td>
            <td>{{book.author}}</td>
            <td>{{book.genre}}</td>
            <td>{{book.publisher}}</td>
            <td style="text-align: center;">{{book.numberOfBooks}}</td>
            <td style="text-align: center;">{{book.action}}</td>
            <td style="text-align: center;">{{book.booksLeft}}</td>
            <td>
              <button @click="removeBook(book)" type="button" class="buttonAction" style="background-color: red;">Удалить</button>
            </td>
          </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
import BooksList from './Books.vue';
import UsersByBooked from './Books.vue';
import UserByReceived from './Books.vue'
import UserBooksIssued from './Books.vue';

export default{
  data(){
    return{
      error: "",

      book:{
        bookName: "",
        author: "",
        genre: "",
        publisher: "",
        numberOfBooks: "",
      },
      ListBooks: BooksList.data().ListBooks,
      BookedByUsers: UsersByBooked.data().BookedByUsers,
      ReceivedByUser: UserByReceived.data().ReceivedByUser,
      IssuedBooks: UserBooksIssued.data().IssuedBooksByUser,
    }
  },
  methods:{
    AddBook(){
      if ( this.book.bookName && this.book.author && this.book.genre && this.book.publisher && this.book.numberOfBooks > 0){
        const newBook = {
          id: this.ListBooks.length + 1,
          bookName: this.book.bookName,
          author: this.book.author,
          genre: this.book.genre,
          publisher: this.book.publisher,
          numberOfBooks: this.book.numberOfBooks
        }
        this.ListBooks.push(newBook);
      this.book.bookName = "";
      this.book.author = "";
      this.book.genre = "";
      this.book.publisher = "";
      this.book.numberOfBooks = "";
      this.error = null;
      }
      else{
        this.error = "Заполните все поля и введите количество книг болше чем 0 !"
      }
    },
    removeBook(book){
      this.ListBooks = this.ListBooks.filter(b => b.id !== book.id);
    },
    isBookFullyBooked(bookName) {
      const totalReserved = this.BookedByUsers.filter(book => book.bookName === bookName).length;
      const totalBooks = this.ListBooks.find(book => book.bookName === bookName)?.numberOfBooks;
      return totalReserved >= totalBooks;
    },
    giveBookUser(idBookReserved) {
      const book = this.BookedByUsers.find(book => book.id == idBookReserved);
      if (this.isBookFullyBooked(book.bookName)) {
        this.error = "Эта книга полностью забронирована.";
        return;
      }
      if (book && book.status == 'Забронирована') {
        book.status = "Выдана";
        this.IssuedBooks.push({
            id: book.id,
            bookName: book.bookName,
            client: book.client,
            status: "Выдана",
            action: "Вернуть"
        });
        this.BookedByUsers = this.BookedByUsers.filter(b => b.id != idBookReserved);
      }
    },
    takeBookUser(idBookTaked){
      const book = this.ReceivedByUser.find(book => book.id == idBookTaked)
      if (book && book.status == "Получена"){
        book.status = "Принята";

      }
    },

  }
}
</script>


<style scoped>

.MainContainer{
  margin: 0 auto;
  padding: 15px;
  width: 1500px;
  height: auto;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 12px #c9c6bd;
}
form{
  display:flex;
  flex-direction: column;
}
.input{
  width: 60%;
  padding: 10px;
  margin: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
.addButton{
  width: 120px;
  height: 40px;
  margin: 5px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.Table{
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  font-size:larger;
}
.Table th,
.Table td {
  border: 1px solid #ddd;
  padding: 10px;
}

.Table th {
  font-weight: bold;
  background-color: #e3e0d8;
}

.buttonAction{
  width: 100%;
  height: 30px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
h2{
  text-align: center;
  font-weight: 100; 
  padding: 10px;
  margin-top: 40px;
  margin-bottom: 0;
}

</style>