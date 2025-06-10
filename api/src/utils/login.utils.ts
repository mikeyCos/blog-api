import { Response } from "express";
import { User } from "../interfaces/user";
import { signJWT } from "./jwt.utils";

const loginResponse = async (res: Response, user: User) => {
  const { id, username, role } = user;
  const accessTokenExpiresIn = 10; // 10 seconds
  const refreshTokenExpiresIn = 24 * 60 * 60 * 1000; // 24 hours * 60 minutes * 60 seconds * 1000 milliseconds = 1 day

  try {
    const accessToken = await signJWT(
      { user: { id, username, role } },
      { expiresIn: accessTokenExpiresIn }
    );
    const refreshToken = await Promise.resolve(
      signJWT(
        { user: { id } },
        {
          expiresIn: `${refreshTokenExpiresIn}`,
        }
      )
    );

    console.log("refreshToken:", refreshToken);
    console.log("accessToken:", accessToken);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      // maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds = 30 days
      maxAge: refreshTokenExpiresIn, // 24 hours * 60 minutes * 60 seconds * 1000 milliseconds = 1 day
      // maxAge: 24 * 60 * 60 * 1000, // 30 days * 24 hours * 60 minutes * 60 seconds * 1000 milliseconds
      // maxAge: 20 * 1000, // 20 seconds * 1000 milliseconds
    });

    return res.json({
      status: "success",
      code: 200,
      accessToken,
      user: { username, role },
    });
  } catch (err) {}
};

export default loginResponse;
