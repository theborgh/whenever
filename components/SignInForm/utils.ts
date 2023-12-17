'use server';
import type { LoginType } from "./SignInForm";
import { prisma } from "@/db";

export const loginWithCredentials = async (meetingId: string, userTimezone: string, data: LoginType) => {
  // if password, check if user exists, if not, create a new user.
  let response = await prisma.user.findUnique({
    where: {
      id: `${meetingId}-${data.userName}`,
    },
  });

  if (!response) {
      await prisma.userAvailability.create({
        data: {
          id: `${meetingId}-${data.userName}`,
          meetingId: meetingId,
          userId: `${meetingId}-${data.userName}`,
        },
      });

    response = await prisma.user.create({
      data: {
        id: `${meetingId}-${data.userName}`,
        name: data.userName,
        password: data.userPassword,
        timezone: userTimezone,
        meetingId: meetingId,
        userAvailabilityId: `${meetingId}-${data.userName}`,
        },
      },
    );
  }

  console.log('response to user search: ', response);

  // if user already exists and no password was provided, throw error and ask for password.
  if (response.password && !data.userPassword) {
    throw new Error('Password is required for returning users.');
  }

  return response;
};