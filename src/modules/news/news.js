/* sass */
require('../../sass/main');
require('../../sass/modules/news/news');

import _ from 'lodash';

/* externals jquery */
import $ from 'jquery';

/* jquery */
// npm install --save-dev jquery
// import $ from 'jquery';

function component () {
    /* 需要引入 lodash，下一行才能正常工作 */
    var ele = '<div class="hl-container">\
                  <i id="hl-logo"></i>\
                  <i id="hl-logo-1"></i>\
                  <h1 class="title">' + _.join(['Hello','news', $(window).height()], ' ') + '</h1>\
               </div>';

    return $(ele);
}

$('body').append(component());
