import { Text } from "react-native";
import React from "react";
import { Portal, Dialog, Button } from "react-native-paper";
import Colors from "@/constants/Colors";
import styles from "./Dialog.styles";

export type MyDialog = {
  content: string;
  visible: boolean;
  onConfirmClick: () => void;
  onCancelClick: () => void;
  onDismiss: () => void;
};

const MyDialog = ({
  content,
  visible,
  onConfirmClick,
  onCancelClick,
  onDismiss,
}: MyDialog) => {
  return (
    <Portal>
      <Dialog
        style={{
          borderRadius: 5,
          backgroundColor: "#fff",
          padding: 5,
        }}
        visible={visible}
        onDismiss={onDismiss}
      >
        <Dialog.Icon icon="alert" />
        <Dialog.Title style={styles.title}>{`是否删除`}</Dialog.Title>
        <Dialog.Content>
          <Text>{content}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            textColor={Colors.light.defalutText}
            onPress={() => onCancelClick()}
          >
            取消
          </Button>
          <Button
            textColor="red"
            onPress={() => onConfirmClick()}
          >
            确定
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default MyDialog;
