import z from "zod";
import {userSchemaType, userUpdateSchemaType} from "@/features/user/shared/user.validation";

export type UserType = z.infer<typeof userSchemaType>;
export type UserUpdateType = z.infer<typeof userUpdateSchemaType>;

export type UserMinifiedRes = {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    role: string,
}