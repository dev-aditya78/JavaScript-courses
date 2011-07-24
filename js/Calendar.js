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

  this.setMonth = function (newMonth){
    if (newMonth < 0) {
      this_.month = 12 + newMonth;
      setPrevYear();
      return;
    }
    if (newMonth > 11) {
      this_.month = 12 - newMonth;
      setNextYear();
      return;
    }
    this_.container.getElementsByClassName('month')[this_.month].style.display="";
    this_.month = newMonth;
    this_.container.getElementsByClassName('month')[this_.month].style.display="block";
  }

  this.switchSize = function(){
    if (this_.isExpanded){
      this_.isExpanded = false;
      this_.container.className = "compact-calendar";
    } else {
      this_.isExpanded = true;
      this_.container.className = "calendar";
    }
  }

  function  drawCalendar () {
    drawCalendarHeader_ ();
    for (var i=0; i< 12 ;i++) {drawMonth_ (i);}

    addSwitchSizeControl();
    addSwitchMonthControl();
    addSwitchYearControl();
  }

  function addSwitchSizeControl(){
    var switchSizeControl = document.createElement('div');
        switchSizeControl.className = "control switch-size";
        switchSizeControl.innerHTML = "switch";
        switchSizeControl.addEventListener('click',this_.switchSize,false);
    this_.container.appendChild(switchSizeControl);
  }

  function addSwitchMonthControl(){
    var prevMonth = document.createElement("span");
        prevMonth.className = "control switch-prev-month";
        prevMonth.innerHTML = "&lt;";
        prevMonth.addEventListener('click',setPrevMonth,false);

    var nextMonth = document.createElement("span");
        nextMonth.className = "control switch-next-month";
        nextMonth.innerHTML = "&gt;";
        nextMonth.addEventListener('click',setNextMonth,false);

    this_.container.appendChild(nextMonth);
    this_.container.appendChild(prevMonth);
  }

  function addSwitchYearControl (){
    var header = this_.container.getElementsByTagName('H1')[0];
    var prevYear = document.createElement("span");
        prevYear.className = "control";
        prevYear.innerHTML = "&lt;";
        prevYear.addEventListener('click',setPrevYear,false);

    var nextYear = document.createElement("span");
        nextYear.className = "control";
        nextYear.innerHTML = "&gt;";
        nextYear.addEventListener('click',setNextYear,false);

    header.insertBefore ( prevYear, header.firstChild );
    header.appendChild  ( nextYear, header.firstChild );
  }

  function drawMonth_ (numberOfMonth){
    var monthContainer = document.createElement('div');
    if (numberOfMonth == this_.month){
      monthContainer.style.display = "block";
    }

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

  function setPrevMonth() { this_.setMonth(this_.month-1); }
  function setNextMonth() { this_.setMonth(this_.month+1); }

  function setNextYear () { this_.setYear(this_.year+1); }
  function setPrevYear () { this_.setYear(this_.year-1); }

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

  //Set class
  if (this_.isExpanded) {this_.container.className = "calendar"}
  else {this_.container.className = "compact-calendar";}
}
Calendar.prototype = calendarConfig;