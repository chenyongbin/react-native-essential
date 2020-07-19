import FastImage from "react-native-fast-image";
import { Image, NativeModules } from "react-native";

type RNImage = typeof Image;

let NewImage: RNImage | FastImage;

if (NativeModules.FastImageView) {
  NewImage = FastImage;
} else {
  NewImage = Image;
}

export default NewImage;
