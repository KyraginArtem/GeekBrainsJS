"use strict";

let ticTakToe = {
    gameTableElement : document.getElementById('game'),
    status: 'playing',
    mapValues: [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ],
    phase: 'X',

    //Инициализация игры
    init() {
        //выводим все ячейки
        this.renderMap();
        //Инициализируем обработчики событй
        this.initEventHandleres();

    },

    //Отрисовали ячейки в html.
    renderMap() {
        for (let row = 0; row < 3; row++) {
            const tr = document.createElement('tr');
            this.gameTableElement.appendChild(tr);
            for(let col = 0; col < 3; col++) {
                let td = document.createElement('td');
                td.dataset.row = row.toString();
                td.dataset.col = col.toString();
                tr.appendChild(td);
            }
        }
    },

    //Инициализация обработчиков событий.
    initEventHandleres() {
        this.gameTableElement.addEventListener('click', event => 
        this.cellClickhandler(event));
    },

    //Обработчик события клика.
    cellClickhandler(event) {
        //если клик не коректный, уходим из функции
        if (!this.isCorrectClick(event)) {
            return;
        }

        //Заполняем ячкейку.
        this.fillCell(event);
        if (this.hasWon()) {
            //Ставим статус в "Остановлено".
            this.setStatusStopped();
            //Сообщаем о победе пользователя.
            this.sayWhoPharase();
        }

        //меняем фигуру игрока (крестик или нолик)
        this.togglePhase();

    },

    //Проверка были ли коректен клик, описанный в event
    isCorrectClick(event) {
        return this.isStatusPlaying() && this.isClickByCell(event)
        && this.isCellEmpty(event);
    },

    //Проверка что мы играем и что игра не закончена
    isStatusPlaying() {
        return this.status === 'playing';
    },

    //Проверка что клик был по ячейке
    isClickByCell(event) {
        return event.target.tagName === 'TD';
    },

    //Проверка что в ячейке нет значений
    isCellEmpty(event) {
        let row = +event.target.dataset.row;
        let col = +event.target.dataset.col;

        return this.mapValues[row][col] === '';
    },

    //Этот метод заполняет ячейку по которой кликнул пользователь в событии
    fillCell(event) {
        //получаем координаты
        let row = +event.target.dataset.row;
        let col = +event.target.dataset.col;

        //Заполняем ячейку и ставим значение в массиве, в свойстве mapValues.
        this.mapValues[row][col] = this.phase;
        event.target.textContent = this.phase;
    },

    //Проверка есть ли выигрышная ситуация на карте.
    hasWon() {

        return this.isLineWon({ x: 0, y: 0}, { x: 1, y: 0}, { x: 2, y: 0}) ||
            this.isLineWon({ x: 0, y: 1}, { x: 1, y: 1}, { x: 2, y: 1}) ||
            this.isLineWon({ x: 0, y: 2}, { x: 1, y: 2}, { x: 2, y: 2}) ||

            this.isLineWon({ x: 0, y: 0}, { x: 0, y: 1}, { x: 0, y: 2}) ||
            this.isLineWon({ x: 1, y: 0}, { x: 1, y: 1}, { x: 1, y: 2}) ||
            this.isLineWon({ x: 2, y: 0}, { x: 2, y: 1}, { x: 2, y: 2}) ||

            this.isLineWon({ x: 0, y: 0}, { x: 1, y: 1}, { x: 2, y: 2}) ||
            this.isLineWon({ x: 0, y: 2}, { x: 1, y: 1}, { x: 2, y: 0});
    },

    //Проверка есть ли выигрышная ситуация на линии
    isLineWon(a, b, c) {
        let value = this.mapValues[a.y][a.x] + this.mapValues[b.y][b.x] +
            this.mapValues[c.y][c.x];
        return value === 'XXX' || value === '000'
    },

    //Ставит статус игры в "остановленна"
    setStatusStopped() {
        this.status = 'stopped';
    },

    //Сообщает о победе
    sayWhoPharase() {
        let figure = this.phase === 'X' ? 'Крестик' : 'Нолик';
        alert(`${figure} выиграл!`);
    },

    //Меняем фигуру игрока
    togglePhase() {
        this.phase = this.phase === 'X' ? '0' : 'X';
    },
};

//Запускаем метод
ticTakToe.init()