import { useEffect } from "react";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import {
	Alert,
	FlatList,
	Image,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { SignOutButton } from "../../components/SignOutButton";
import { useTransactions } from "../../hooks/useTransactions";
import PageLoader from "../../components/PageLoader";
import { styles } from "../../assets/styles/home.styles";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants/colors";
import { BalanceCard } from "../../components/BalanceCard";
import { TransactionItem } from "../../components/TransactionItem";
export default function Page() {
	const { user } = useUser();
	const {
		isLoading,
		setIsLoading,
		deleteTransaction,
		fetchAll,
		summery,
		transactions,
	} = useTransactions(user.id);

	useEffect(() => {
		fetchAll();
	}, []);

	const handleDelete = (id) => {
		Alert.alert(
			"Delete Transaction",
			"Are you sure want to delete this transaction?",
			[
				{
					text: "Cancel",
					style: "cancel",
				},
				{
					text: "Delete",
					style: "destructive",
					onPress: () => deleteTransaction(id),
				},
			]
		);
	};

	if (isLoading) return <PageLoader />;

	return (
		<View style={styles.container}>
			<View style={styles.content}>
				<View style={styles.header}>
					<View style={styles.headerLeft}>
						<Image
							source={require("../../assets/images/logo.png")}
							style={styles.headerLogo}
							resizeMode="contain"
						/>
						<View style={styles.welcomeContainer}>
							<Text style={styles.welcomeText}>Welcome,</Text>
							<Text style={styles.usernameText}>
								{
									user?.emailAddresses?.[0].emailAddress.split(
										"@"
									)[0]
								}
							</Text>
						</View>
					</View>
					<View style={styles.headerRight}>
						<TouchableOpacity
							style={styles.addButton}
							onPress={() => {
								router.push("/sign-in");
							}}
						>
							<Ionicons
								name="add"
								size={20}
								color={COLORS.white}
							/>
							<Text style={styles.addButtonText}>Add</Text>
						</TouchableOpacity>
						<SignOutButton />
					</View>
				</View>
				<BalanceCard summary={summery} />
				<View style={styles.transactionsHeaderContainer}>
					<Text style={styles.sectionTitle}>Recent Transactions</Text>
				</View>
			</View>
			<FlatList
				style={styles.transactionsList}
				contentContainerStyle={styles.transactionsListContent}
				data={transactions}
				renderItem={({ item }) => {
					return (
						<TransactionItem item={item} onDelete={handleDelete} />
					);
				}}
			/>
		</View>
	);
}
