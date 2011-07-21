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
    drawCalendarHeader ();
    for (var i=0; i< 12 ;i++) {drawMonth (i);}
  }

  function drawMonth (numberOfMonth){
    var monthContainer = document.createElement('div');
    monthContainer.appendChild(generateMonthHeader(numberOfMonth));
    monthContainer.appendChild(generateWeekHeader());
    monthContainer.appendChild(generateMonth(numberOfMonth));
    monthContainer.className = 'month';
    this_.container.appendChild(monthContainer);
  };

  function generateMonthHeader (numberOfMonth){
    var monthHeader = document.createElement('H3');
    console.log(numberOfMonth);
    monthHeader.innerHTML = this_.monthArray[numberOfMonth];
    return monthHeader;
  }

  function generateWeekHeader(){
    var weekHeader = document.createElement('ul');
    weekHeader.className = 'monthHeader';
    weekHeader.innerHTML = '<li>'+this_.weekArray.join('</li><li>')+'</li>';
    return weekHeader;
  }

  function generateMonth (numberOfMonth){
    var date = new Date(this_.year);
    var dayString = "";

    date.setFullYear(this_.year,numberOfMonth);

    var beforeDays = 7 - date.getDay();
    for (var i =  0; i< (7*6); i++){                               // 7 days * 6 weeks;
      if (beforeDays - i >= 0){
         date.setFullYear(this_.year,numberOfMonth,-(beforeDays - i));
         dayString += '<li class="out">'+ date.getDate()+'</li>';
      }
      else {
        date.setFullYear(this_.year,numberOfMonth,i-beforeDays);
        if (date.getMonth() == numberOfMonth){
           dayString += '<li>'+ date.getDate()+'</li>';
        }else{
          dayString += '<li class="out">'+ date.getDate()+'</li>';
        }
      }
    }
    var month = document.createElement('ul');
    month.innerHTML = dayString;
    return month;
  };

  function drawCalendarHeader (){
    var header = document.createElement('H1');
        header.innerHTML = this_.year;
    this_.container.appendChild(header);
  }

  drawCalendar();
}
Calendar.prototype = calendarConfig;