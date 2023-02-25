import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
    container: {
        flex: 0.95,
        backgroundColor: "#fff",
      },
      title: {
        fontSize: 32,
        fontWeight: "700",
      },
      inputContainer: {
        width: "90%",
        padding: 13,
        marginVertical: 6,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 6,
        margin: 12,
      },
      buttonContainer: {
        flexDirection: "column",
        alignItems: "stretch",
        justifyContent: "space-between",
        width: 320,
        height: 130,
      },
      button: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        borderRadius: 4,
        elevation: 3,
        backgroundColor: "black",
        height: 30,
      },
      text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: "bold",
        letterSpacing: 0.25,
        color: "white",
      },
      imagen: {
        fontSize: 100,
        borderWidth: 1,
        borderColor: "#ddd",
        borderRadius: 6,
        padding: 10,
        marginVertical: 6,
      },
})