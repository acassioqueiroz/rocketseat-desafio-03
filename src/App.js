import React, { useState, useEffect } from "react";

import api from './services/api';

import "./styles.css";


function App() {

  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const repository = {
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    };
    const response = await api.post('repositories', repository);  
    const repositoriesUpdated = [ ... repositories, response.data ];
    setRepositories(repositoriesUpdated);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    const repositoriesUpdated = [...repositories];
    const indexRepDelete = repositoriesUpdated.findIndex(repository => (repository.id === id));
    repositoriesUpdated.splice(indexRepDelete, 1);
    setRepositories(repositoriesUpdated);
  }

  async function updateRepositories() {
    const response = await api.get('repositories');
    setRepositories(response.data);
  };


  useEffect(() => {
    updateRepositories();
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
