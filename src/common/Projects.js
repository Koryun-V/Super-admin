import React from 'react';
import {Link} from "react-router-dom";
import {} from "@fortawesome/free-solid-svg-icons";
import figma from "../assets/icon/figma.png"
import gitHubIcon from "../assets/icon/git-hub.png"
import swagger from "../assets/icon/swagger.png"


const projects = [
    {
        id: 1,
        icon: figma,
        title: "Figma web site",
        link: "https://www.figma.com/design/NAb5QDIslrHLKBEbGA3ovz/%D0%98%D0%BD%D1%82%D0%B5%D1%80%D0%BD%D0%B5%D1%82-%D0%BC%D0%B0%D0%B3%D0%B0%D0%B7%D0%B8%D0%BD---%D0%94%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D0%BA%D0%B0-%D1%81%D1%82%D1%80%D0%BE%D0%B9%D0%BC%D0%B0%D1%82%D0%B5%D1%80%D0%B8%D0%B0%D0%BB%D0%BE%D0%B2?node-id=1-2314",
    },
    {
        id: 2,
        title: "Git hub web site",
        icon: gitHubIcon,
        link: "https://github.com/Koryun-V/Shop-project"
    },
    {
        id: 3,
        title: "Git hub admin",
        icon: gitHubIcon,
        link: "https://github.com/ArmineSargsyan1/ArmineSargsyan1.github.io"
    },
    {
        id: 4,
        title: "Git hub super admin",
        icon: gitHubIcon,
        link: "https://github.com/Koryun-V/Super-admin"
    },
    {
        id: 5,
        title: "Git hub node",
        icon: gitHubIcon,
        link: "https://github.com/Nersik199/Final_Project_Node"
    },
    {
        id: 6,
        title: "Swagger api documentation",
        icon: swagger,
        link: "https://world-of-construction.onrender.com/api-docs"
    }

]

const Projects = () => {
    return (
        <div className="section">
            <div className="store-header">
                <div className="nav-store">
                        <div className="title">
                            <h1>Projects</h1>
                        </div>
                </div>
            </div>

            <div className="container">
                <div className="projects">
                    {projects.map(({id, icon, link, title}) => (
                        <Link target="_blank" to={link} className="project">
                            <div className="project-icon">
                                <img src={icon}/>
                            </div>
                            <div className="project-title">
                                <h3>{title}</h3>
                                <span>{link}</span>
                            </div>
                        </Link>

                    ))}
                </div>
            </div>
        </div>
    );
};

export default Projects;
