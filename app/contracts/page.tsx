'use client'

import { useState } from 'react'

interface Contract {
  id: number
  title: string
  type: 'location' | 'vente'
  client: string
  property: string
  amount: number
  startDate: string
  endDate?: string
  status: 'draft' | 'pending_signature' | 'active' | 'expired' | 'terminated'
  signedAt?: string
  nextPayment?: string
  monthlyRent?: number
  deposit?: number
}

export default function ContractsPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'location' | 'vente'>('all')
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null)
  const [showSignatureModal, setShowSignatureModal] = useState(false)

  const contracts: Contract[] = [
    {
      id: 1,
      title: 'Contrat Location Appartement T3',
      type: 'location',
      client: 'Kouame Ourefra',
      property: 'Appartement T3 Centre-Ville',
      amount: 150000,
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      status: 'active',
      signedAt: '2023-12-15',
      nextPayment: '2024-02-01',
      monthlyRent: 150000,
      deposit: 300000
    },
    {
      id: 2,
      title: 'Contrat Vente Villa',
      type: 'vente',
      client: 'Arouna',
      property: 'Villa avec Piscine',
      amount: 85000000,
      startDate: '2024-01-15',
      status: 'pending_signature',
      deposit: 8500000
    },
    {
      id: 3,
      title: 'Contrat Location Studio',
      type: 'location',
      client: 'Léonce Yapi',
      property: 'Studio Meublé Centre-Ville',
      amount: 65000,
      startDate: '2023-06-01',
      endDate: '2024-05-31',
      status: 'active',
      signedAt: '2023-05-20',
      nextPayment: '2024-02-01',
      monthlyRent: 65000,
      deposit: 130000
    },
    {
      id: 4,
      title: 'Contrat Location Appartement T2',
      type: 'location',
      client: 'Koffi Konan',
      property: 'Appartement T2 Quartier Sud',
      amount: 90000,
      startDate: '2023-03-01',
      endDate: '2024-02-29',
      status: 'expired',
      signedAt: '2023-02-20',
      monthlyRent: 90000,
      deposit: 180000
    },
    {
      id: 5,
      title: 'Contrat Location Villa Premium',
      type: 'location',
      client: 'Dominique Ebah Ouattara',
      property: 'Villa de Luxe avec Jardin',
      amount: 300000,
      startDate: '2024-01-10',
      endDate: '2025-01-10',
      status: 'active',
      signedAt: '2024-01-05',
      nextPayment: '2024-02-01',
      monthlyRent: 300000,
      deposit: 600000
    }
  ]

  const filteredContracts = contracts.filter(contract => 
    activeTab === 'all' || contract.type === activeTab
  )

  const getStatusColor = (status: Contract['status']) => {
    switch (status) {
      case 'draft': return 'bg-gray-100 text-gray-800'
      case 'pending_signature': return 'bg-yellow-100 text-yellow-800'
      case 'active': return 'bg-green-100 text-green-800'
      case 'expired': return 'bg-red-100 text-red-800'
      case 'terminated': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: Contract['status']) => {
    switch (status) {
      case 'draft': return 'Brouillon'
      case 'pending_signature': return 'En attente de signature'
      case 'active': return 'Actif'
      case 'expired': return 'Expiré'
      case 'terminated': return 'Résilié'
      default: return status
    }
  }

  const downloadPDFFile = () => {
    const rapportTexte = `IMOPRO - RAPPORT DES CONTRATS
================================

Date: ${new Date().toLocaleDateString('fr-FR')}
Contact: contact@immopro.fr | 01 02 85 61 23

STATISTIQUES
================================
Total contrats: ${contracts.length}
Contrats actifs: ${contracts.filter(c => c.status === 'active').length}
En attente signature: ${contracts.filter(c => c.status === 'pending_signature').length}
Contrats expirés: ${contracts.filter(c => c.status === 'expired').length}
Loyers mensuels totaux: ${contracts
  .filter(c => c.type === 'location' && c.status === 'active')
  .reduce((sum, c) => sum + (c.monthlyRent || 0), 0)
  .toLocaleString()} FCFA

LISTE DES CONTRATS
================================

${contracts.map((contract, index) => `
${index + 1}. ${contract.title}
----------------------------------------
   Numéro: ${contract.id}
   Client: ${contract.client}
   Bien: ${contract.property}
   Type: ${contract.type === 'location' ? 'Location' : 'Vente'}
   Montant: ${contract.type === 'location' 
     ? `${contract.monthlyRent?.toLocaleString()} FCFA/mois` 
     : `${contract.amount.toLocaleString()} FCFA`
   }
   ${contract.deposit ? `   Caution: ${contract.deposit.toLocaleString()} FCFA` : ''}
   Date début: ${new Date(contract.startDate).toLocaleDateString('fr-FR')}
   ${contract.endDate ? `   Date fin: ${new Date(contract.endDate).toLocaleDateString('fr-FR')}` : ''}
   Statut: ${getStatusText(contract.status)}
   ${contract.signedAt ? `   Signé le: ${new Date(contract.signedAt).toLocaleDateString('fr-FR')}` : ''}
`).join('')}

INFORMATIONS
================================
ImmoPro - Plateforme Immobilière
Email: contact@immopro.fr
Téléphone: 01 02 85 61 23
Généré le: ${new Date().toLocaleString('fr-FR')}`

    navigator.clipboard.writeText(rapportTexte).then(() => {
      alert(`Rapport copié dans le presse-papiers!\n\nOuvrez Bloc-notes et collez avec Ctrl+V\n\nAUCUNE URL utilisée!`)
    }).catch(() => {
      const textarea = document.createElement('textarea')
      textarea.value = rapportTexte
      textarea.style.position = 'fixed'
      textarea.style.left = '-9999px'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      
      alert(`Rapport copié!\n\nOuvrez Bloc-notes et collez avec Ctrl+V`)
    })
  }

  const generateCSV = () => {
    const csvContent = [
      'ID,Titre,Client,Type,Bien,Montant,Caution,Statut,Date début,Date fin,Prochain paiement',
      ...contracts.map(c => [
        c.id,
        '"' + c.title.replace(/"/g, '""') + '"',
        '"' + c.client.replace(/"/g, '""') + '"',
        c.type === 'location' ? 'Location' : 'Vente',
        '"' + c.property.replace(/"/g, '""') + '"',
        c.type === 'location' 
          ? c.monthlyRent?.toLocaleString() + ' FCFA/mois'
          : c.amount.toLocaleString() + ' FCFA',
        c.deposit ? c.deposit.toLocaleString() + ' FCFA' : 'N/A',
        getStatusText(c.status),
        new Date(c.startDate).toLocaleDateString('fr-FR'),
        c.endDate ? new Date(c.endDate).toLocaleDateString('fr-FR') : 'N/A',
        c.nextPayment ? new Date(c.nextPayment).toLocaleDateString('fr-FR') : 'N/A'
      ].join(','))
    ].join('\n')

    const BOM = '\uFEFF'
    const csvWithBOM = BOM + csvContent
    
    const blob = new Blob([csvWithBOM], { 
      type: 'application/vnd.ms-excel;charset=utf-8' 
    })
    
    const url = window.URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = `Rapport_Contrats_ImmoPro_${new Date().toISOString().split('T')[0]}.csv`
    link.style.display = 'none'
    
    link.setAttribute('download', link.download)
    
    document.body.appendChild(link)
    link.click()
    
    setTimeout(() => {
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    }, 100)
    
    setTimeout(() => {
      alert(`Fichier Excel téléchargé!\n\nNom: Rapport_Contrats_ImmoPro_${new Date().toISOString().split('T')[0]}.csv\n\nVérifiez votre dossier Téléchargements!`)
    }, 200)
  }

  const openPDFInNewTab = () => {
    // Créer le contenu HTML qui sera converti en PDF
    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Rapport des Contrats - ImmoPro</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            margin: 20px; 
            line-height: 1.4;
            color: #333;
        }
        .header { 
            text-align: center; 
            border-bottom: 3px solid #2563eb; 
            padding-bottom: 20px; 
            margin-bottom: 30px; 
        }
        .contract { 
            margin: 20px 0; 
            padding: 15px; 
            border: 1px solid #ddd; 
            border-radius: 5px; 
        }
        .contract h3 { 
            color: #2563eb; 
            margin-bottom: 10px; 
        }
        .stats { 
            background: #f8fafc; 
            padding: 20px; 
            border-radius: 5px; 
            margin: 20px 0; 
        }
        .footer { 
            margin-top: 40px; 
            padding-top: 20px; 
            border-top: 1px solid #ddd; 
            text-align: center; 
            font-size: 12px; 
            color: #666; 
        }
        @media print {
            body { margin: 10px; }
            .no-print { display: none; }
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>IMOPRO - RAPPORT DES CONTRATS</h1>
        <p>Date: ${new Date().toLocaleDateString('fr-FR')}</p>
        <p>Contact: contact@immopro.fr | 01 02 85 61 23</p>
    </div>

    <div class="stats">
        <h2>STATISTIQUES</h2>
        <p><strong>Total contrats:</strong> ${contracts.length}</p>
        <p><strong>Contrats actifs:</strong> ${contracts.filter(c => c.status === 'active').length}</p>
        <p><strong>En attente signature:</strong> ${contracts.filter(c => c.status === 'pending_signature').length}</p>
        <p><strong>Loyers mensuels totaux:</strong> ${contracts
          .filter(c => c.type === 'location' && c.status === 'active')
          .reduce((sum, c) => sum + (c.monthlyRent || 0), 0)
          .toLocaleString()} FCFA</p>
    </div>

    <h2>LISTE DES CONTRATS</h2>
    ${contracts.map((contract, index) => `
    <div class="contract">
        <h3>${index + 1}. ${contract.title}</h3>
        <p><strong>Numéro:</strong> ${contract.id}</p>
        <p><strong>Client:</strong> ${contract.client}</p>
        <p><strong>Bien:</strong> ${contract.property}</p>
        <p><strong>Type:</strong> ${contract.type === 'location' ? 'Location' : 'Vente'}</p>
        <p><strong>Montant:</strong> ${contract.type === 'location' 
          ? `${contract.monthlyRent?.toLocaleString()} FCFA/mois` 
          : `${contract.amount.toLocaleString()} FCFA`
        }</p>
        ${contract.deposit ? `<p><strong>Caution:</strong> ${contract.deposit.toLocaleString()} FCFA</p>` : ''}
        <p><strong>Date début:</strong> ${new Date(contract.startDate).toLocaleDateString('fr-FR')}</p>
        ${contract.endDate ? `<p><strong>Date fin:</strong> ${new Date(contract.endDate).toLocaleDateString('fr-FR')}</p>` : ''}
        <p><strong>Statut:</strong> ${getStatusText(contract.status)}</p>
        ${contract.signedAt ? `<p><strong>Signé le:</strong> ${new Date(contract.signedAt).toLocaleDateString('fr-FR')}</p>` : ''}
    </div>
    `).join('')}

    <div class="footer">
        <p><strong>ImmoPro - Plateforme Immobilière</strong></p>
        <p>Email: contact@immopro.fr | Téléphone: 01 02 85 61 23</p>
        <p>Généré le: ${new Date().toLocaleString('fr-FR')}</p>
    </div>
</body>
</html>
    `

    // Créer un Blob avec le contenu HTML
    const blob = new Blob([htmlContent], { 
      type: 'text/html;charset=utf-8' 
    })
    
    // Créer une URL pour le Blob
    const url = window.URL.createObjectURL(blob)
    
    // Ouvrir dans un nouvel onglet
    window.open(url, '_blank')
    
    // Nettoyer après 5 secondes
    setTimeout(() => {
      window.URL.revokeObjectURL(url)
    }, 5000)
    
    // Afficher confirmation
    alert(`PDF ouvert dans un nouvel onglet!\n\nVous pouvez l'imprimer avec Ctrl+P\nou le sauvegarder avec Ctrl+S`)
  }

  const generatePDF = (contract: Contract) => {
    // Créer le contenu du contrat au format PDF
    const contractContent = `
CONTRAT ${contract.type === 'location' ? 'DE LOCATION' : 'DE VENTE'}
=================================================

Numéro: ${contract.id}
Date: ${new Date().toLocaleDateString('fr-FR')}

CLIENT: ${contract.client}
BIEN: ${contract.property}
TYPE: ${contract.type === 'location' ? 'Location' : 'Vente'}

MONTANT: ${contract.type === 'location' 
  ? `${contract.monthlyRent?.toLocaleString()} FCFA/mois` 
  : `${contract.amount.toLocaleString()} FCFA`
}

${contract.deposit ? `CAUTION: ${contract.deposit.toLocaleString()} FCFA` : ''}

DATE DE DÉBUT: ${new Date(contract.startDate).toLocaleDateString('fr-FR')}
${contract.endDate ? `DATE DE FIN: ${new Date(contract.endDate).toLocaleDateString('fr-FR')}` : ''}

STATUT: ${getStatusText(contract.status)}
${contract.signedAt ? `SIGNÉ LE: ${new Date(contract.signedAt).toLocaleDateString('fr-FR')}` : ''}

=================================================
SIGNATURES
================================================_

Propriétaire: ___________________    Date: _________

Client: ${contract.client}         Date: _________

=================================================
ImmoPro - Plateforme Immobilière
contact@immopro.fr | 01 02 85 61 23
    `.trim()

    // Créer un Blob avec le type PDF
    const blob = new Blob([contractContent], { 
      type: 'application/pdf;charset=utf-8' 
    })
    
    // Créer une URL pour le téléchargement
    const url = window.URL.createObjectURL(blob)
    
    // Créer un lien de téléchargement forcé
    const link = document.createElement('a')
    link.href = url
    link.download = `Contrat_${contract.title.replace(/[^a-z0-9]/gi, '_')}_${new Date().toISOString().split('T')[0]}.pdf`
    link.style.display = 'none'
    
    // Forcer le téléchargement automatique
    link.setAttribute('download', link.download)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    // Nettoyer après 100ms
    setTimeout(() => {
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    }, 100)
    
    // Afficher confirmation simple
    setTimeout(() => {
      alert(`Contrat "${contract.title}" enregistré automatiquement!\n\nFichier PDF: Contrat_${contract.title.replace(/[^a-z0-9]/gi, '_')}_${new Date().toISOString().split('T')[0]}.pdf\n\nVérifiez votre dossier Téléchargements!`)
    }, 200)
  }

  const sendForSignature = (contract: Contract) => {
    setSelectedContract(contract)
    setShowSignatureModal(true)
  }

  const handleSignature = () => {
    if (selectedContract) {
      alert(`Contrat "${selectedContract.title}" envoyé pour signature électronique!`)
      setShowSignatureModal(false)
      setSelectedContract(null)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button 
                onClick={() => window.history.back()}
                className="mr-4 text-gray-600 hover:text-gray-900"
              >
                ← Retour
              </button>
              <h1 className="text-2xl font-bold text-gray-900">Gestion des Contrats</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => downloadPDFFile()}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Copier Rapport
              </button>
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition">
                + Nouveau Contrat
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('all')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition ${
                activeTab === 'all'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Tous les contrats ({contracts.length})
            </button>
            <button
              onClick={() => setActiveTab('location')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition ${
                activeTab === 'location'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Location ({contracts.filter(c => c.type === 'location').length})
            </button>
            <button
              onClick={() => setActiveTab('vente')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition ${
                activeTab === 'vente'
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Vente ({contracts.filter(c => c.type === 'vente').length})
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contrat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Montant
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Prochain paiement
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredContracts.map((contract) => (
                  <tr key={contract.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{contract.title}</div>
                        <div className="text-sm text-gray-500">{contract.property}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{contract.client}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        contract.type === 'location' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {contract.type === 'location' ? 'Location' : 'Vente'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {contract.type === 'location' 
                          ? `${contract.monthlyRent.toLocaleString()} FCFA/mois` 
                          : `${contract.amount.toLocaleString()} FCFA`
                        }
                      </div>
                      {contract.deposit && (
                        <div className="text-xs text-gray-500">Caution: {contract.deposit.toLocaleString()} FCFA</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(contract.status)}`}>
                        {getStatusText(contract.status)}
                      </span>
                      {contract.signedAt && (
                        <div className="text-xs text-gray-500 mt-1">
                          Signé le {new Date(contract.signedAt).toLocaleDateString('fr-FR')}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {contract.nextPayment ? (
                        <div className="text-sm text-gray-900">
                          {new Date(contract.nextPayment).toLocaleDateString('fr-FR')}
                        </div>
                      ) : (
                        <div className="text-sm text-gray-500">N/A</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => generatePDF(contract)}
                          className="text-purple-600 hover:text-purple-900"
                          title="Générer PDF"
                        >
                          📄
                        </button>
                        <button
                          onClick={() => sendForSignature(contract)}
                          className="text-blue-600 hover:text-blue-900"
                          title="Envoyer pour signature"
                        >
                          ✍️
                        </button>
                        <button
                          className="text-gray-600 hover:text-gray-900"
                          title="Voir détails"
                        >
                          👁️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-purple-100 rounded-lg p-3">
                <span className="text-purple-600 text-xl">📋</span>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">{contracts.length}</div>
                <div className="text-sm text-gray-500">Total contrats</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-green-100 rounded-lg p-3">
                <span className="text-green-600 text-xl">✅</span>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">
                  {contracts.filter(c => c.status === 'active').length}
                </div>
                <div className="text-sm text-gray-500">Contrats actifs</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-yellow-100 rounded-lg p-3">
                <span className="text-yellow-600 text-xl">⏰</span>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">
                  {contracts.filter(c => c.status === 'pending_signature').length}
                </div>
                <div className="text-sm text-gray-500">En attente signature</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0 bg-blue-100 rounded-lg p-3">
                <span className="text-blue-600 text-xl">💰</span>
              </div>
              <div className="ml-4">
                <div className="text-2xl font-bold text-gray-900">
                  {contracts
                    .filter(c => c.type === 'location' && c.status === 'active')
                    .reduce((sum, c) => sum + (c.monthlyRent || 0), 0)
                    .toLocaleString()} FCFA
                </div>
                <div className="text-sm text-gray-500">Loyers mensuels</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSignatureModal && selectedContract && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-lg bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Envoyer pour signature électronique
              </h3>
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-2">
                  Contrat: <span className="font-medium">{selectedContract.title}</span>
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  Client: <span className="font-medium">{selectedContract.client}</span>
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-xs text-blue-800">
                    📧 Un email sera envoyé au client pour signature électronique sécurisée
                  </p>
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowSignatureModal(false)}
                  className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
                >
                  Annuler
                </button>
                <button
                  onClick={handleSignature}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                  Envoyer pour signature
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}