import * as Clipboard from "expo-clipboard";

const pasteFromClipboard = async (textInput: string): Promise<string> => {
  const text = await Clipboard.getStringAsync();
  return textInput ? textInput + text : text;
};

export { pasteFromClipboard };
