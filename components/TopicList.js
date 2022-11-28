import {
	collection,
	deleteDoc,
	doc,
	DocumentSnapshot,
	getDoc,
	getDocs,
	onSnapshot,
	query,
	serverTimestamp,
	setDoc,
	where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { db } from "../firebaseConfig";
import TopicRow from "./TopicRow";

const TopicList = () => {
	const [questions, setQuestions] = useState([]);
	const questionCollectionRef = collection(db, "questions");

	useEffect(() => {
		const fetchQuestions = async () => {
			const querySnapshot = await getDocs(collection(db, "questions"));
			const tempQuestions = [];
			querySnapshot.forEach((doc) => {
				// console.log(doc.id, " => ", doc.data());
				const { title, description } = doc.data();

				tempQuestions.push({
					id: doc.id,
					title,
					description,
				});
			});
			setQuestions(tempQuestions);
		};

		fetchQuestions();
	}, [db]);

	// console.log("HERE IS THE STATE", questions.length);
	// console.log("HERE IS THE STATE", questions);

	return (
		<View>
			<FlatList
				style={{ height: "100%" }}
				data={questions}
				renderItem={({ item }) => <TopicRow details={item} />}
				keyExtractor={(item) => item.id}
			/>
		</View>
	);
};

export default TopicList;

// useEffect(() => {
//     const fetchQuestions = async () => {
//         const querySnapshot = await getDocs(collection(db, "questions"));
//         querySnapshot.forEach((doc) => {
//             const tempQuestions = [];
//             // console.log(doc.id, " => ", doc.data());
//             const { title, description } = doc.data();

//             tempQuestions.push({
//                 id: doc.id,
//                 title,
//                 description,
//             });
//             setQuestions(tempQuestions);
//         });
//     };

//     fetchQuestions();
// }, []);
// console.log("HERE IS THE STATE", questions.length);

// useEffect(() => {
//     getDocs(collection(db, "questions")).then((snapshot) => {
//         let questions = [];
//         snapshot.docs.forEach((doc) => {
//             questions.push({ ...doc.data(), id: doc.id });
//         });
//     });
// }, []);
