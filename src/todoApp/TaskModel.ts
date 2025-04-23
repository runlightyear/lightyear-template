import {
  ModelConnector,
  ModelConnectorProps,
  ListProps,
  CreateBatchProps,
  UpdateBatchProps,
  DeleteBatchProps,
} from "@runlightyear/lightyear";
import { TodoApp } from "./TodoApp";

export interface TaskModelProps extends ModelConnectorProps {
  todoApp: TodoApp;
}

export class TaskModel extends ModelConnector<any, any, any, any> {
  todoApp: TodoApp;

  constructor(props: TaskModelProps) {
    super(props);
    this.todoApp = props.todoApp;
  }

  getNoun(): string {
    return "task";
  }

  validateListResponse(response: any): any {
    return response;
  }

  mapExternalToObject(data: any): any {
    return {
      id: data.id,
      updatedAt: data.updatedAt,
      data: {
        title: data.title,
        description: data.description,
        status:
          data.status === "PENDING"
            ? "pending"
            : data.status === "IN_PROGRESS"
            ? "inProgress"
            : "completed",
        dueDate: data.dueDate,
        completedAt: data.completedAt,
      },
    };
  }

  mapObjectDataToExternalData(data: any): any {
    return {
      title: data.title,
      description: data.description,
      status: data.status,
      due_date: data.dueDate,
      completed_at: data.completedAt,
    };
  }

  async list(props: ListProps): Promise<any> {
    console.warn("in list");
    const response = await this.todoApp.request({
      method: "GET",
      url: "/todos",
      params: {
        limit: 100,
        orderBy: "updatedAt",
        offset: props.cursor ?? undefined,
      },
    });

    const validatedResponse = this.validateListResponse(response.data);

    return {
      objects: validatedResponse.todos.map((todo: any) =>
        this.mapExternalToObject(todo)
      ),
      cursor: validatedResponse.pagination
        ? String(
            validatedResponse.pagination.offset +
              validatedResponse.pagination.limit
          )
        : undefined,
    };
  }

  async createBatch(props: CreateBatchProps<any>): Promise<any> {
    await this.todoApp.requestBatch(
      props.changes.map((change: any) => ({
        method: "POST",
        url: "/todos",
        data: this.mapObjectDataToExternalData(change.object),
      }))
    );
  }

  async updateBatch(props: UpdateBatchProps<any>): Promise<any> {
    await this.todoApp.requestBatch(
      props.changes.map((change: any) => ({
        method: "PUT",
        url: `/todos/${change.externalId}`,
        data: this.mapObjectDataToExternalData(change.object),
      }))
    );
  }

  async deleteBatch(props: DeleteBatchProps): Promise<any> {
    await this.todoApp.requestBatch(
      props.changes.map((change: any) => ({
        method: "DELETE",
        url: `/todos/${change.externalId}`,
      }))
    );
  }
}
