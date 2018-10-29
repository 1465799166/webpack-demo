import _ from 'lodash'
// if (process.env.NODE_ENV !== 'production') {
//     console.log('Looks like we are in development mode!');
// }

function component() {
    var element = document.createElement('div');
    var button = document.createElement('button');
    var br = document.createElement('br');
    button.innerHTML = 'Click me and look at the console!';
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.appendChild(br);
    element.appendChild(button);
    // 懒加载模块 当点击button才加载print.js
    button.onclick = e => import(/* webpackChunkName: "print" */ './print').then(module => {
        var print = module.default;
        print();
    });
    return element;
}
  
document.body.appendChild(component());

// if (module.hot) {
//     module.hot.accept('./print.js', function() {
//         console.log('Accepting the updated printMe module!');
//         printMe();
//     })
// }