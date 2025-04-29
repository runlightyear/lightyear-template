/**
 * This is the model for the Task model.
 *
 * A model connector is a TypeScript class that synchronizes data between an app and a specific model within
 * a collection. Its purpose is to handle the reading and writing of data for a particular data model
 * within a sync integration.
 */

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
      status:
        data.status === "pending"
          ? "PENDING"
          : data.status === "inProgress"
            ? "IN_PROGRESS"
            : "COMPLETED",
      dueDate: data.dueDate,
      completedAt: data.completedAt,
    };
  }

  async list(props: ListProps): Promise<any> {
    const response = await this.todoApp.request({
      method: "GET",
      url: "/todos",
      params: {
        limit: 100,
        orderBy: "updatedAt",
        updatedAt_gt: props.lastExternalUpdatedAt ?? undefined,
        offset: props.cursor ?? undefined,
      },
    });

    const validatedResponse = this.validateListResponse(response.data);

    return {
      objects: validatedResponse.todos.map((todo: any) =>
        this.mapExternalToObject(todo)
      ),
      cursor: validatedResponse.pagination.hasMore
        ? validatedResponse.pagination.nextOffset
        : undefined,
    };
  }

  async createBatch(props: CreateBatchProps<any>): Promise<any> {
    await this.todoApp.requestBatch(
      props.changes.map((change) => ({
        method: "POST",
        url: "/todos",
        data: this.mapObjectDataToExternalData(change.data),
        confirm: {
          changeIds: [change.changeId],
          idPath: "$.todo.id",
          updatedAtPath: "$.todo.updatedAt",
        },
      }))
    );
  }

  async updateBatch(props: UpdateBatchProps<any>): Promise<any> {
    await this.todoApp.requestBatch(
      props.changes.map((change) => ({
        method: "PATCH",
        url: `/todos/${change.externalId}`,
        data: this.mapObjectDataToExternalData(change.data),
        confirm: {
          changeIds: [change.changeId],
          idPath: "$.todo.id",
          updatedAtPath: "$.todo.updatedAt",
        },
      }))
    );
  }

  async deleteBatch(props: DeleteBatchProps): Promise<any> {
    await this.todoApp.requestBatch(
      props.changes.map((change) => ({
        method: "DELETE",
        url: `/todos/${change.externalId}`,
        confirm: {
          changeIds: [change.changeId],
        },
      }))
    );
  }
}
