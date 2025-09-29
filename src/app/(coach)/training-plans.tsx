import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { Player } from "@/types/Player";
import { TrainingTemplate } from "@/types/TrainingTemplate";
import { WeeklyPlan } from "@/types/WeeklyPlan";

// Mock data for players
const players: Player[] = [
  { id: "1", name: "Naledi Motaung", position: "Forward" },
  { id: "2", name: "Ayanda Dlamini", position: "Midfielder" },
  { id: "3", name: "Sarah van de Merwe", position: "Defender" },
  { id: "4", name: "John Doe", position: "Goalkeeper" },
  { id: "5", name: "Jane Smith", position: "Forward" },
];

// Training plan templates
const trainingTemplates: TrainingTemplate[] = [
  {
    id: "1",
    name: "Endurance Training",
    description: "Improve cardiovascular fitness and stamina",
  },
  {
    id: "2",
    name: "Strength Training",
    description: "Build muscle strength and power",
  },
  {
    id: "3",
    name: "Skill Development",
    description: "Enhance technical skills and ball control",
  },
  {
    id: "4",
    name: "Recovery Session",
    description: "Light recovery and flexibility work",
  },
  {
    id: "5",
    name: "Team Tactics",
    description: "Practice team formations and strategies",
  },
];

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function TrainingPlans() {
  const router = useRouter();
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyPlan>({});
  const [viewMode, setViewMode] = useState("individual"); // 'individual' or 'overview'

  const assignTraining = (day: string, templateId: string) => {
    if (!selectedPlayer) {
      Alert.alert("Please select a player first");
      return;
    }

    const template = trainingTemplates.find((t) => t.id === templateId);
    if (!template) return;
    const newPlan = { ...weeklyPlan };

    if (!newPlan[selectedPlayer.id]) {
      newPlan[selectedPlayer.id] = {};
    }

    newPlan[selectedPlayer.id][day] = template;
    setWeeklyPlan(newPlan);

    Alert.alert(
      "Training Assigned",
      `${template.name} assigned to ${selectedPlayer.name} for ${day}`
    );
  };

  const renderPlayer = ({ item }: { item: Player }) => (
    <TouchableOpacity
      style={[
        styles.playerItem,
        selectedPlayer?.id === item.id && styles.selectedPlayer,
      ]}
      onPress={() => setSelectedPlayer(item)}
    >
      <Text style={styles.playerName}>{item.name}</Text>
      <Text style={styles.playerPosition}>{item.position}</Text>
    </TouchableOpacity>
  );

  const renderDay = (day) => {
    const playerPlan = selectedPlayer ? weeklyPlan[selectedPlayer.id] : null;
    const assignedTraining = playerPlan ? playerPlan[day] : null;

    return (
      <View style={styles.dayContainer} key={day}>
        <Text style={styles.dayTitle}>{day}</Text>
        {assignedTraining ? (
          <View style={styles.assignedTraining}>
            <Text style={styles.trainingName}>{assignedTraining.name}</Text>
            <Text style={styles.trainingDesc}>
              {assignedTraining.description}
            </Text>
          </View>
        ) : (
          <View style={styles.trainingOptions}>
            {trainingTemplates.map((template) => (
              <TouchableOpacity
                key={template.id}
                style={styles.trainingButton}
                onPress={() => assignTraining(day, template.id)}
              >
                <Text style={styles.trainingButtonText}>{template.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Training Plans</Text>
      </View>

      {/* View Mode Toggle */}
      <View style={styles.viewModeSection}>
        <TouchableOpacity
          style={[styles.viewModeButton, styles.activeViewMode]}
        >
          <Text style={styles.viewModeText}>Individual Plans</Text>
        </TouchableOpacity>
      </View>

      {/* Player Selection */}
      {viewMode === "individual" && (
        <View style={styles.playerSection}>
          <Text style={styles.sectionTitle}>Select Player</Text>
          <FlatList
            data={players}
            renderItem={renderPlayer}
            keyExtractor={(item) => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.playerList}
          />
        </View>
      )}

      {/* Weekly Training Plan */}
      <ScrollView style={styles.weeklyPlan}>
        <Text style={styles.sectionTitle}>Weekly Training Plan</Text>
        <View>
          {selectedPlayer ? (
            <Text style={styles.selectedPlayerText}>
              Planning for: {selectedPlayer.name}
            </Text>
          ) : (
            <Text style={styles.selectPlayerPrompt}>
              Please select a player to assign training
            </Text>
          )}
          {daysOfWeek.map((day) => renderDay(day))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1A394B",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#D9D9D9",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginRight: 15,
  },
  backButtonText: {
    fontWeight: "700",
    fontSize: 16,
    color: "black",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  playerSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  playerList: {
    maxHeight: 80,
  },
  playerItem: {
    backgroundColor: "#D9D9D9",
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
    minWidth: 120,
    alignItems: "center",
  },
  selectedPlayer: {
    backgroundColor: "#4CAF50",
  },
  playerName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
  playerPosition: {
    fontSize: 12,
    color: "#666",
  },
  weeklyPlan: {
    flex: 1,
  },
  selectedPlayerText: {
    fontSize: 16,
    color: "#4CAF50",
    marginBottom: 15,
    textAlign: "center",
  },
  selectPlayerPrompt: {
    fontSize: 16,
    color: "#FFA500",
    marginBottom: 15,
    textAlign: "center",
  },
  dayContainer: {
    backgroundColor: "#D9D9D9",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    marginHorizontal: 10,
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginBottom: 10,
  },
  assignedTraining: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
  },
  trainingName: {
    fontSize: 14,
    fontWeight: "bold",
    color: "white",
  },
  trainingDesc: {
    fontSize: 12,
    color: "white",
    marginTop: 2,
  },
  trainingOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  trainingButton: {
    backgroundColor: "#2196F3",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginRight: 8,
    marginBottom: 8,
  },
  trainingButtonText: {
    fontSize: 12,
    color: "white",
    fontWeight: "bold",
  },
  viewModeSection: {
    flexDirection: "row",
    backgroundColor: "#D9D9D9",
    borderRadius: 8,
    marginBottom: 20,
    padding: 4,
  },
  viewModeButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
    alignItems: "center",
  },
  activeViewMode: {
    backgroundColor: "#4CAF50",
  },
  viewModeText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "black",
  },
  playerOverview: {
    backgroundColor: "#D9D9D9",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  playerOverviewName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginBottom: 5,
  },
  playerOverviewPosition: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
  },
  playerTrainingSummary: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  daySummary: {
    alignItems: "center",
    flex: 1,
  },
  daySummaryLabel: {
    fontSize: 12,
    fontWeight: "bold",
    color: "black",
    marginBottom: 4,
  },
  daySummaryTraining: {
    fontSize: 10,
    color: "#666",
    textAlign: "center",
  },
});
