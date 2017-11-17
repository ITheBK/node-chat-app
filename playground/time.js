  var moment  = require('moment');

  // Jan 1st 1970 00:00:00 am
  // -1000 - 1Second less than

  // var date = new Date();
  // console.log(date.getMonth());

  // var date = moment();
  // date.add(1, 'year').subtract(18,'year');
  // console.log(date.format('MMM Do, YYYY '));

  var someTimestamp = moment().valueOf();
  console.log(someTimestamp);
  //10:35 am // 6:01 am
  var dateMoment = moment();
  console.log(dateMoment.format('h:mm a'));
