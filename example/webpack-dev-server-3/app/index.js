import _ from 'lodash';

/* externals jquery */
import $ from 'jquery';

/* jquery */
// npm install --save-dev jquery
// import $ from 'jquery';

function component () {
    var element = document.createElement('div');

    /* 需要引入 lodash，下一行才能正常工作 */
    element.innerHTML = _.join(['Hello','webpack', $(window).height()], ' ');

    $('body').css({'background-color': '#fff', 'color': 'red'});

    return element;
}

document.body.appendChild(component());
