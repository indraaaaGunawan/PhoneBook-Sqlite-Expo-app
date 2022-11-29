import React from "react";
import { TouchableOpacity, Text } from "react-native";
import colors from "./color";

const Button = ({
  mb,
  mr,
  color,
  title,
  fc,
  border,
  bw,
  onPress = () => {},
}) => {
  const backgroundColor = color || colors.gold;
  const marginRight = mr || 0;
  const marginBottom = mb || 20;
  const fontColor = fc || colors.white;
  const borderColor = border || colors.gold;
  const borderWidth = bw || 1;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        height: 45,
        width: "100%",
        backgroundColor: backgroundColor,
        // marginVertical: 20,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: marginBottom,
        borderRadius: 10,
        marginRight: mr,
        borderColor: borderColor,
        borderWidth: borderWidth,
      }}
    >
      <Text style={{ color: fontColor, fontWeight: "bold", fontSize: 15 }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
