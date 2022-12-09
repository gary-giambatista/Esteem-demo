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

// old conversation db create
const createConversation = async (queryData) => {
	if (queryData) {
		const matchRef = await addDoc(collection(db, "conversations"), {
			timestamp: serverTimestamp(),
			users: [user.uid, queryData.user],
			user1: user.uid,
			user2: queryData.user,
			user2PhotoURL: queryData.photoURL,
			user1Side: side,
			user2Side: queryData.side,
			answer1: view,
			answer2: queryData.desc,
		});
		console.log("Document written with ID: ", matchRef.id);
	}
};

// original idea mapping notes
//1 test if no-match if clause works on findMatch()
//add modals for 2 outcomes below
// add a modal screen onSubmit > modal checks if match exists > if so match screen which redirects to chat >  if not > different message which redirects to home

// QUERY
// if statement: if (side === true) {specific query}
// check opposing side's question(params.details.id)>!answerSIDE>matched==false

//CREATE conversation
// user1 == user.uid (active user)
// user2 == questions > answerAgree/answeDisagree userId
// question >> should be part of the query using questionId
// answer1 == view
// answer2 == questions > answerAgree/answeDisagree desc
// 2nd db call to create SUB collection: messages
//

// then
// KEEP in mind, references probably need to be separate DB calls
//^^ possible create initially in answer and store in a varaible to avoid multiple db calls for the same variable
//create collection: conversations
// user1 == user.uid (active user)
// user2 == questions > answerAgree/answeDisagree userId
// question == params.details.id
// answer 1 == view
// answer 2 == questions > answerAgree/answeDisagree desc
// 2nd db call to create SUB collection: messages
//messages hold
// answer 1 **store here or in messages collection???
// answer 2 **probably here...

[
	{
		id: "C0jQDJyxPucNKg1uspnx",
		questionTitle: "Title #1",
		timestamp: [Object],
		user0PhotoURL:
			"https://lh3.googleusercontent.com/a/ALm5wu3X-egFwQRg62cuA6L3RLgZ2b80SXWotRHLTPtrTX4=s96-c",
		user1PhotoURL:
			"https://lh3.googleusercontent.com/a/ALm5wu3X-egFwQRg62cuA6L3RLgZ2b80SXWotRHLTPtrTX4=s96-c",
		userIds: ["B9qv1k1oY7NYVvTNWpfHTkWjSfJ3", "B9qv1k1oY7NYVvTNWpfHTkWjSfJ3"],
	},
];
matches[0].userIds[0];

//android keystore
// Configuration: Android Preview (Default)
// Keystore
// Type                JKS
// Key Alias           336db3080ea38a6f1a165410b4c98e40
// MD5 Fingerprint     11:CE:37:4F:48:5A:F4:D3:DC:06:76:BF:18:08:6D:F6
// SHA1 Fingerprint    C1:85:F4:D0:FE:19:62:87:5C:DB:CA:28:83:E6:53:D6:C0:C9:6F:C2
// SHA256 Fingerprint  7A:B9:EF:DB:05:A2:29:81:4D:73:F0:7D:53:20:C7:70:B8:62:AA:BA:53:65:CB:AD:8D:AF:70:83:F0:AC:50:DC
// Updated             3 seconds ago
