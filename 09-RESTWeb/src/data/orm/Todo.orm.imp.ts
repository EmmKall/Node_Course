import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import { envs } from "../../config/envs";
import { todosTable } from "../postgrsql/schemas/Todo.db";
import { TodoDatasource } from "domain/datasource/TodoDatasource";

const db = drizzle(envs.POSTGRES_URL);

export interface todoORMI {
    id?: number;
    name: string;
    description?: string;
    completeAt?: Date | null;
    updatedAt?: Date;
}

export class TodoOrmImp implements TodoDatasource {
  constructor() {}

  public async getTodos(): Promise<todoORMI[]> {
    const todos = await db.select().from(todosTable);
    return todos.map((row) => TodoOrmImp.toTodoORMI(row));
  }

  public async getTodoById(id: number): Promise<todoORMI | null> {
    const todo = await db
      .select()
      .from(todosTable)
      .where(eq(todosTable.id, id));
    return todo.length > 0 ? TodoOrmImp.toTodoORMI(todo[0]) : null;
  }

  public createTodo = async ( todo: todoORMI ): Promise<{ data?: todoORMI; error: boolean; message?: string }> => {
    try {
      const newTodo = await db.insert(todosTable).values(todo).returning();
      const resp = { data: TodoOrmImp.toTodoORMI(newTodo[0]), error: false };
      return resp;
    } catch (err) {
      const resp = { error: true, message: `${err}` };
      return resp;
    }
  };

  public async updateTodo({ id, todo }: { id: number; todo: todoORMI }): Promise<todoORMI | null> {
    const updatedTodo = await db.update(todosTable)
                                .set(todo)
                                .where(eq(todosTable.id, id))
                                .returning();
    return updatedTodo.length > 0 ? TodoOrmImp.toTodoORMI(updatedTodo[0]) : null;
  }

  public async completeTodo(id:number): Promise<string> {
    const updatedTodo = await db.update(todosTable)
                                .set({ completeAt: new Date() })
                                .where(eq(todosTable.id, id))
                                .returning();
    return updatedTodo.length > 0 ? 'Todo completed' : 'Todo not found';
  }

  public destroyTodo = async (id: number): Promise<string> => {
    const deletedCount = await db.delete(todosTable).where(eq(todosTable.id, id)).returning();
    return deletedCount.length > 0 ? 'Todo deleted' : 'Todo not found';
  }

  private static toTodoORMI(row: any): todoORMI {
    const data: todoORMI = {
      id: row.id,
      name: row.name,
      description: row.description,
      completeAt: row.completeAt,
      updatedAt: row.updatedAt,
    };
    return data;
  }
}
