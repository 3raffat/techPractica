export interface IErrorResponse {
  error?: {
    message?: string;
    [key: string]: any;
  };
  message?: string;
  [key: string]: any;
}

export interface User {
  id: string;
  name: string;
  avatar: string; // URL or path
}

export interface Task {
  id: string;
  content: string;
  title: string;
  priority: "low" | "medium" | "high";
  dueDate?: string;
  createdAt?: string;
  tags?: string[];
  likes?: number;
  comments?: number;
  users?: User[];
  status?: string;
  image?: string;
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export interface KanbanBoarde {
  columns: {
    [key: string]: Column;
  };
  columnOrder: string[];
}

/*-------------------------------------------------------------------------------------------------- */
export interface ISessionsResponse {
  data: ISessionsData;
  status: number;
  message: string;
}

export interface ISessionsData {
  sessions: ISession[];
  totalItems: number;
  totalPages: number;
  pageSize: number;
}

export interface ISession {
  id: string;
  name: string;
  description: string;
  system: {
    id: string;
    name: string;
  };
  requirements: IRequirement[];
  ownerFullName: string;
  private: boolean;
  running: boolean;
}

export interface IRequirement {
  requirementId: string;
  field: string;
  technologies: string[];
}
/*-------------------------------------------------------------------------------------------------- */
export interface ISystemsResponse {
  data: {
    systems: ISystem[];
  };
  status: number;
  message: string;
}

export interface ISystem {
  id: string;
  name: string;
}
/*-------------------------------------------------------------------------------------------------- */
export interface IFieldsResponse {
  data: IField[];
  status: number;
  message: string;
}
export interface IField {
  id: string;
  name: string;
}
/*-------------------------------------------------------------------------------------------------- */
export interface IFormInputRegister {
  name: string;
  email: string;
  password: string;
}
export interface IFormInputLogin {
  email: string;
  password: string;
}

/*-------------------------------------------------------------------------------------------------- */
export interface IFloatingShape {
  delay: number;
  duration: number;
  size: number;
  color: string;
  opacity: number;
  x: number;
  y: number;
}
export interface IGeometricShape {
  delay: number;
  duration: number;
  size: number;
  rotation: number;
  x: number;
  y: number;
}
export interface ProgrammingShapeProps {
  x: number;
  y: number;
  delay: number;
  duration: number;
  size: number;
  text: string;
  rotation?: number;
  color?: string;
  opacity?: number;
}
/*-------------------------------------------------------------------------------------------------- */
