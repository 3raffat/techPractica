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

// export interface ISession {
//   id: string;
//   name: string;
//   description: string;
//   system: {
//     id: string;
//     name: string;
//   };
//   requirements: IRequirement[];
//   ownerFullName: string;
//   private: boolean;
//   running: boolean;
// }
export interface ISession {
  id: string;
  name: string;
  description: string;
  status: string;
  system: ISystem;
  requirements: IRequirement[];
  ownerFullName: string;
  private: boolean;
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
export interface ITechnologyResponse {
  data: {
    technologies: ITechnology[];
  };
  status: number;
  message: string;
}

export interface ITechnology {
  id: string;
  name: string;
  fields: IField[];
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
  confirmPassword: string;
}
export interface IFormInputLogin {
  email: string;
  password: string;
}
/*-------------------------------------------------------------------------------------------------- */
export interface ISessionRequest {
  data: {
    id: string;
    name: string;
    description: string;
    system: {
      id: string;
      name: string;
    };
    requirements: {
      requirementId: string;
      field: string;
      technologies: string[];
    }[];
    ownerFullName: string;
    running: boolean;
    private: boolean;
  };
  status: number;
  message: string;
}

export interface ICreateSessionRequest {
  name: string;
  description: string;
  isPrivate: boolean;
  system: string;
  field: string[];
  technologies: string[];
}
/*-------------------------------------------------------------------------------------------------- */

export interface IErrorResponse {
  timestamp: string | null;
  status: number;
  message?: string;
  code: string;
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
export interface SessionResponse {
  data: {
    id: string;
    name: string;
    description: string;
    status: string;
    system: {
      id: string;
      name: string;
    };
    requirements: {
      requirementId: string;
      field: string;
      technologies: string[];
    }[];
    ownerFullName: string | null;
    private: boolean;
  };
  status: number;
  message: string;
}
/*-------------------------------------------------------------------------------------------------- */
export interface IProfileResponse {
  data: {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      name: string;
      email: string;
      skills: { id: string; name: string }[];
      socialAccounts: { platform: string; profileUrl: string }[];
      brief: string;
    };
    sessions: {
      sessions: {
        id: string;
        name: string;
        description: string;
        status: string;
        system: { id: string; name: string };
        requirements: {
          requirementId: string;
          field: string;
          technologies: string[];
        }[];
        ownerFullName: string;
        private: boolean;
      }[];
      totalItems: number;
      totalPages: number;
      pageSize: number;
    };
  };
  status: number;
  message: string;
}
export interface ISkill {
  id: string;
  name: string;
}
export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  name: string;
  email: string;
  skills: ISkill[];
  socialAccounts: ISocialAccount[];
  brief: string;
}

export interface ISocialAccount {
  platform: string; // e.g. "GITHUB", "LINKEDIN"
  profileUrl: string; // e.g. "https://github.com/3raffat"
}

/*-------------------------------------------------------------------------------------------------- */
export type SocialPlatform = "LINKEDIN" | "GITHUB" | "X" | "FACEBOOK";

export interface ISocialAccountRequest {
  platformName: SocialPlatform;
  profileUrl: string;
}

export interface ISocialAccountRequest {
  platformName: SocialPlatform;
  profileUrl: string;
}
export interface IUserProfileRequest {
  firstName: string;
  lastName: string;
  brief: string;
  skillsIds: string[];
  socialAccountRequests: ISocialAccountRequest[];
}
/*-------------------------------------------------------------------------------------------------- */
