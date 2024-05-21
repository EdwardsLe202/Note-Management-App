// FolderScreen.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { FOLDERS } from '../../../data/dummy-data';

const FolderScreen = ({ navigation }) => {
    return (
        <View style={styles.container}>
            <FlatList 
                data={FOLDERS}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        style={styles.folderItem} 
                        onPress={() => navigation.navigate('ManageFolder', { folderId: item.id })}
                    >
                        <Text style={styles.folderName}>{item.name}</Text>
                        <Text style={styles.noteCount}>{item.noteIds.length} notes</Text>
                    </TouchableOpacity>
                )}
            />
            {/* <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    folderItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    folderName: {
        fontSize: 18,
    },
    noteCount: {
        fontSize: 14,
        color: 'gray',
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        backgroundColor: '#00f',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 30,
    },
});

export default FolderScreen;
