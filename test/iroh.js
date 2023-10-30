'use strict';

const Iroh = require('iroh');


// test taken from test/files/2.js
// @ts-ignore
const stage = new Iroh.Stage(`
function foo(name, age) {
  return 'The person known as "' + name + '" is ' + age + ' years old';
}

foo('Sophia', 20);
`);

// code adapted from example given on Iroh.js website
// function call
stage.addListener(Iroh.CALL)
    .on('before', (e) => {
        const external = e.external ? '#external' : '';
        // @ts-ignore
        console.log(' '.repeat(e.indent) + 'call', e.name, external, '(', e.arguments, ')');
        // console.log(e.getSource());
    })
    .on('after', (e) => {
        const external = e.external ? '#external' : '';
        // @ts-ignore
        console.log(' '.repeat(e.indent) + 'call', e.name, 'end', external, '->', [e.return]);
        // console.log(e.getSource());
    });

// function
stage.addListener(Iroh.FUNCTION)
    .on('enter', (e) => {
        const sloppy = e.sloppy ? '#sloppy' : '';
        if (e.sloppy) {
            console.log(' '.repeat(e.indent) + 'call', e.name, sloppy, '(', e.arguments, ')');
            // console.log(e.getSource());
        }
    })
    .on('leave', (e) => {
        const sloppy = e.sloppy ? '#sloppy' : '';
        if (e.sloppy) {
            // @ts-expect-error
            console.log(' '.repeat(e.indent) + 'call', e.name, 'end', sloppy, '->', [void 0]);
            // console.log(e.getSource());
        }
    })
    .on('return', (e) => {
        const sloppy = e.sloppy ? '#sloppy' : '';
        if (e.sloppy) {
            console.log(' '.repeat(e.indent) + 'call', e.name, 'end', sloppy, '->', [e.return]);
            // console.log(e.getSource());
        }
    });

// program
stage.addListener(Iroh.PROGRAM)
    .on('enter', (e) => {
        console.log(' '.repeat(e.indent) + 'Program');
    })
    .on('leave', (e) => {
        console.log(' '.repeat(e.indent) + 'Program end', '->', e.return);
    });

// @ts-ignore
eval(stage.script);
