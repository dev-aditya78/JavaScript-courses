/**
 *
 * @autor Mykhailo Ivankiv [neformal.lviv@gmail.com]
 * Date: 21.07 /2011
 * Time: 2:07 PM
 * Brief description of functionality.
 */
var Calendar = function(initObj){
  var this_ = this;

  this.setYear = function (newYear){
    this_.year = newYear;
    this_.container.innerHTML = "";
    drawCalendar ();
  }

  function  drawCalendar () {
    drawCalendarHeader_ ();
    for (var i=0; i< 12 ;i++) {drawMonth_ (i);}
  }

  function drawMonth_ (numberOfMonth){
    var monthContainer = document.createElement('div');
    monthContainer.appendChild(generateMonthHeader_(numberOfMonth));
    monthContainer.appendChild(generateWeekHeader_ ());
    monthContainer.appendChild(generateMonth_(numberOfMonth));
    monthContainer.className = 'month';
    this_.container.appendChild(monthContainer);
  };

  function generateMonthHeader_ (numberOfMonth){
    var monthHeader = document.createElement('H3');
        monthHeader.innerHTML = this_.monthArray[numberOfMonth];
    return monthHeader;
  }

  function generateWeekHeader_ (){
    var weekHeader = document.createElement('ul');
        weekHeader.className = 'monthHeader';
        weekHeader.innerHTML = '<li>'+this_.weekArray.join('</li><li>')+'</li>';
    return weekHeader;
  }

  function generateMonth_ (numberOfMonth){
    var date = new Date(this_.year);
    var dayString = "";

    date.setFullYear(this_.year,numberOfMonth,1);

    var beforeDays = (date.getDay()||7)-1;  // .getDay count days from 0, .setFullYear from 1;

    for (var i = 0; i< (7*6); i++){        // 7 days * 6 weeks;
      date.setFullYear(this_.year, numberOfMonth, i-beforeDays + this_.startDay);

      if (date.getMonth() == numberOfMonth)
           {dayString += '<li>'+ date.getDate()+'</li>';}
      else
           { dayString += '<li class="out">'+ date.getDate()+'</li>';}
    }
    var month = document.createElement('ul');
    month.innerHTML = dayString;
    return month;
  };

  function drawCalendarHeader_ (){
    var header = document.createElement('H1');
        header.innerHTML = this_.year;
    this_.container.appendChild(header);
  }

  //Normalize start day
  for (var i=0; i < this_.startDay; i++) {
    this.weekArray.push(this.weekArray[0]);
    this.weekArray.shift();
  }

  drawCalendar();
}
Calendar.prototype = calendarConfig;