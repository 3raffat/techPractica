import type { KanbanBoarde } from "../../interfaces";

export const sampleUsers = [
  { id: "1", name: "Alice", avatar: "/avatars/1.png" },
  { id: "2", name: "Bob", avatar: "/avatars/2.png" },
  { id: "3", name: "Carol", avatar: "/avatars/3.png" },
  { id: "4", name: "Dave", avatar: "/avatars/4.png" },
  { id: "5", name: "Eve", avatar: "/avatars/5.png" },
];

export const initialData: KanbanBoarde = {
  columns: {
    new: {
      id: "new",
      title: "NEW",
      tasks: [
        {
          id: "task-1",
          title: "Implement User Authentication Flow",
          content:
            "Set up JWT authentication with refresh tokens, implement login, register, and password reset functionality.",
          priority: "high",
          createdAt: "20 Mar",
          tags: ["Backend", "Security"],
          likes: 15,
          comments: 8,
          users: [
            { id: "1", name: "Sarah Chen", avatar: "/avatars/1.png" },
            { id: "4", name: "James Wilson", avatar: "/avatars/4.png" },
          ],
        },
        {
          id: "task-2",
          title: "Design System Implementation",
          content:
            "Create and implement a consistent design system with reusable components, typography, and color schemes.",
          priority: "medium",
          createdAt: "21 Mar",
          tags: ["Frontend", "UI/UX"],
          likes: 12,
          comments: 5,
          users: [
            { id: "3", name: "Priya Patel", avatar: "/avatars/3.png" },
            { id: "5", name: "Emma Thompson", avatar: "/avatars/5.png" },
          ],
        },
        {
          id: "task-3",
          title: "Database Schema Optimization",
          content:
            "Review and optimize database schema, add necessary indexes, and implement data validation rules.",
          priority: "high",
          createdAt: "22 Mar",
          tags: ["Backend", "Database"],
          likes: 8,
          comments: 3,
          users: [
            { id: "2", name: "Michael Rodriguez", avatar: "/avatars/2.png" },
          ],
        },
      ],
    },
    todo: {
      id: "todo",
      title: "TODO",
      tasks: [
        {
          id: "task-4",
          title: "API Documentation",
          content:
            "Create comprehensive API documentation using Swagger/OpenAPI, including request/response examples.",
          priority: "medium",
          createdAt: "23 Mar",
          tags: ["Documentation", "API"],
          likes: 6,
          comments: 2,
          users: [
            { id: "1", name: "Sarah Chen", avatar: "/avatars/1.png" },
            { id: "4", name: "James Wilson", avatar: "/avatars/4.png" },
          ],
        },
        {
          id: "task-5",
          title: "Unit Test Coverage",
          content:
            "Increase unit test coverage to 80% for critical components and implement integration tests.",
          priority: "high",
          createdAt: "24 Mar",
          tags: ["Testing", "Quality"],
          likes: 10,
          comments: 4,
          users: [
            { id: "2", name: "Michael Rodriguez", avatar: "/avatars/2.png" },
            { id: "3", name: "Priya Patel", avatar: "/avatars/3.png" },
          ],
        },
        {
          id: "task-6",
          title: "Performance Monitoring Setup",
          content:
            "Implement application performance monitoring using New Relic and set up error tracking with Sentry.",
          priority: "medium",
          createdAt: "25 Mar",
          tags: ["DevOps", "Monitoring"],
          likes: 7,
          comments: 3,
          users: [{ id: "5", name: "Emma Thompson", avatar: "/avatars/5.png" }],
        },
      ],
    },
    ongoing: {
      id: "ongoing",
      title: "ON GOING",
      tasks: [
        {
          id: "task-7",
          title: "CI/CD Pipeline Enhancement",
          content:
            "Improve CI/CD pipeline with automated testing, code quality checks, and deployment stages.",
          priority: "high",
          createdAt: "26 Mar",
          tags: ["DevOps", "Automation"],
          likes: 9,
          comments: 6,
          users: [
            { id: "2", name: "Michael Rodriguez", avatar: "/avatars/2.png" },
            { id: "5", name: "Emma Thompson", avatar: "/avatars/5.png" },
          ],
        },
        {
          id: "task-8",
          title: "Frontend State Management",
          content:
            "Implement Redux Toolkit for state management and create reusable hooks for common operations.",
          priority: "medium",
          createdAt: "27 Mar",
          tags: ["Frontend", "Architecture"],
          likes: 11,
          comments: 5,
          users: [
            { id: "1", name: "Sarah Chen", avatar: "/avatars/1.png" },
            { id: "3", name: "Priya Patel", avatar: "/avatars/3.png" },
          ],
        },
        {
          id: "task-9",
          title: "Database Migration Scripts",
          content:
            "Create and test database migration scripts for upcoming schema changes.",
          priority: "high",
          createdAt: "28 Mar",
          tags: ["Backend", "Database"],
          likes: 8,
          comments: 4,
          users: [{ id: "4", name: "James Wilson", avatar: "/avatars/4.png" }],
        },
      ],
    },
    "in-review": {
      id: "in-review",
      title: "IN REVIEW",
      tasks: [
        {
          id: "task-10",
          title: "Security Audit Implementation",
          content:
            "Implement security recommendations from recent audit, including input validation and rate limiting.",
          priority: "high",
          createdAt: "29 Mar",
          tags: ["Security", "Backend"],
          likes: 14,
          comments: 7,
          users: [
            { id: "1", name: "Sarah Chen", avatar: "/avatars/1.png" },
            { id: "2", name: "Michael Rodriguez", avatar: "/avatars/2.png" },
          ],
        },
        {
          id: "task-11",
          title: "Accessibility Improvements",
          content:
            "Implement WCAG 2.1 compliance and improve keyboard navigation across the application.",
          priority: "medium",
          createdAt: "30 Mar",
          tags: ["Frontend", "Accessibility"],
          likes: 6,
          comments: 3,
          users: [
            { id: "3", name: "Priya Patel", avatar: "/avatars/3.png" },
            { id: "5", name: "Emma Thompson", avatar: "/avatars/5.png" },
          ],
        },
      ],
    },
    completed: {
      id: "completed",
      title: "COMPLETED",
      tasks: [
        {
          id: "task-12",
          title: "Project Setup and Configuration",
          content:
            "Initial project setup with TypeScript, ESLint, Prettier, and development environment configuration.",
          priority: "medium",
          createdAt: "15 Mar",
          tags: ["Setup", "Configuration"],
          likes: 5,
          comments: 2,
          users: [{ id: "4", name: "James Wilson", avatar: "/avatars/4.png" }],
          status: "Done",
        },
        {
          id: "task-13",
          title: "Docker Containerization",
          content:
            "Containerize application with Docker and create docker-compose setup for development environment.",
          priority: "high",
          createdAt: "18 Mar",
          tags: ["DevOps", "Docker"],
          likes: 9,
          comments: 4,
          users: [
            { id: "2", name: "Michael Rodriguez", avatar: "/avatars/2.png" },
            { id: "5", name: "Emma Thompson", avatar: "/avatars/5.png" },
          ],
          status: "Done",
        },
        {
          id: "task-14",
          title: "Initial API Endpoints",
          content:
            "Implement core API endpoints with proper error handling and response formatting.",
          priority: "high",
          createdAt: "19 Mar",
          tags: ["Backend", "API"],
          likes: 7,
          comments: 3,
          users: [
            { id: "1", name: "Sarah Chen", avatar: "/avatars/1.png" },
            { id: "3", name: "Priya Patel", avatar: "/avatars/3.png" },
          ],
          status: "Done",
        },
      ],
    },
  },
  columnOrder: ["new", "todo", "ongoing", "in-review", "completed"],
};
