import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Message from "../layouts/Message";
import Container from "../layouts/Container";
import LinkButton from "../layouts/LinkButton";
import ProjectCard from "../project/ProjectCard";
import Loading from "../layouts/Loading";

import styles from "./Projects.module.css";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);
  const [projectMessage, setProjectMessage] = useState('');

  const location = useLocation();
  let message = "";
  if (location.state) {
    message = location.state.message;
    console.log(message);
  }

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:5000/projects", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          console.log(data);
          setProjects(data);
          setRemoveLoading(true);
        })
        .catch((err) => console.log(err));
    }, 300);
  }, []);

  function removeProject(id){
    fetch(`http://localhost:5000/projects/${id}`,{
      method: 'DELETE',
      headers: {
         'Content-type': 'application/json'
      },
    }).then(resp => resp.json())
    .then(() => {
      setProjects(projects.filter((projects) => projects.id !== id))
      setProjectMessage('Projeto removido com sucesso!')
    })
    .catch(err => console.log(err))
  }

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/newProject" text="Criar Projeto" />
      </div>
      {message && <Message msg={message} type="success" />}
      {projectMessage && <Message msg={projectMessage} type="success" />}
      <Container customClass="start">
        {projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard
              id={project.id}
              name={project.name ? project.name : "Nome Indefinido"}
              budget={project.budget}
              category={
                project.category
                  ? project.category.name
                  : "Categoria Indefinida"
              }
              key={project.id}
              handleRemove={removeProject}
            />
          ))}
        {!removeLoading && <Loading />}
        {removeLoading && projects.length === 0 &&
          <h2>Não há nenhum projeto cadastrado</h2>
        }
      </Container>
    </div>
  );
}

export default Projects;
