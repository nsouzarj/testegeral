import { Profile } from "./profile.model";

export interface User {
 id: number;
 name: string;
 email: string;
 password?: string;
 profile: Profile;
}
