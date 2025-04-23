import { AuthType, SyncConnector } from "@runlightyear/lightyear";
import { TaskModel } from "./TaskModel";

export class TodoApp extends SyncConnector {
  static authType: AuthType = "APIKEY";

  getBaseUrl(): string {
    return "https://todo-api.lightyear.dev/api";
  }

  getDefaultHeaders(): Record<string, string> {
    const { apiKey } = this.getAuthData();

    if (!apiKey) {
      throw new Error("API key is not set");
    }

    return {
      ...super.getDefaultHeaders(),
      "x-api-key": apiKey,
    };
  }

  getModels() {
    return {
      task: new TaskModel({
        todoApp: this,
        connector: this,
        collectionName: this.collectionName,
        modelName: "task",
      }),
    };
  }
}
