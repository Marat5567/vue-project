<template>
    
</template>

<script>
export default{
    data(){
        return{
            //Все книги
            ListBooks:[
                { id: 1, bookName: "Война и мир", author: "Лев Толстой", genre: "Исторический роман", publisher: "Русский вестник", numberOfBooks: 7, action: "Все заняты" },
                { id: 2, bookName: "Преступление и наказание", author: "Фёдор Достоевский", genre: "Роман", publisher: "Русский вестник", numberOfBooks: 5, action: "Все заняты" },
                { id: 3, bookName: "Мастер и Маргарита", author: "Михаил Булгаков", genre: "Мистика", publisher: "Журнал Москва", numberOfBooks: 6, action: "Свободны",  booksLeft: "4"},
                { id: 4, bookName: "Евгений Онегин", author: "Александр Пушкин", genre: "Роман в стихах", publisher: "Собственное издательство", numberOfBooks: 4, action: "Свободны", booksLeft: "3" },
                { id: 5, bookName: "Отцы и дети", author: "Иван Тургенев", genre: "Роман", publisher: "Современник", numberOfBooks: 3, action: "Свободны", booksLeft: "1" },
                { id: 6, bookName: "Герой нашего времени", author: "Михаил Лермонтов", genre: "Роман", publisher: "Отечественные записки", numberOfBooks: 2, action: "Все заняты" }
            ],
            //Забронированные книги
            BookedByUsers:[
                { id: 1, bookName: "Война и мир", client: "Гатауллин Марат", status: "Забронирована", action: "Выдать"},
                { id: 3, bookName: "Преступление и наказание", client: "Шишмарёв Артём", status: "Забронирована", action: "Выдать"},
            ],
            //Получнные обратно книги
            ReceivedByUser:[
                { id: 2, bookName: "Отцы и дети", client: "Иванов Альберт", status: "Получена", action: "Принять"},
                { id: 4, bookName: "Герой нашего времени", client: "Галиева Камилла", status: "Получена", action: "Принять"}
            ],
            //Выданные книги
            IssuedBooksByUser:[
            ],
            
            //Забронированное пользователем
            BookedByUser: [

            ],
        }
        
    }
}
</script>

<style>

</style>