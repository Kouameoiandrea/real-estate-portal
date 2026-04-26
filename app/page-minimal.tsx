export default function Home() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1 style={{ color: 'blue', fontSize: '32px' }}>IMMOPRO - Portail Immobilier</h1>
      <p style={{ fontSize: '18px', margin: '20px 0' }}>Bienvenue sur votre plateforme immobilière !</p>
      
      <div style={{ backgroundColor: 'lightgray', padding: '20px', margin: '20px 0', borderRadius: '10px' }}>
        <h2 style={{ color: 'black' }}>Services disponibles:</h2>
        <ul style={{ color: 'black' }}>
          <li>Location d'appartements</li>
          <li>Vente de biens immobiliers</li>
          <li>Gestion de contrats</li>
          <li>Suivi financier</li>
        </ul>
      </div>
      
      <div style={{ backgroundColor: 'green', color: 'white', padding: '20px', margin: '20px 0', borderRadius: '10px' }}>
        <h2>Statistiques:</h2>
        <p>2,847 biens disponibles</p>
        <p>15,892 utilisateurs actifs</p>
        <p>523 transactions ce mois</p>
      </div>
      
      <div style={{ backgroundColor: 'orange', color: 'white', padding: '20px', margin: '20px 0', borderRadius: '10px', textAlign: 'center' }}>
        <h2>Si vous voyez cette page, l'application fonctionne !</h2>
        <p>Le serveur Next.js est opérationnel sur le port 3001</p>
      </div>
    </div>
  )
}
