import {createSiteMenuTemplate} from "./view/site-menu";
import {createFilterTemplate} from "./view/filter";
import {createBoardTemplate} from "./view/board";
import {createSortingTemplate} from "./view/sorting";
import {createTaskContainerTemplate} from "./view/task-container";
import {createTaskTemplate} from "./view/task";
import {createTaskEditTemplate} from "./view/task-edit";
import {createLoadMoreButtonTemplate} from "./view/load-more-button";
import {generateTask} from "./mock/task.js";
import {generateFilter} from "./mock/filter.js";

const TASK_COUNT = 22;
const TASK_COUNT_PER_STEP = 8;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

// Верхнее меню
render(siteHeaderElement, createSiteMenuTemplate(), `beforeend`);

// Фильтры
render(siteMainElement, createFilterTemplate(filters), `beforeend`);

// Главный контейнер - доска
render(siteMainElement, createBoardTemplate(), `beforeend`);

const boardElement = siteMainElement.querySelector(`.board`);

// Сортировка
render(boardElement, createSortingTemplate(), `beforeend`);

// Контейнер для задач
render(boardElement, createTaskContainerTemplate(), `beforeend`);

const taskContainer = boardElement.querySelector(`.board__tasks`);

render(taskContainer, createTaskEditTemplate(tasks[0]), `beforeend`);

for (let i = 1; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {
  render(taskContainer, createTaskTemplate(tasks[i]), `beforeend`);
}

if (tasks.length > TASK_COUNT_PER_STEP) {
  let renderedTaskCount = TASK_COUNT_PER_STEP;

  render(boardElement, createLoadMoreButtonTemplate(), `beforeend`);

  const loadMoreButton = boardElement.querySelector(`.load-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    tasks
      .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
      .forEach((task) => render(taskContainer, createTaskTemplate(task), `beforeend`));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      loadMoreButton.remove();
    }
  });
}
