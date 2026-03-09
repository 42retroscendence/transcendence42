export interface User {
  id: string;
  username: string;
  state?: "online" | "offline" | "busy";
}

//another test to trigger a build