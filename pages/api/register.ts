import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    // We only want to allow POST calls
    return res.status(405).end();
  }

  try {
    const { name, email, password } = req.body;
    const existingUser = await prismadb.user.findUnique({
      // To check that given email is used or not
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res.status(422).json({ error: "Email registered already" });
    }

    // Generating hash password with the help of bcrypt
    const hashedPassword = await bcrypt.hash(password, 12);

    // Adding the new registered user to the database through prisma
    const user = await prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
