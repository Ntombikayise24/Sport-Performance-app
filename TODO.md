# TODO List for Player Metrics Page

- [x] Create app/playermetrics.jsx: Implement the new screen with header (logo and menu), "Player Metrics" title, search TextInput, and a grid of 7 metric cards (Distance, Steps, Weight, Your Avg Heart, Sleep, Check O2 Level, Blood Pressure) using hardcoded sample data, Ionicons, and colors matching the screenshot. Use ScrollView, View, Text, TextInput, and styles similar to athleteview.jsx.

- [x] Edit app/athleteview.jsx: Add onPress handler to the performanceArrow TouchableOpacity to navigate to '/playermetrics' using the router.

- [ ] Add bottom navigation bar to app/athleteview.jsx: Copy structure from coachview.jsx (absolute positioned, dark bg, 4 icons: home blue to '/athleteview', heart red to '/playermetrics', notifications yellow to '/notifications', person green to '/dashboard').

- [ ] Add bottom navigation bar to app/playermetrics.jsx: Similar to above, with home blue to '/athleteview', heart red to '/playermetrics', notifications yellow to '/notifications', person green to '/dashboard'. Adjust padding to avoid overlap.

- [ ] Test the implementation: Suggest running `npx expo start` to verify navigation and display.
