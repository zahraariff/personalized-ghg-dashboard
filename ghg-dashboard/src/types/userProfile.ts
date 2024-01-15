export interface UserProfile {
    username: string;
    email: string;
    password: string;
    roles: string;
    selectedGraphs: string[]; // Assuming selectedGraphs is an array of strings
  }

  export interface GraphObject {
    [key: string]: {
      src: string;
    };
  }