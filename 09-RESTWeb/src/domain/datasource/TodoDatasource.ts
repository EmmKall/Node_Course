import { todoORMI } from "data/orm/Todo.orm.imp";

export interface TodoDatasource {
    getTodos(): Promise<todoORMI[]>;
    getTodoById(id: number): Promise<todoORMI | null>;
    createTodo(todo: todoORMI): Promise<{ data?: todoORMI; error: boolean; message?: string }>;
    updateTodo(params: { id: number; todo: todoORMI }): Promise<todoORMI | null>;
    completeTodo(id: number): Promise<string>;
    destroyTodo(id: number): Promise<string>;
}
