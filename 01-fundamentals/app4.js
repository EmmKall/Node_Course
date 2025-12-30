console.log('Init program');

setTimeout( () => {
    console.log('First timeout');
}, 3000);

setTimeout( () =>{
    console.log('Second timeout');
},1);

setTimeout( ()=> {
    console.log('Third timeout');
}, 0);

console.log('program ended');
