// ManageFolderScreen.js
import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { FOLDERS, NOTES } from '../../../data/dummy-data';

const ManageFolderScreen = ({ route, navigation }) => {
    const { folderId } = route.params;
    const folder = FOLDERS.find(f => f.id === folderId);
    const folderNotes = NOTES.filter(note => folder.noteIds.includes(note.id));

    return (
        <View style={styles.container}>
            {/* <FlatList 
                data={folderNotes}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.noteItem}>
                        <Text style={styles.noteText}>{item.text}</Text>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.emptyText}>No notes in this folder.</Text>}
            />
            <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}>+</Text>
            </TouchableOpacity> */}
            <Text style={styles.folder}>No notes in this folder.</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    noteItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    noteText: {
        fontSize: 18,
    },
    emptyText: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'center',
        marginTop: 20,
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
    folder: {
        alignSelf: 'center',
        paddingTop: 50
        
    }
});

export default ManageFolderScreen;
