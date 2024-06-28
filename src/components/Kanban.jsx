import { useState, useEffect, useRef } from 'react';
import { CiSquarePlus } from "react-icons/ci";
import { FaTrashAlt } from "react-icons/fa";
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

  const [newCard, setNewCard] = useState({ title: '' });
  const [addingTo, setAddingTo] = useState(null);
  const [error, setError] = useState(false);
  const formRef = useRef(null);

  const handleAddCard = (section) => {
    if (newCard.title) {
      setCards({
        ...cards,
        [section]: [{ ...newCard, description: '', tags: [] }, ...cards[section]]
      });
      setNewCard({ title: '' });
      setAddingTo(null);
      setError(false);
    } else {
      setError(true);
    }
  };

  const handleRemoveCard = (section, index) => {
    setCards({
      ...cards,
      [section]: cards[section].filter((_, i) => i !== index)
    });
  };

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setAddingTo(null);
      setNewCard({ title: '' });
      setError(false);
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
            <CiSquarePlus size={32} color="var(--backgroundPage)" onClick={() => {
              setAddingTo(section);
              setNewCard({ title: '' });
              setError(true); 
            }} />
          </h2>
          
          <div className="cards">
            {addingTo === section && (
              <div className="card new-card-form" ref={formRef}>
                <input
                  type="text"
                  placeholder="Título"
                  value={newCard.title}
                  onChange={(e) => {
                    setNewCard({ ...newCard, title: e.target.value });
                    if (e.target.value) {
                      setError(false);
                    } else {
                      setError(true); 
                    }
                  }}
                />
                <button onClick={() => handleAddCard(section)}>Adicionar tarefa</button>
                {error && (
                  <p style={{ color: 'red', fontSize: '1.3rem' }}>Você precisa inserir um título para sua tarefa.</p>
                )}     
              </div>
            )}

            {cards[section].map((card, index) => (
              <div key={index} className="card">
                <div className="title-trash">
                  <h3>{card.title}</h3>
                  <FaTrashAlt size={18} style={{color: 'red'}} onClick={() => handleRemoveCard(section, index)}/>
                </div>
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
