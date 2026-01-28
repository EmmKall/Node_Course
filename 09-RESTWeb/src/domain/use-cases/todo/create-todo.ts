// import { drizzle } from "drizzle-orm/singlestore";
// import { envs } from "config/envs";
// import { todosTable } from "../../../data/postgrsql/schemas/Todo.db";
// import { todoORMI, TodoOrmImp } from "data/orm/Todo.orm.imp";

// export interface CreateTodo {
//   execute(id: number): Promise<any>;
// }

// const db = drizzle(envs.POSTGRES_URL);

// export class CreateTodoUseCase implements CreateTodo {

//   constructor(
//     private todoOrmImp: TodoOrmImp,
//   ) {}

//   async execute(todo: todoORMI): Promise<any> {
//     const {data, error}: todoORMI = await this.todoOrmImp.createTodo(todo);
//     if(error !== ''){
//         return { error: true, message: error };
//     }
//     return data;
//   }
// }
