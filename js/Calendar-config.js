/**
 *
 * @autor Mykhailo Ivankiv [neformal.lviv@gmail.com]
 * Date: 21.07 /2011
 * Time: 4:50 PM
 * Brief description of functionality.
 */
var calendarConfig = {
  weekArray   : 'Нд,Пн,Вт,Ср,Чт,Пт,Сб'.split(','),
  monthArray  : "Січень, Лютий, Березень, Квітень, Травень, Червень, Липень, Серпень, Вересень ,Жовтень, Листопад, Грудень ".split(','),

  year        : new Date().getFullYear(),
  month       : new Date().getMonth(),

  container   : document.getElementById('wrapper'),
  startDay    : 1, // Start day of week  (0 - Sunday);

  isExpanded  : false

}