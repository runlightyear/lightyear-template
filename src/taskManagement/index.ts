/**
 * This is where we defined the task management collection.
 *
 * A collection serves as a canonical representation of data that needs to be synchronized across multiple
 * applications.
 *
 * At its core, a collection defines one or more models—essentially, the structures that represent
 * the various types of information within the collection. These models can include schemas that enforce data
 * integrity every time new information is written, ensuring consistency and accuracy throughout the system.
 *
 * Additionally, collections support the use of matching rules. These rules are instrumental in merging data
 * from different systems when appropriate. For example, when a contact appears in several systems, an email
 * address can be used as a matching criterion to unify and deduplicate records.
 */

import { defineCollection } from "@runlightyear/lightyear";

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
