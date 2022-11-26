import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TopicRow = () => {
	return (
		<View>
			<View style={styles.rowContainer}>
				<TouchableOpacity>
					<Text style={styles.rowTitle}>Topic #1</Text>
					<Text style={styles.rowDescription}>
						This is the description for the first topic. Let's put more
						information about it here, but still keep it short.
					</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.rowContainer}>
				<TouchableOpacity>
					<Text style={styles.rowTitle}>Topic #2</Text>
					<Text style={styles.rowDescription}>
						This is the description for the first topic. Let's put more
						information about it here, but still keep it short.
					</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.rowContainer}>
				<TouchableOpacity>
					<Text style={styles.rowTitle}>Topic #3</Text>
					<Text style={styles.rowDescription}>
						This is the description for the first topic. Let's put more
						information about it here, but still keep it short.
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default TopicRow;
const styles = StyleSheet.create({
	rowContainer: {
		padding: 10,
		borderBottomWidth: 1,
	},
	rowTitle: {
		fontSize: 20,
	},
});
