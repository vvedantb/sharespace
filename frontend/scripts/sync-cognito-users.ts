import { config } from "dotenv";
config({ path: ".env.local" });
import {
  CognitoIdentityProviderClient,
  ListUsersCommand,
} from "@aws-sdk/client-cognito-identity-provider";
import { PrismaClient } from "@prisma/client";

const cognito = new CognitoIdentityProviderClient({
  region: process.env.AWS_REGION || "eu-west-2",
});

const prisma = new PrismaClient();

async function syncUsers() {
  const response = await cognito.send(
    new ListUsersCommand({
      UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
    })
  );

  if (!response.Users) {
    console.log("No users found in Cognito");
    return;
  }

  console.log(`Found ${response.Users.length} users in Cognito`);

  for (const cognitoUser of response.Users) {
    const attrs = Object.fromEntries(
      cognitoUser.Attributes?.map((a) => [a.Name, a.Value]) || []
    );

    const email = attrs.email;
    if (!email) continue;

    const existing = await prisma.user.findUnique({ where: { email } });

    if (existing) {
      console.log(`User ${email} already exists, updating cognitoId`);
      await prisma.user.update({
        where: { email },
        data: { cognitoId: cognitoUser.Username },
      });
    } else {
      console.log(`Creating user ${email}`);
      await prisma.user.create({
        data: {
          cognitoId: cognitoUser.Username,
          email,
          firstName: attrs.given_name || "Unknown",
          lastName: attrs.family_name || "User",
        },
      });
    }
  }

  console.log("Sync complete");
}

syncUsers()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
