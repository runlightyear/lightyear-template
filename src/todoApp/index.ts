import {
  defineCustomApp,
  defineSyncIntegration,
} from "@runlightyear/lightyear";
import { TodoApp } from "./TodoApp";
import { taskManagement } from "../taskManagement";

const customApp = defineCustomApp({
  name: "todoApp",
  title: "Todo App",
  connector: TodoApp,
});

defineSyncIntegration({
  name: "todoApp",
  title: "Todo App",
  customApp,
  collection: taskManagement,
  connector: (props) =>
    new TodoApp({
      ...props,
      collectionName: "taskManagement",
    }),
  frequency: {
    incremental: 1,
    full: 15,
  },
});
