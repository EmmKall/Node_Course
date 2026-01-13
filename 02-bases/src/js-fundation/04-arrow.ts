console.log('========================');
console.log('Callbacks');

const users = [
    {
        id: 1,
        name: 'John'
    },
    {
        id: 2,
        name: 'Jane'
    },
    {
        id: 3,
        name: 'Jack'
    }
];

const getuserById = (id, callback) => {
    const user = users.find( user => user.id === id);    
    (user) ? callback(null, user) : callback(`User not found with id: ${id}`);    
}


module.exports = {
    getuserById,
};

