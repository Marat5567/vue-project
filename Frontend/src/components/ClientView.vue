<template>
  <div class="MainContainer">
    <h2 style="text-align: left;">Поиск книги по:</h2>
    <form @submit.prevent="FindBook">
      <div class="blockInput">
        <label>Автору:</label>
        <input type="text" v-model="searchAuthor" placeholder="Автор">
      </div>

      <div class="blockInput">
        <label>Жанру:</label>
        <input type="text" v-model="searchGenre" placeholder="Жанр">
      </div>

      <div class="blockInput">
        <label>Издателю:</label>
        <input type="text" v-model="searchPublisher" placeholder="Издатель">
      </div>
    </form>

    <h2>Список забронированных книг</h2>

    <table class="Table">
      <thead>
        <tr>
          <th style="width: 45%;">Книга</th>
          <th style="width: 30%;">Клиент</th>
          <th style="width: 15%;">Статус</th>
          <th style="width: 10%;">Действие</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in BookedByUser" :key="item.id">
          <td>{{ item.bookName }}</td>
          <td>{{ item.client }}</td>
          <td>{{ item.status }}</td>
          <td>
            <button @click="takeBookUser(item.id)" type="button" v-if="item.status == 'Получена'" class="buttonAction" style="background-color: #ffc107;">{{ item.action }}</button>
          </td>
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
          <th style="width: 10%;">Действие</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in filteredBooks" :key="book.id">
          <td v-if="book.status == 'Свободны'" style="background-color: #009608;">{{ book.bookName }}</td>
          <td>{{ book.bookName }}</td>
          <td>{{ book.author }}</td>
          <td>{{ book.genre }}</td>
          <td>{{ book.publisher }}</td>
          <td>
            <button @click="addToList(book.id)" type="button" class="buttonAction" style="background-color: red;">Забронировать</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import BooksList from './Books.vue';
import UserByBooked from './Books.vue';

export default {
  data() {
    return {
      searchAuthor: '',
      searchGenre: '',
      searchPublisher: '',
      ListBooks: BooksList.data().ListBooks,
      BookedByUser: UserByBooked.data().BookedByUser,
    };
  },
  computed: {
    filteredBooks() {
      return this.ListBooks.filter(book => {
        return (
          (this.searchAuthor == '' || book.author.toLowerCase().includes(this.searchAuthor.toLowerCase())) &&
          (this.searchGenre == '' || book.genre.toLowerCase().includes(this.searchGenre.toLowerCase())) &&
          (this.searchPublisher == '' || book.publisher.toLowerCase().includes(this.searchPublisher.toLowerCase()))
        );
      });
    }
  },
  methods: {
    addToList(bookId) {
      const bookToBook = this.ListBooks.find(book => book.id === bookId);

      if (bookToBook) {
        this.BookedByUser.push({
          id: bookId,
          bookName: bookToBook.bookName,
          client: 'Имя клиента',
          status: 'Забронирована',
          action: 'Выдать',
        });

        bookToBook.status = 'Забронирована';
      }
    }
  }
};
</script>

<style scoped>
.MainContainer {
  margin: 0 auto;
  padding: 15px;
  width: 1500px;
  height: auto;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 12px #c9c6bd;
}
.blockInput {
  display: flex;
  align-items: center;
  padding: 15px;
}
.blockInput label {
  width: 80px;
  margin-right: 10px;
  font-size: 18px;
}
input {
  width: 60%;
  padding: 10px;
  margin: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
h2 {
  text-align: center;
  font-weight: 100;
  padding: 10px;
  margin-top: 40px;
  margin-bottom: 0;
}
.Table {
  width: 100%;
  border-collapse: collapse;
  background-color: #ffffff;
  font-size: larger;
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
.buttonAction {
  width: 100%;
  height: 30px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
