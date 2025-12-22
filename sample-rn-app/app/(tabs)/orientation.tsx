import {
  Platform,
  StyleSheet,
  View,
  Text,
  Button,
  ToastAndroid,
} from "react-native";
import RandomNumber from "../randomNumber";
import { useEffect, useMemo, useRef, useState } from "react";
import { launchImageLibrary } from "react-native-image-picker";

const Orientation = () => {
  const randomNUmberCount = 6;
  const [state, setState] = useState({ selectedNumberIndexes: [] });
  const [remainingSeconds, setRemainingSeconds] = useState(60);
  const intervalRef = useRef<number | null>(null);
  const [isRunning, setIsRunning] = useState(true);
  //create a collection of random numbers between 10 and 20
  const generateCollection = () =>
    Array.from(
      { length: randomNUmberCount },
      () => Math.floor(Math.random() * 10) + 10
    );

  const [collection, setCollection] = useState(generateCollection);

  const target = useMemo(() => {
    const randomNumberIndexcollection = [];
    for (let i = 0; i < randomNUmberCount - 2; i++) {
      //create a collection of random numbers between 1 and randomNUmberCount havin randomNUmberCount-2 elements
      const randomNUmber = Math.floor(Math.random() * randomNUmberCount) + 1;
      if (randomNumberIndexcollection.indexOf(randomNUmber - 1) === -1) {
        randomNumberIndexcollection.push(randomNUmber - 1);
      }
    }
    console.log("randomNumberIndexcollection:", randomNumberIndexcollection);
    return randomNumberIndexcollection.reduce((acc, curr) => {
      return acc + collection[curr];
    }, 0);
  }, [collection]);

  const selectedSet = useMemo(
    () => new Set(state.selectedNumberIndexes),
    [state.selectedNumberIndexes]
  );

  const isNumberSelected = (index: number) => selectedSet.has(index);

  const resetGame = () => {
    setCollection(generateCollection());
    setState({ selectedNumberIndexes: [] });
    clearInterval(intervalRef.current!);
    setRemainingSeconds(60);
    setIsRunning(true);
  };

  const selectNumber = (numberIndex: number) => {
    if (isNumberSelected(numberIndex)) {
      setState((prevState) => ({
        selectedNumberIndexes: prevState.selectedNumberIndexes.filter(
          (item) => item !== numberIndex
        ),
      }));
    } else {
      setState((prevState) => ({
        selectedNumberIndexes: [
          ...prevState.selectedNumberIndexes,
          numberIndex,
        ],
      }));
    }
  };

  const gameStatus = useMemo(() => {
    if (state.selectedNumberIndexes.length === 0) {
      return "Not selected";
    }
    const sum = state.selectedNumberIndexes.reduce((acc, curr) => {
      return acc + collection[curr];
    }, 0);
    if (sum < target) {
      return "playing";
    }
    if (sum > target) {
      return "lost";
    }
    if (sum === target) {
      return "won";
    }
    return "not-selected";
  }, [state.selectedNumberIndexes, collection, target]);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    intervalRef.current = setInterval(() => {
      setRemainingSeconds((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          clearInterval(intervalRef.current!);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current!);
  }, [isRunning]); // The empty array ensures this runs only once

  const loadImage = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      console.log("response", response.assets[0].fileSize);
      if (response.didCancel) {
        ToastAndroid.show("User cancelled image picker", ToastAndroid.SHORT);
        return;
      }
      ToastAndroid.show(response.assets[0].uri, ToastAndroid.SHORT);
    });
  };
  return (
    <View style={[style.container]}>
      {/* <Text style={[style.title, { flex: 2 }]}>text item1</Text>
      <Text style={[style.title, { flex: 1 }]}>text item2</Text>
      <Text style={[style.title, { flex: 2 }]}>text item3</Text> */}
      <Text>{gameStatus}</Text>
      <Text style={[style.title, style[`status_${gameStatus}`]]}>{target}</Text>
      <View style={[style.randomContainer]}>
        {collection.map((item, index) => (
          <RandomNumber
            id={index}
            key={index}
            number={item}
            isDisabled={isNumberSelected(index) || !isRunning}
            onPress={selectNumber}
          ></RandomNumber>
        ))}
      </View>
      <Button title="Play Again" onPress={() => resetGame()} />
      <Text>{remainingSeconds}</Text>
      <Button title="Upload Image" onPress={() => loadImage()} />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    marginTop: 50,
    backgroundColor: "orange",
    flex: 1,
    //flexDirection: "row",
    // justifyContent: "flex-start",
    alignItems: "center",
  },
  randomContainer: {
    backgroundColor: "orange",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    flexWrap: "wrap",
  },
  status_playing: {
    backgroundColor: "#e7b964ff",
  },
  status_lost: {
    backgroundColor: "#f85910ff",
  },
  status_won: {
    backgroundColor: "#4caf50ff",
  },
  title: {
    fontSize: 20,
    width: 100,
    color: "#000",
    backgroundColor: "#ddd",
    fontWeight: "bold",
    marginHorizontal: 50,
    marginVertical: 10,
    padding: 5,
    paddingHorizontal: 30,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#075a2aff",
    textAlign: "center",
  },
});

export default Orientation;
