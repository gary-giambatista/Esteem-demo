// import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";

// export default function App() {
// 	return (
// 		<View style={styles.container}>
// 			<Text style={{ backgroundColor: "#FF5864" }}>
// 				Open up App.js to start working on your app!
// 			</Text>
// 			<StatusBar style="auto" />
// 		</View>
// 	);
// }

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: "#fff",
// 		alignItems: "center",
// 		justifyContent: "center",
// 	},
// });

// old answer db creation
// const docRef = await addDoc(collection(db, "answers"), {
// 	timestamp: serverTimestamp(),
// 	user: user.uid,
// 	matched: false,
// 	side: side,
// 	desc: view,
// 	questionId: params.details.id,
// });

// answer db logic
//create a match here > Conversation collection
//----
//Option 0 -- see if quering with 3 constraints in possible
//option .5 -- see if composite groups can allow for 3 way query (2 definitely)

//Option #1 - use more calls if cannot (*difficult since 2 of the types are booleans)
//make answer have a complex data type containing a map of {matched: false, side: side} ??? use an array of 0 and 1 (false and true), then sort for 1
//isMatched function - DB call 1
//getSide function - DB call 2

//seems like the best option
// Option #2 -cannot query mutliple filters, may need to make a sub-collection for unmatched side(agree) and unmatched side(disagree) (also, can take advantage of data hierarchy and only query answers under a specific question, elminating 1 of the query constaints)
// use if statement to call a different create db function for each answer
// ALSO** consider where the answers collection is, for #2 maybe:
// questions > answersAgree && answersDisagree
// each answer will hold a matched boolean, desc, and user id

// HOW TO PREVENT MORE THAN 1 ANSWER AT A TIME
// add END chat feature to restart the process
// change the db function addAnswer to use setDoc, instead of addDoc (to create or update instead of just create)
// add submitted field to the 2 answer DBs
// change it to true when submit is clicked (add statechange into submitview function)
// use the fetchAnswer function in a useEffect on QuestionScreen.js page mount
// lastly on the <TouchableOpacity/> submit button, add a disabled property for when submitted === true

//HERE IS the useEffect which is most likely not WORKING
// fetch current answer, need to do 2 quieres to check if answer exist (1 for easch answer collection) then return if no document exists
// does the fetch work correctly, being last part is just user ID, does that pull the correct data?
useEffect(() => {
	const fetchAnswer = async () => {
		const querySnapshot = await getDocs(
			collection(db, "questions", params.details.id, "answerAgree", user.uid)
		);
		if (querySnapshot.data()) {
			//get submitted here too if needed
			const { side, desc } = querySnapshot.data();
			setSide(side);
			setView(desc);
			return;
			//setSubmitted(submitted)
			// querySnapshot.forEach((doc) => {
			// 	const { side, desc, submitted } = doc.data();
			// });
		} else if (!querySnapshot.data()) {
			const fetchAnswer = async () => {
				const querySnapshot = await getDocs(
					collection(
						db,
						"questions",
						params.details.id,
						"answerDisagree",
						user.uid
					)
				);
				if (querySnapshot.data()) {
					//get submitted here too if needed
					const { side, desc } = querySnapshot.data();
					setSide(side);
					setView(desc);
					return;
				} else return; //no document exists > exit
			};
		}
		fetchAnswer();
	};
}, []);

// structure and .exists method
// https://softauthor.com/firebase-firestore-get-document-by-id/
try {
	const docSnap = await getDoc(docRef);
	if (docSnap.exists()) {
		console.log(docSnap.data());
	} else {
		console.log("Document does not exist");
	}
} catch (error) {
	console.log(error);
}

// array of objects for messages, instead of 2 calls for initial messages
const convoRef = await addDoc(
	collection(db, "conversations", matchRef.id, "messages"),
	{
		timestamp: serverTimestamp(),
		user1: user.uid,
		user2: queryData.user,
		answer1: view,
		answer2: queryData.desc,
		messages: [
			{
				timestamp: serverTimestamp(),
				message: view,
				user: user.uid,
			},
			{
				timestamp: serverTimestamp(),
				message: queryData.desc,
				user: user.uid,
			},
		],
	}
);
