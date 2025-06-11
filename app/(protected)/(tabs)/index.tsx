import BarChartComponent from "@/components/Charts/BarChart";
import PieChartComponent from "@/components/Charts/PieChart";
import { globalStyles } from "@/styles/globalStyles";
import { View } from "react-native";

export default function Index() {
  return (
    <View style={globalStyles.screen}>
      <BarChartComponent />
      <PieChartComponent />
    </View>
  );
}
