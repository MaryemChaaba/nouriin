import mongoose, { Schema, type Document, type Model, type Types } from "mongoose";
import bcrypt from "bcryptjs";

// Interfaces
export const USER_ROLES = ["admin", "user", "employee", "seller"] as const;
export type UserRoleI = (typeof USER_ROLES)[number];

export const EMPLOYEE_ROLES = [
  "packer",
  "deliveryman",
  "accounts",
  "incharge",
  "call_center",
] as const;

export type EmployeeRole = (typeof EMPLOYEE_ROLES)[number];

export const AUTH_PROVIDERS = ["local", "google", "github"] as const;
export type AuthProvider = (typeof AUTH_PROVIDERS)[number];

export interface IAddress {
  _id?: Types.ObjectId;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
}

export interface ICartItem {
  productId: Types.ObjectId;
  quantity: number;
}

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password?: string;
  dev_password?: string;
  avatar: string;
  role: UserRoleI;
  employee_role: EmployeeRole | null;
  isOAuthUser: boolean;
  authProvider: AuthProvider;
  authUid: string | null;
  hasSetPassword: boolean;
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  emailVerified: boolean;
  verificationToken?: string;
  verificationTokenExpire?: Date;
  addresses: IAddress[];
  wishlist: Types.ObjectId[];
  cart: ICartItem[];
  createdAt: Date;
  updatedAt: Date;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: function (this: IUser) {
        return !this.isOAuthUser;
      },
    },
    dev_password: {
      type: String,
      select: false,
      default: null,
    },
    avatar: {
      type: String,
      default:
        process.env.DEFAULT_USER_IMAGE ||
        "https://res.cloudinary.com/dxkhdqifr/image/upload/v1767712291/user_hz2mcv.png",
    },
    role: {
      type: String,
      enum: USER_ROLES,
      default: "user",
    },
    employee_role: {
      type: String,
       enum: EMPLOYEE_ROLES,
      default: null,
      validate: {
        validator: function (this: any, value: EmployeeRole | null) {
          if (this.role === "employee" && !value) {
            return false;
          }
          if (this.role !== "employee" && value) {
            return false;
          }
          return true;
        },
        message:
          "Employee role is required for employees and should be null for non-employees",
      },
    },
    isOAuthUser: {
      type: Boolean,
      default: false,
    },
    authProvider: {
      type: String,
      enum: AUTH_PROVIDERS,
      default: "local",
    },
    authUid: {
      type: String,
      default: null,
    },
    hasSetPassword: {
      type: Boolean,
      default: function (this: IUser) {
        return !this.isOAuthUser;
      },
    },
    resetPasswordToken: {
      type: String,
      default: null,
    },
    resetPasswordExpire: {
      type: Date,
      default: null,
    },
    emailVerified: {
      type: Boolean,
      default: function(this: IUser) { return this.isOAuthUser; }
    },
    verificationToken: {
      type: String,
      default: null,
    },
    verificationTokenExpire: {
      type: Date,
      default: null,
    },
    addresses: [
      {
        street: {
          type: String,
          required: true,
        },
        city: {
          type: String,
          required: true,
        },
        state: {
          type: String,
          required: true,
        },
        country: {
          type: String,
          required: true,
        },
        postalCode: {
          type: String,
          required: true,
        },
        isDefault: {
          type: Boolean,
          default: false,
        },
      },
    ],
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    cart: [
      {
        productId: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  if (!this.password) {
    return false;
  }
  return await bcrypt.compare(enteredPassword, this.password);
};

// Pre-save hook for password hashing and address validation
userSchema.pre("save", async function (this: IUser) {
  try {
    if (this.isModified("password") && this.password) {
      if (process.env.NODE_ENV === "development") {
        this.dev_password = Buffer.from(this.password).toString("base64");
      }

      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);

      if (this.isOAuthUser) {
        this.hasSetPassword = true;
      }
    }

    if (this.isModified("addresses") && this.addresses && this.addresses.length > 0) {
      const defaultAddress = this.addresses.find((addr) => addr.isDefault);
      if (defaultAddress) {
        this.addresses.forEach((addr) => {
          if (addr !== defaultAddress) addr.isDefault = false;
        });
      }
    }
  } catch (error) {
    throw error;
  }
});

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
