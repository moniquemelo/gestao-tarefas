import { useState, useEffect, useRef } from 'react';
import { CiSquarePlus } from "react-icons/ci";
import './Kanban.css';

export default function Kanban() {
  const [cards, setCards] = useState({
    todo: [
      { title: '#boraCodar um Kanban', description: 'Novo desafio do #boraCodar da Rocketseat, onde é proposto construir um quadro de Kanban.', tags: ['Rocketseat', 'desafio'] },
      { title: '#Manter a ofensiva', description: 'Novo desafio do #boraCodar da Rocketseat, onde é proposto construir um quadro de Kanban.', tags: ['Rocketseat'] }
    ],
    doing: [
      { title: '#boraCodar um Kanban', description: 'Novo desafio do #boraCodar da Rocketseat, onde é proposto construir um quadro de Kanban.', tags: ['Rocketseat', 'desafio'] },
      { title: '#Manter a ofensiva', description: 'Novo desafio do #boraCodar da Rocketseat, onde é proposto construir um quadro de Kanban.', tags: ['Rocketseat'] }
    ],
    done: [
      { title: '#boraCodar um Kanban', description: 'Novo desafio do #boraCodar da Rocketseat, onde é proposto construir um quadro de Kanban.', tags: ['Rocketseat', 'desafio'] }
    ]
  });

  const [newCard, setNewCard] = useState({ title: '', description: '' });
  const [addingTo, setAddingTo] = useState(null);
  const formRef = useRef(null);

  const handleAddCard = (section) => {
    setCards({
      ...cards,
      [section]: [{ ...newCard, tags: [] }, ...cards[section]]
    });
    setNewCard({ title: '', description: '' });
    setAddingTo(null);
  };

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setAddingTo(null);
    }
  };

  useEffect(() => {
    if (addingTo !== null) {
      document.addEventListener('click', handleClickOutside, true);
    } else {
      document.removeEventListener('click', handleClickOutside, true);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [addingTo]);

  return (
    <section className="kanban">
      {['todo', 'doing', 'done'].map(section => (
        <div key={section} className={section}>
          <h2>
            {section.charAt(0).toUpperCase() + section.slice(1)} 
            <CiSquarePlus size={32} color="var(--backgroundPage)" onClick={() => setAddingTo(section)} />
          </h2>
          
          <div className="cards">
            {addingTo === section && (
              <div className="card new-card-form" ref={formRef}>
                <input
                  type="text"
                  placeholder="Título"
                  value={newCard.title}
                  onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
                />
                <textarea
                  placeholder="Descrição"
                  value={newCard.description}
                  onChange={(e) => setNewCard({ ...newCard, description: e.target.value })}
                />
                <button onClick={() => handleAddCard(section)}>Adicionar tarefa</button>
              </div>
            )}

            {cards[section].map((card, index) => (
              <div key={index} className="card">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
                <div className="tags">
                  {card.tags.map((tag, tagIndex) => (
                    <span key={tagIndex}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
