import { TodoOrmImp } from "data/orm/Todo.orm.imp";

export interface CompleteTodo {
  execute(id: number): Promise<string>
}

export class CompleteTodoUseCase implements CompleteTodo {
  

    constructor(
        private todoOrmImp: TodoOrmImp,
    ) {}

  async execute(id: number): Promise<string> {
    const todo = await this.todoOrmImp.completeTodo(id);
    return todo ? 'Todo completed' : 'Todo not found or completed';
  }
}
