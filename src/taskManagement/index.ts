import { defineCollection, FromSchema } from "@runlightyear/lightyear";

export const taskManagement = defineCollection({
  name: "taskManagement",
  title: "Task Management",
  models: [
    {
      name: "task",
      title: "Task",
      schema: {
        type: "object",
        properties: {
          title: {
            type: "string",
          },
          description: {
            type: ["string", "null"],
          },
          status: {
            type: "string",
            enum: ["pending", "inProgress", "completed"],
          },
          dueDate: {
            type: ["string", "null"],
          },
          completedAt: {
            type: ["string", "null"],
          },
        },
        required: ["title", "status"],
      },
      matchOn: "title",
    },
  ],
});
