import { todoORMI } from "data/orm/Todo.orm.imp";

export class CreateTodoDto {
  constructor(private readonly todoORM: todoORMI) {}

  public static create(props: { [key: string]: any }): [string, CreateTodoDto] {
    const { name, description, isCompleted } = props;

    if (!name) return ["Name is required", {} as CreateTodoDto];
    if (!description) return ["Description is required", {} as CreateTodoDto];

    const data: todoORMI = {
      name,
      description,
      ...(isCompleted && { completeAt: new Date() }),
    };

    return ["", new CreateTodoDto(data)];
  }

  public toDB() {
    return this.todoORM;
  }
}