import bcrypt from 'bcrypt';
import httpStatus from "http-status";
import config from '../../config';
import AppError from "../../errors/AppError";
import { User } from "../user/user.model";
import { TLogin } from "./auth.interface";
import { createToken } from "./auth.utils";


const loginUser = async (userData: TLogin) => {
    const { userName, password } = userData

    // Check if the user exists
    const user = await User.findOne({ userName })

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }

    // checking if the user is already deleted

    const isDeleted = user?.isDeleted;

    if (isDeleted) {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
    }

    // checking if the user is blocked

    const userStatus = user?.status;

    if (userStatus === 'blocked') {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
    }

    //checking if the password is correct

    // Check the password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new AppError(httpStatus.FORBIDDEN, 'Password does not match')

    }

    //create token and sent to the  client

    const jwtPayload = {
        userId: user.id,
        role: user.role,
    };
    const accessToken = createToken(
        jwtPayload,
        config.jwt_refresh_secret as string,
        config.jwt_refresh_expires_in as string,
    );

    const refreshToken = createToken(
        jwtPayload,
        config.jwt_refresh_secret as string,
        config.jwt_refresh_expires_in as string,
    );
    console.log({ refreshToken }, {
        accessToken
    });
    return {
        accessToken,
        refreshToken,
    };
};

// const refreshToken = async (token: string) => {
//     // checking if the given token is valid
//     const decoded = verifyToken(token, config.jwt_refresh_secret as string);

//     const { userId, iat } = decoded;

//     // checking if the user is exist
//     const user = await User.findOne({ email })

//     if (!user) {
//         throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
//     }
//     // checking if the user is already deleted
//     const isDeleted = user?.isDeleted;

//     if (isDeleted) {
//         throw new AppError(httpStatus.FORBIDDEN, 'This user is deleted !');
//     }

//     // checking if the user is blocked
//     const userStatus = user?.status;

//     if (userStatus === 'blocked') {
//         throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked ! !');
//     }

//     if (
//         user.passwordChangedAt &&
//         User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
//     ) {
//         throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
//     }

//     const jwtPayload = {
//         userId: user.id,
//         role: user.role,
//     };

//     const accessToken = createToken(
//         jwtPayload,
//         config.jwt_access_secret as string,
//         config.jwt_access_expires_in as string,
//     );

//     return {
//         accessToken,
//     };
// };


export const AuthServices = {
    loginUser,
};