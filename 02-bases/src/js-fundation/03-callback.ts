console.log('========================');
console.log('Callbacks');

 export interface UserI {
    id: number;
    name: string;
};

const users: UserI[] = [
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

function getuserById(id: number, callback: (err?: string, user?: UserI) => void ) {
    console.log({id});
    const user = users.find( function(user) {
        return user.id === id;
    });
    
    if(!user) {
        return callback(`User not found with id: ${id}`);    
    }
    callback(undefined, user);
}


export {
    getuserById,
};

