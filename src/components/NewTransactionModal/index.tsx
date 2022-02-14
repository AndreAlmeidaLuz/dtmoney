import Modal from 'react-modal'
import incomeImg from '../../assets/income.svg'
import outcomeImg from '../../assets/outcome.svg'
import closeImg from '../../assets/close.svg'
import {
	Container,
	TransactionTypeContainer,
	RadioBox,
} from '../NewTransactionModal/styles'
import { FormEvent, useState } from 'react'
import { useTransactions } from '../../hooks/useTransactions'

interface NewTransactionModalProps {
	isOpen: boolean
	onRequestClose: () => void
}

export function NewTransactionModal({
	isOpen,
	onRequestClose,
}: NewTransactionModalProps) {
	const { createTransaction } = useTransactions()

	//estado para armazenar qual botao de entrada ou saida o usuario clicou:
	const [type, setType] = useState('deposit')
	const [title, setTitle] = useState('')
	const [amount, setAmount] = useState(0)
	const [category, setCategory] = useState('')

	//pegando valores digitados do formulario
	async function handleCreateNewTrasaction(event: FormEvent) {
		event.preventDefault()

		await createTransaction({
			title,
			amount,
			category,
			type,
		})

		//resentando os valores dos campos do modal para ficar em branco ao realizar um novo cadastro
		setTitle('')
		setAmount(0)
		setCategory('')
		setTitle('')
		setType('deposit')

		//Fechar o modal caso dê tudo certo
		onRequestClose()
	}

	return (
		<Modal
			isOpen={isOpen}
			onRequestClose={onRequestClose}
			overlayClassName="react-modal-overlay"
			className="react-modal-content"
		>
			<button
				type="button"
				onClick={onRequestClose}
				className="react-modal-close"
			>
				<img src={closeImg} alt="Close modal" />
			</button>

			<Container onSubmit={handleCreateNewTrasaction}>
				<h2>Cadastrar Transação</h2>

				<input
					placeholder="Título"
					value={title}
					onChange={(event) => setTitle(event.target.value)}
				/>
				<input
					type="number"
					placeholder="Valor"
					value={amount}
					onChange={(event) => setAmount(Number(event.target.value))}
				/>

				<TransactionTypeContainer>
					<RadioBox
						type="button"
						onClick={() => {
							setType('deposit')
						}}
						isActive={type === 'deposit'}
						activeColor="green"
					>
						<img src={incomeImg} alt="Entrada" />
						<span>Entrada</span>
					</RadioBox>
					<RadioBox
						type="button"
						onClick={() => {
							setType('withdraw')
						}}
						isActive={type === 'withdraw'}
						activeColor="red"
					>
						<img src={outcomeImg} alt="Saída" />
						<span>Saída</span>
					</RadioBox>
				</TransactionTypeContainer>

				<input
					placeholder="Categoria"
					value={category}
					onChange={(event) => setCategory(event.target.value)}
				/>

				<button type="submit">Cadastrar</button>
			</Container>
		</Modal>
	)
}