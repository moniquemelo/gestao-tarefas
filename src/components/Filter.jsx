import './Filter.css'

export default function Filter() {
  return(
    <section className="filter">
      <button>
        <ion-icon name="filter-outline"></ion-icon>
        <span>Filtrar</span>
      </button>
      <div className="input-wrapper">
        <ion-icon name="search-outline"></ion-icon>
        <input type="text" placeholder="Busque por cards, assuntos ou responsáveis..." />
      </div>
    </section>
  )
}