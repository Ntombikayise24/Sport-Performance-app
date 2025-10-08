import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  RefreshControl,
  Modal,
} from "react-native";
import { useTheme } from "../../contexts/ThemeContext";
import { Player } from "../../types/Player";

export default function PlayerStatus() {
  const router = useRouter();
  const { colors } = useTheme();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [showFilterModal, setShowFilterModal] = useState(false);

  const [players, setPlayers] = useState<Player[]>([
    { id: "1", name: "Naledi Motaung", position: "Forward", status: "Injured" },
    { id: "2", name: "Ayanda Dlamini", position: "Goalkeeper", status: "Fit" },
    { id: "3", name: "Sarah van de Merwe", position: "Midfielder", status: "On Leave" },
    { id: "4", name: "Karabelo Ndlovu", position: "Defender", status: "Injured" },
    { id: "5", name: "Michaela Smith", position: "Winger", status: "Fit" },
    { id: "6", name: "Lerato Mthembu", position: "Center", status: "Recovering" },
  ]);

  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const logout = () => {
    router.push("/");
    setIsMenuOpen(false);
  };

  const loadPlayers = async () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  useEffect(() => {
    loadPlayers();
  }, []);

  const sortPlayers = () => {
    const sorted = [...players].sort((a, b) =>
      sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );
    setPlayers(sorted);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const filteredPlayers = players.filter((player) => {
    const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus ? player.status === filterStatus : true;
    return matchesSearch && matchesFilter;
  });

  const statusColors = {
    Fit: "#4CAF50",
    Injured: "#F44336",
    "On Leave": "#FF9800",
    Recovering: "#FFC107",
    Suspended: "#9C27B0",
  };

  const statusIcons = {
    Fit: "checkmark-circle",
    Injured: "medical",
    "On Leave": "calendar",
    Recovering: "fitness",
    Suspended: "ban",
  };

  const statusOptions = ["All", "Fit", "Injured", "On Leave", "Recovering", "Suspended"];

  return (
    <View style={[styles.container, { backgroundColor: colors.primary }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: colors.text }]}>Player Status</Text>
        <TouchableOpacity onPress={() => setIsMenuOpen(!isMenuOpen)}>
          <Ionicons name="menu" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      {isMenuOpen && (
        <View style={[styles.menuDropdown, { backgroundColor: colors.surface }]}>
          <TouchableOpacity style={styles.menuItem} onPress={logout}>
            <Text style={[styles.menuItemText, { color: colors.text }]}>Logout</Text>
          </TouchableOpacity>
        </View>
      )}

      <TextInput
        style={[styles.searchInput, {
          backgroundColor: colors.surface,
          color: colors.text,
          borderColor: colors.border,
        }]}
        placeholder="Search players..."
        placeholderTextColor={colors.muted}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <View style={styles.controlsContainer}>
        <TouchableOpacity
          style={[styles.filterButton, { backgroundColor: colors.surface }]}
          onPress={() => setShowFilterModal(true)}
        >
          <Text style={{ color: colors.text }}>Filter: {filterStatus || "All"}</Text>
          <Ionicons name="chevron-down" size={16} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.sortButton, { backgroundColor: colors.secondary }]}
          onPress={sortPlayers}
        >
          <Text style={{ color: colors.text }}>Sort {sortOrder === "asc" ? "▲" : "▼"}</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showFilterModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Select Status</Text>
            {statusOptions.map((status) => (
              <TouchableOpacity
                key={status}
                style={styles.modalOption}
                onPress={() => {
                  setFilterStatus(status === "All" ? null : status);
                  setShowFilterModal(false);
                }}
              >
                <Text style={[styles.modalOptionText, { color: colors.text }]}>{status}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity
              style={[styles.modalClose, { backgroundColor: colors.error }]}
              onPress={() => setShowFilterModal(false)}
            >
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        {loading ? (
          <Text style={{ color: colors.text, textAlign: "center", marginTop: 20 }}>Loading...</Text>
        ) : (
          filteredPlayers.map((player) => (
            <TouchableOpacity
              key={player.id}
              style={[styles.card, {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              }]}
              onPress={() => router.push({
                pathname: "/(athlete)/athlete-profile",
                params: { name: player.name },
              })}
            >
              <Ionicons
                name={statusIcons[player.status] as any}
                size={24}
                color={statusColors[player.status]}
              />
              <View style={styles.playerInfo}>
                <Text style={[styles.playerName, { color: colors.text }]}>{player.name}</Text>
                <Text style={[styles.playerPosition, { color: colors.text }]}>
                  {player.position}
                </Text>
                <View style={[styles.statusBadge, { backgroundColor: statusColors[player.status] }]}>
                  <Text style={styles.statusBadgeText}>{player.status}</Text>
                </View>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.muted} />
            </TouchableOpacity>
          ))
        )}
      </ScrollView>

      <View style={[styles.bottomNav, { backgroundColor: colors.primary }]}>
        <TouchableOpacity onPress={() => router.push("/(coach)/coach-view")}>
          <Ionicons name="home-outline" size={28} color="#1E90FF" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/(coach)/coach-view-metrics")}>
          <MaterialCommunityIcons name="chart-bar" size={28} color="#FF4500" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/(team)/player-status")}>
          <Ionicons name="fitness-outline" size={28} color="#FFD700" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/(coach)/coach-profile")}>
          <Ionicons name="person-outline" size={28} color="#32CD32" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  menuDropdown: {
    position: "absolute",
    top: 50,
    right: 20,
    borderRadius: 5
    ,
    padding: 10,
    elevation: 5,
    zIndex: 10,
  },
  menuItem: {
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  menuItemText: {
    fontSize: 14,
  },
  searchInput: {
    borderWidth: 1,
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    marginBottom: 12,
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  filterButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  sortButton: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  modalOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  modalOptionText: {
    fontSize: 16,
  },
  modalClose: {
    marginTop: 15,
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: "center",
  },
  modalCloseText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 12,
  },
  playerInfo: {
    flex: 1,
    marginLeft: 10,
  },
  playerName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  playerPosition: {
    fontSize: 14,
    opacity: 0.8,
    marginTop: 2,
  },
  statusBadge: {
    alignSelf: "flex-start",
    marginTop: 6,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  statusBadgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    borderRadius: 16,
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    elevation: 10,
  },
});
