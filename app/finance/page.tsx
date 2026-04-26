'use client'

import { useState } from 'react'

interface Transaction {
  id: number
  date: string
  type: 'revenu' | 'dépense'
  catégorie: 'loyer' | 'charges' | 'taxes' | 'maintenance' | 'autre'
  description: string
  montant: number
  contratId?: number
  client?: string
  statut: 'payé' | 'en_attente' | 'en_retard'
  mode: 'virement' | 'espèces' | 'chèque' | 'prélèvement'
}

interface Propriete {
  id: number
  nom: string
  adresse: string
  type: 'appartement' | 'maison' | 'studio' | 'local'
  loyerMensuel: number
  chargesMensuelles: number
  taxeFonciere: number
  assurance: number
  proprietaire: string
  statut: 'occupé' | 'libre' | 'en_travaux'
  locataire?: string
  dateDebut?: string
  dateFin?: string
}

export default function FinancePage() {
  const [activeTab, setActiveTab] = useState<'transactions' | 'rapports'>('transactions')
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().split('T')[0].slice(0, 7))
  const [showAddModal, setShowAddModal] = useState(false)

  // Données exemple
  const proprietes: Propriete[] = [
    {
      id: 1,
      nom: 'Appartement T3 Centre-Ville',
      adresse: 'Avenue du Général de Gaulle, 16001 Abidjan',
      type: 'appartement',
      loyerMensuel: 150000,
      chargesMensuelles: 25000,
      taxeFonciere: 1200000,
      assurance: 480000,
      proprietaire: 'Mohamed Benali',
      statut: 'occupé',
      locataire: 'Fatima Zahra',
      dateDebut: '2024-01-01',
      dateFin: '2024-12-31'
    },
    {
      id: 2,
      nom: 'Studio Meublé Centre-Ville',
      adresse: 'Rue Didouche Mourad, 16000 Abidjan',
      type: 'studio',
      loyerMensuel: 85000,
      chargesMensuelles: 15000,
      taxeFonciere: 800000,
      assurance: 320000,
      proprietaire: 'Mohamed Benali',
      statut: 'occupé',
      locataire: 'Yacine Boudiaf',
      dateDebut: '2023-06-01',
      dateFin: '2024-05-31'
    },
    {
      id: 3,
      nom: 'Villa avec Piscine',
      adresse: 'Boulevard des Martyrs, 16000 Abidjan',
      type: 'maison',
      loyerMensuel: 250000,
      chargesMensuelles: 45000,
      taxeFonciere: 2500000,
      assurance: 750000,
      proprietaire: 'Mohamed Benali',
      statut: 'libre'
    }
  ]

  const transactions: Transaction[] = [
    {
      id: 1,
      date: '2024-04-20',
      type: 'revenu',
      catégorie: 'loyer',
      description: 'Loyer Appartement T3 - Fatima Zahra',
      montant: 150000,
      contratId: 1,
      client: 'Fatima Zahra',
      statut: 'payé',
      mode: 'virement'
    },
    {
      id: 2,
      date: '2024-04-20',
      type: 'revenu',
      catégorie: 'loyer',
      description: 'Loyer Studio Centre-Ville - Yacine Boudiaf',
      montant: 85000,
      contratId: 2,
      client: 'Yacine Boudiaf',
      statut: 'payé',
      mode: 'virement'
    },
    {
      id: 3,
      date: '2024-04-15',
      type: 'dépense',
      catégorie: 'charges',
      description: 'Entretien climatisation Appartement T3',
      montant: 35000,
      contratId: 1,
      statut: 'payé',
      mode: 'chèque'
    },
    {
      id: 4,
      date: '2024-04-10',
      type: 'dépense',
      catégorie: 'maintenance',
      description: 'Réparation fuite Studio Centre-Ville',
      montant: 28000,
      contratId: 2,
      statut: 'payé',
      mode: 'espèces'
    },
    {
      id: 5,
      date: '2024-04-05',
      type: 'dépense',
      catégorie: 'taxes',
      description: 'Taxe foncière Q1 2024',
      montant: 300000,
      statut: 'payé',
      mode: 'prélèvement'
    }
  ]

  const calculateStats = () => {
    const totalRevenus = transactions
      .filter(t => t.type === 'revenu')
      .reduce((sum, t) => sum + t.montant, 0)
    
    const totalDepenses = transactions
      .filter(t => t.type === 'dépense')
      .reduce((sum, t) => sum + t.montant, 0)
    
    const totalLoyers = transactions
      .filter(t => t.catégorie === 'loyer')
      .reduce((sum, t) => sum + t.montant, 0)
    
    const totalCharges = transactions
      .filter(t => t.catégorie === 'charges')
      .reduce((sum, t) => sum + t.montant, 0)
    
    const beneficeNet = totalRevenus - totalDepenses
    
    return {
      totalRevenus,
      totalDepenses,
      totalLoyers,
      totalCharges,
      beneficeNet
    }
  }

  const stats = calculateStats()

  const getStatutColor = (statut: string) => {
    switch (statut) {
      case 'payé': return 'bg-green-100 text-green-800'
      case 'en_attente': return 'bg-yellow-100 text-yellow-800'
      case 'en_retard': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeColor = (type: string) => {
    return type === 'revenu' ? 'text-green-600' : 'text-red-600'
  }

  const getCategorieIcon = (catégorie: string) => {
    switch (catégorie) {
      case 'loyer': return '💰'
      case 'charges': return '🏠'
      case 'taxes': return '📋'
      case 'maintenance': return '🔧'
      default: return '📄'
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
              <h1 className="text-2xl font-bold text-gray-900">Suivi Financier</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowAddModal(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                + Ajouter Transaction
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                📊 Exporter Rapport
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('transactions')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition ${
                activeTab === 'transactions'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Transactions
            </button>
            <button
              onClick={() => setActiveTab('rapports')}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition ${
                activeTab === 'rapports'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Rapports
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Liste des Transactions */}
        {activeTab === 'transactions' && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">Transactions Récentes</h3>
                  <input
                    type="month"
                    value={selectedMonth}
                    onChange={(e) => setSelectedMonth(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Catégorie
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
                        Mode
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {transactions.map((transaction) => (
                      <tr key={transaction.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{new Date(transaction.date).toLocaleDateString('fr-FR')}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">{transaction.description}</div>
                          {transaction.client && (
                            <div className="text-xs text-gray-500">Client: {transaction.client}</div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="mr-2">{getCategorieIcon(transaction.catégorie)}</span>
                            <span className="text-sm text-gray-900">{transaction.catégorie}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`font-medium ${getTypeColor(transaction.type)}`}>
                            {transaction.type === 'revenu' ? 'Revenu' : 'Dépense'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className={`text-sm font-medium ${getTypeColor(transaction.type)}`}>
                            {transaction.montant.toLocaleString()} FCFA
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatutColor(transaction.statut)}`}>
                            {transaction.statut === 'payé' ? 'Payé' :
                             transaction.statut === 'en_attente' ? 'En attente' : 'En retard'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{transaction.mode}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Rapports Financiers */}
        {activeTab === 'rapports' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Rapport Mensuel */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Rapport Mensuel</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Revenus totaux:</span>
                    <span className="text-sm font-medium text-green-600">{stats.totalRevenus.toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Dépenses totales:</span>
                    <span className="text-sm font-medium text-red-600">{stats.totalDepenses.toLocaleString()} FCFA</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Bénéfice net:</span>
                    <span className="text-sm font-medium text-blue-600">{stats.beneficeNet.toLocaleString()} FCFA</span>
                  </div>
                </div>
                <button className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                  📊 Télécharger Rapport Complet
                </button>
              </div>

              {/* Performance des Propriétés */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Performance des Propriétés</h3>
                <div className="space-y-3">
                  {proprietes.map((propriete) => (
                    <div key={propriete.id} className="border-b border-gray-200 pb-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-900">{propriete.nom}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          propriete.statut === 'occupé' ? 'bg-green-100 text-green-800' :
                          propriete.statut === 'libre' ? 'bg-gray-100 text-gray-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {propriete.statut === 'occupé' ? 'Occupé' :
                           propriete.statut === 'libre' ? 'Libre' : 'En travaux'}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>Revenu mensuel: {(propriete.loyerMensuel + propriete.chargesMensuelles).toLocaleString()} FCFA</span>
                        <span>Taux de rentabilité: {propriete.statut === 'occupé' ? '8.5%' : '0%'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Graphiques et Statistiques Avancées */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Analyse Financière</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">{proprietes.filter(p => p.statut === 'occupé').length}</div>
                  <div className="text-sm text-gray-500">Propriétés Occupées</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-600">{proprietes.filter(p => p.statut === 'libre').length}</div>
                  <div className="text-sm text-gray-500">Propriétés Libres</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">{((stats.beneficeNet / stats.totalRevenus) * 100).toFixed(1)}%</div>
                  <div className="text-sm text-gray-500">Marge Bénéfice</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
