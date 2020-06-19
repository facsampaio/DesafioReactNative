import React, { useEffect, useState } from "react";

import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import api from './services/api'


export default function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {api.get('repositories').then(response => setRepositories(response.data))},[]);

  async function handleLikeRepository(id) {
    
    const url = `repositories/${id}/like`;
    const response = await api.post(url);
    const repository = response.data;
    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    repositories[repositoryIndex] = repository;

    setRepositories([...repositories]);
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
        data={repositories}
        KeyExtractor={repository => repository.id}
        renderItem={({item:repository}) => (
        <View key={`view-1-${repository.id}`} style={styles.repositoryContainer}>
          <Text key={`text-repo-${repository.id}`} style={styles.repository}>{repository.title}</Text>
          <View key={`view-2-${repository.id}`} style={styles.techsContainer}>
          {repository.techs.map(tech => (
          <View key={`${Math.floor(100*Math.random())}`} >
            <Text key={`${Math.floor(100*Math.random())}`} style={styles.tech}>
              {tech}
            </Text>
          </View>
          ))}</View>
          

          <View key={`view-4-${repository.id}`} style={styles.likesContainer}>
            <Text
              style={styles.likeText}
              key={`repository-likes-${repository.id}`}
            >
              {repository.likes} {repository.likes === 1 ? 'curtida' : 'curtidas'}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={() => handleLikeRepository(repository.id)}
            // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
            key={`like-button- ${repository.id}`}
          >
            <Text key={`text-button - ${repository.id}`} style={styles.buttonText}>Curtir</Text>
          </TouchableOpacity>
        </View>
        )}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
    //alignContent: 'center',
    borderRadius: 17,
    textAlign: 'center',
    width: 210,
    height: 55,
    
  },
});
