import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import React from "react";
import Colors from "../../constants/Colors";
import { useOAuth } from "@clerk/clerk-expo";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import { useCallback } from "react";

export const useWarmUpBrowser = () => {
  React.useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {

  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = useCallback(async () => {
    console.log("Button pressed");
    try {
      const { createdSessionId, signIn, signUp, setActive } = await startOAuthFlow({
        redirectUrl: Linking.createURL("/home", { scheme: "myapp" }),
      });

      if (createdSessionId) {

      } else {

      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, [])

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/login.png")}
        style={styles.login}
      />
      <View style={styles.container2}>
        <Text style={styles.txt1}>Ready to make a new friend?</Text>
        <Text style={styles.txt2}>
          Let's adopt the pet which you like and make there life happy again
        </Text>
        <Pressable 
        onPress={onPress}
        style={styles.button}>
          <Text style={styles.txt3}>Get Started</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    height: "100%",
  },

  container2: {
    padding: 20,
    display: "flex",
    gap: 12,
  },

  login: {
    width: "100%",
    height: 450,
  },

  button: {
    marginTop: 100,
    backgroundColor: Colors.PRIMARY,
    padding: 14,
    borderRadius: 14,
  },

  txt1: {
    fontFamily: "outfit-bold",
    fontSize: 30,
    textAlign: "center",
    color: Colors.PRIMARY,
  },

  txt2: {
    fontFamily: "outfit-medium",
    textAlign: "center",
    color: Colors.GRAY,
    fontSize: 14,
  },

  txt3: {
    textAlign: "center",
    fontFamily: "outfit-medium",
    fontSize: 16,
  },
});
