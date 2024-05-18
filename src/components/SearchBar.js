// SearchBar.js
import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { COLOR, HEIGHT } from "../theme/theme";
import { Fontisto } from '@expo/vector-icons';

const SearchBar = ({ onSearch }) => {
    return (
        <View style={styles.background}>
            <Fontisto 
                name="search" 
                style={styles.iconStyle} />
            <TextInput
                style={styles.inputStyle}
                placeholder="Search"
                onChangeText={onSearch}
                autoCorrect={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        backgroundColor: COLOR.primaryGreyHex,
        height: HEIGHT(5),
        borderRadius: HEIGHT(1),
        marginHorizontal: HEIGHT(1),
        flexDirection: 'row',
        marginBottom: HEIGHT(3),
        borderColor: COLOR.primaryBlackHex,
        borderWidth: HEIGHT(0.1)
    
    },
    iconStyle: {
        fontSize: HEIGHT(3),
        alignSelf: 'center',
        marginHorizontal: HEIGHT(1.5)
    },
    inputStyle: {
        borderColor: COLOR.primaryBlackHex,
        fontSize: HEIGHT(2),
        flex: 1
    }
});

export default SearchBar;
