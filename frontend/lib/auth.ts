import { CognitoJwtVerifier } from "aws-jwt-verify";
import { headers } from "next/headers";
import { prisma } from "./prisma";

const verifier = CognitoJwtVerifier.create({
  userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID!,
  clientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID!,
  tokenUse: "access",
});

export async function getCurrentUser() {
  try {
    const headersList = await headers();
    const auth = headersList.get("authorization");
    if (!auth?.startsWith("Bearer ")) return null;

    const token = auth.slice(7);
    const payload = await verifier.verify(token);

    return prisma.user.findUnique({
      where: { cognitoId: payload.sub },
    });
  } catch {
    return null;
  }
}
