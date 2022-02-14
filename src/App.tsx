import { GlobalStyle } from './styles/global'
import Modal from 'react-modal'
import { Header } from './components/Header'
import { Dashboard } from './components/Dashboard'
import { useState } from 'react'
import { NewTransactionModal } from './components/NewTransactionModal'
import { TransactionsProvider } from './hooks/useTransactions'

//ACESSIBILIDADE
Modal.setAppElement('#root')
///////////////

export function App() {
	//ESTADO MODAL
	const [isNewTransactionModalOpen, setisNewTransactionModalOpen] =
		useState(false)

	//FUNCAO DE ABRIR MODAL
	function handleOpenNewTransactionModal() {
		setisNewTransactionModalOpen(true)
	}

	//FUNCAO DE FECHAR MODAL
	function handleCloseNewTransactionModal() {
		setisNewTransactionModalOpen(false)
	}

	return (
		<TransactionsProvider>
			<Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
			<Dashboard />
			<NewTransactionModal
				isOpen={isNewTransactionModalOpen}
				onRequestClose={handleCloseNewTransactionModal}
			/>
			<GlobalStyle />
		</TransactionsProvider>
	)
}
