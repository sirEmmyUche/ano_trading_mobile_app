import { StyleSheet, View, Text } from "react-native";
import {
  VictoryArea,
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryScatter,
} from "victory-native";

export default function LineChart2(props){
  const data = [
      { x: 'Mon', y: 150 },
      { x: 'Tue', y: 230 },
      { x: 'Wed', y: 224 },
      { x: 'Thu', y: 218 },
      { x: 'Fri', y: 135 },
      { x: 'Sat', y: 147 },
      { x: 'sun', y: 260 },
    ];
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Victory Native</Text>
      <VictoryChart
        theme={VictoryTheme.material}
        height={250}
        width={400}
      >
        <VictoryArea
          style={{ data: { fill: "rgba(230, 231, 231,0.8)" } }}
          data={data}
          animate={{
            duration: 2000,
            onLoad: { duration: 1000 },
          }}
        />
        <VictoryLine
          data={data}
          style={{ data: { stroke: "#d6d6d7", strokeWidth: 2 } }}
        />
        <VictoryScatter
          data={data}
          size={4}
          style={{ data: { fill: "#24262a" } }}
        />
      </VictoryChart>
    </View>
  );
};

const styles = StyleSheet.create({
    title: {
      padding: 5,
      borderRadius:100,
      borderWidth: 1,
      borderColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
    //   borderRadius: 100,
      borderWidth: 1,
      borderColor: 'red',
    },
  });