import React from "react";
import './Sidebar.css';

export default function Sidebar() {
  return(
    <nav>
      <img src="./assets/logo.svg" alt="logo do site"></img>
      <ul>
        <li>
          <a href="#" className="active">
            <ion-icon name="tablet-portrait"></ion-icon>
            Boards
          </a>
        </li>
        <li>
          <a href="#">
            <ion-icon name="people"></ion-icon>
            Equipes
          </a>
        </li>
        <li>
          <a href="#">
            <ion-icon name="document-text"></ion-icon>
            Relatórios
          </a>
        </li>
        <li>
          <a href="#">
            <ion-icon name="cog"></ion-icon>
            Ajustes
          </a>
        </li>
      </ul>
    </nav>
  )
}