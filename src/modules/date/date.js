/* sass */
require('../../sass/main');
require('../../sass/modules/date/date');

import _ from 'lodash';

/* externals jquery */
import $ from 'jquery';

/* jquery */
// npm install --save-dev jquery
// import $ from 'jquery';

function component () {
    /* 需要引入 lodash，下一行才能正常工作 */
    var ele = '<div class="hl-container">\
                  <span class="glyphicon glyphicon-heart hl-cursor-pointer" id="test-date" aria-hidden="true"></span>\
               </div>';

    return $(ele);
}

$('body').append(component());

$(function() {
    var startDate = '2017-02-01 00:00',
        endDate = moment().subtract('days', 0).format("YYYY-MM-DD 23:59");

    $('#test-date').daterangepicker({
        parentEl: $(".bdb-main .bdb-container"), //设置父元素.
        startDate: startDate,
        endDate: endDate,
        minDate: startDate,
        maxDate: endDate,
        format: 'YYYY-MM-DD HH:mm',
        opens: 'right',
        timePicker: true, // 是否开启时间选择.
        timePicker12Hour: false, // 是否开始时间选择-12小时制.
        timePickerIncrement: 1 // 是否开始时间选择-分钟步长.
    }, function(start, end, label) {
        var startTime = start.format('YYYY-MM-DD HH:mm'),
            endTime = end.format('YYYY-MM-DD HH:mm');

        console.log(startTime, endTime);
    });
});
