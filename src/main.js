import {createSiteMenuTemplate} from "./view/site-menu";
import {createFilterTemplate} from "./view/filter";
import {createBoardTemplate} from "./view/board";
import {createSortingTemplate} from "./view/sorting";
import {createTaskContainerTemplate} from "./view/task-container";
import {createTaskTemplate} from "./view/task";
import {createTaskEditTemplate} from "./view/task-edit";
import {createLoadMoreButtonTemplate} from "./view/load-more-button";

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const TASK_COUNT = 3;

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

// Верхнее меню
render(siteHeaderElement, createSiteMenuTemplate(), `beforeend`);

// Фильтры
render(siteMainElement, createFilterTemplate(), `beforeend`);

// Главный контейнер - доска
render(siteMainElement, createBoardTemplate(), `beforeend`);

const boardElement = siteMainElement.querySelector(`.board`);

// Сортировка
render(boardElement, createSortingTemplate(), `beforeend`);

// Контейнер для задач
render(boardElement, createTaskContainerTemplate(), `beforeend`);

const taskContainer = boardElement.querySelector(`.board__tasks`);

render(taskContainer, createTaskEditTemplate(), `beforeend`);

for (let i = 0; i < TASK_COUNT; i++) {
  render(taskContainer, createTaskTemplate(), `beforeend`);
}

render(boardElement, createLoadMoreButtonTemplate(), `beforeend`);
