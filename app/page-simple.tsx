export default function SimplePage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial', backgroundColor: '#f5f5f5' }}>
      <header style={{ backgroundColor: 'white', padding: '10px', marginBottom: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h1 style={{ color: '#333', margin: '0' }}>ImmoPro - Portail Immobilier</h1>
      </header>
      
      <main>
        <h2 style={{ color: '#2563eb' }}>Bienvenue sur ImmoPro</h2>
        <p>Votre plateforme immobilière à Abidjan et en Côte d'Ivoire</p>
        
        <div style={{ backgroundColor: 'white', padding: '20px', marginTop: '20px', borderRadius: '8px' }}>
          <h3>Services disponibles:</h3>
          <ul>
            <li>Location d'appartements</li>
            <li>Vente de biens immobiliers</li>
            <li>Gestion de contrats</li>
            <li>Suivi financier</li>
          </ul>
        </div>
        
        <div style={{ backgroundColor: '#10b981', color: 'white', padding: '20px', marginTop: '20px', borderRadius: '8px' }}>
          <h3>Statistiques:</h3>
          <p>2,847 biens disponibles</p>
          <p>15,892 utilisateurs actifs</p>
          <p>523 transactions ce mois</p>
        </div>
      </main>
    </div>
  )
}
