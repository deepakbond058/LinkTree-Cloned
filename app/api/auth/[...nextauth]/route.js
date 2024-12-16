"use server";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "@/lib/mongodb";
import bcrypt from "bcrypt";
const saltRounds = 10;

const client = await clientPromise;
const db = client.db("LinkTree");
const collection = db.collection("userData");

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        username: { label: "Username", type: "text" },
        type: { label: "Type", type: "text" }, // To differentiate login/signup
      },
      async authorize(credentials) {
        const { email, password, username, type } = credentials;
    
        let currentUser =
          email?.length === 0
            ? await collection.findOne({ username })
            : await collection.findOne({ email });
    
        if (type === "signup") {
          // Hash the password
          const hashedPassword = await bcrypt.hash(password, saltRounds);
    
          // Add new user if not found
          if (!currentUser) {
            await collection.insertOne({
              email,
              username,
              hashedPassword,
              profilepic: process.env.NEXT_PUBLIC_PIC,
              bio: "",
              fullname: "",
            });
          } else {
            // Update existing user's username or password
            await collection.updateOne(
              { email },
              {
                $set: {
                  username,
                  hashedPassword,
                  profilepic:
                    currentUser.profilepic === process.env.NEXT_PUBLIC_PIC
                      ? process.env.NEXT_PUBLIC_PIC
                      : currentUser.profilepic,
                },
              }
            );
          }
    
          // Fetch updated user and return
          currentUser = await collection.findOne({ email });
          return { ...currentUser, _id: currentUser._id.toString() };
    
        } else if (type === "login") {
          // Return null if user not found
          if (!currentUser) {
            return null;
          }
    
          // Compare passwords
          const isPasswordValid = await bcrypt.compare(
            password,
            currentUser.hashedPassword
          );
          if (isPasswordValid) {
            return { ...currentUser, _id: currentUser._id.toString() };
          } else {
            return null;
          }
        }
    
        return null;
      },
    }),    
  ],

  strategy: "jwt",
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const userinDB = await collection.findOne({ email: user.email });
        if (userinDB) {
          token.image = userinDB.profilepic;
          token.username = userinDB.username;
          token.bio = userinDB.bio;
          token.name = userinDB.fullname;
        } else {
          token.username = user.username
            ? user.username
            : user.email.split("@")[0];
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        const userinDB = await collection.findOne({ email: token.email });
        if (userinDB) {
          session.user.image = userinDB.profilepic;
          session.user.username = userinDB.username;
          session.user.bio = userinDB.bio;
          session.user.name = userinDB.fullname;
        } else {
          session.user.username = token.username;
        }
      }
      return session;
    },
    async signIn({ user, account, profile }) {
      if (account.provider == "github") {
        const currentUser = await collection.findOne({ email: user.email });
        //making a new user
        if (!currentUser) {
          await collection.insertOne({
            fullname: user.name ? user.name : "",
            email: user.email,
            profilepic: user.image ? user.image : process.env.NEXT_PUBLIC_PIC,
            username: user.email.split("@")[0],
            bio: profile.bio ? profile.bio : "",
          });
        } else {
          //updating the user data on every signin
          await collection.updateOne(
            { email: user.email },
            {
              $set: {
                fullname: user.name,
                profilepic:
                  currentUser.profilepic === process.env.NEXT_PUBLIC_PIC
                    ? user.image
                    : currentUser.profilepic,
                username: currentUser.username
                  ? currentUser.username
                  : user.email.split("@")[0],
                bio: currentUser.bio
                  ? currentUser.bio
                  : profile.bio
                  ? profile.bio
                  : "",
              },
            }
          );
        }
        return true;
      } else if (account.provider == "google") {
        const currentUser = await collection.findOne({ email: user.email });
        //making a new user
        if (!currentUser) {
          await collection.insertOne({
            fullname: user.name ? user.name : "",
            email: user.email,
            profilepic: user.image ? user.image : process.env.NEXT_PUBLIC_PIC,
            username: user.email.split("@")[0],
            bio: profile.bio ? profile.bio : "",
          });
        } else {
          //updating the user data on every signin
          await collection.updateOne(
            { email: user.email },
            {
              $set: {
                fullname: user.name,
                profilepic:
                  currentUser.profilepic === process.env.NEXT_PUBLIC_PIC
                    ? user.image
                    : currentUser.profilepic,
                username: currentUser.username
                  ? currentUser.username
                  : user.email.split("@")[0],
                bio: currentUser.bio
                  ? currentUser.bio
                  : profile.bio
                  ? profile.bio
                  : "",
              },
            }
          );
        }
        return true;
      } else if (account.provider == "credentials") {
        return true;
      }
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
