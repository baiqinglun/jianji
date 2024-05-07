import * as Clipboard from 'expo-clipboard';

const pasteFromClipboard = async (textInput:string|undefined): Promise<string|undefined> => {
    const text = await Clipboard.getStringAsync()
    return (textInput ? textInput+text : text)
};

export {pasteFromClipboard}