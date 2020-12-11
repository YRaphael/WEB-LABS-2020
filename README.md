# WEB-LABS-2020

## Лабораторная работа 1
<p align="justify">Сверстать сайт с отображением информации о погоде в соответствии с макетами. Отображение сайта должно гибко адаптироваться при изменении ширины – для примера даны макеты для desktop и mobile. Иконки погоды на макетах сделаны заглушками, замените их на свои. Цветовая схема, шрифты могут отличаться от макета, но общая сетка страницы должна быть соблюдена. В верстке должна соблюдаться семантика.</p> 

<p align="justify">Разработка должна вестись итеративно и публиковаться на github. К моменту проверки и сдачи работы репозиторий должен быть публичным. Также должна быть настроена публикация работы на github pages.</p>

## Лабораторная работа 2
<p align="justify">Доработать лабораторную работу 1 для работы с внешним API, позволяющим получить данные о погоде в городе.</p> 

<p align="justify">При первой загрузке страницы происходит запрос пользователя на получение данных о геолокации с использованием HTML5 Geolocation API. Если пользователь соглашается предоставить данные о геолокации – получаем из внешнего API данные о погоде (API можно выбрать самостоятельно). Если нет – запрашиваем информацию для города по умолчанию (город по умолчанию можно выбрать самостоятельно). Эти сведения отображаются в верхней части страницы – "Погода здесь". Иконка погоды должна соответствовать тем данным о погоде, что были получены из API.</p>

<p align="justify">У пользователя есть возможность добавления и удаления городов в избранное. Информация о погоде отображается для всех городов из избранного в соответствии с макетом и реализацией первой лабораторной работы (секция "Избранное"). Список избранных городов сохраняется в LocalStorage. Сами данные о погоде в LocalStorage сохранять не нужно – запрос актуальных сведений происходит при каждой загрузке страницы.</p>

<p align="justify">Пока происходит загрузка данных по конкретному городу/локации – показываем loader и/или сообщение об ожидании загрузки данных. Пример ниже, в вашей реализации может отличаться.</p>
