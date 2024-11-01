"use client";

import { ClerkLoaded, ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Slot } from "expo-router";
import { ReactNode } from "react";
import * as SecureStore from "expo-secure-store";

// const convex = new ConvexReactClient(process.env.CONVEX_URL!);
const convex = new ConvexReactClient(
  "https://festive-sturgeon-235.convex.cloud",
);

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key);
      if (item) {
        console.log(`${key} was used 🔐 \n`);
      } else {
        console.log("No values stored under key: " + key);
      }
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value);
    } catch (err) {
      return;
    }
  },
};

const clerkKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider publishableKey={clerkKey!}>
      <ClerkLoaded>
        <ConvexProvider client={convex}>
          <Slot />
        </ConvexProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
