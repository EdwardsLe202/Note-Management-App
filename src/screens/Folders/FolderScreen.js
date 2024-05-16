import {View, Text, Button} from "react-native";

const FolderScreen = () => {
    return (
        <View style={{ flex: 1, padding: 20 }}>
          <Text>Folders Screen (Optional)</Text>
          <Button title="Go Back" onPress={() => navigation.goBack()} />
        </View>
    );
}

export default FolderScreen;