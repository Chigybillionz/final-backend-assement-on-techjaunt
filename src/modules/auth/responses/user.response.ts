import { User } from "../../../entities/User.entity";

export class UserResponse {
  id: string;

  firstName: string;

  lastName: string;

  email: string;

  phone?: string;

  role: string;

  profileImage?: string;

  isEmailVerified: boolean;

  isVerifiedOwner: boolean;

  isActive: boolean;

  constructor(user: User) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.phone = user.phone;
    this.role = user.role;
    this.profileImage = user.profileImage;
    this.isEmailVerified = user.isEmailVerified;
    this.isVerifiedOwner = user.isVerifiedOwner;
    this.isActive = user.isActive;
  }
}
