export default function TestPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        padding: '48px 24px',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f4f7fb',
        color: '#14213d',
      }}
    >
      <div
        style={{
          maxWidth: '720px',
          margin: '0 auto',
          backgroundColor: '#ffffff',
          borderRadius: '18px',
          padding: '32px',
          boxShadow: '0 18px 50px rgba(20, 33, 61, 0.1)',
        }}
      >
        <h1 style={{ marginTop: 0, marginBottom: '12px', fontSize: '34px' }}>
          Page de test
        </h1>
        <p style={{ marginTop: 0, marginBottom: '24px', fontSize: '18px' }}>
          Cette route fonctionne aussi. Le serveur Next.js repond bien.
        </p>

        <ul style={{ margin: 0, paddingLeft: '20px', lineHeight: 1.8 }}>
          <li>Serveur Next.js: OK</li>
          <li>Port 3001: OK</li>
          <li>Routage App Router: OK</li>
        </ul>
      </div>
    </main>
  )
}
