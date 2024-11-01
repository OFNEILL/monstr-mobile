import { View } from "react-native";

import { ThemedText } from "@/components/ThemedText";

export default function HomeScreen() {
  return (
    <View className="flex flex-col items-center w-full h-full">
      <ThemedText className="text-white">hey</ThemedText>
    </View>
  );
}
