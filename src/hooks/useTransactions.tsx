import {
	createContext,
	useEffect,
	useState,
	ReactNode,
	useContext,
} from 'react'
import { api } from '../services/api'

//DEFININDO TIPO DOS DADOS
interface Transaction {
	id: number
	title: string
	amount: number
	type: string
	category: string
	createdAt: string
}

interface TransactionInput {
	title: string
	amount: number
	type: string
	category: string
}

interface TransactionsProviderProps {
	children: ReactNode
}

interface TransactionsContextData {
	transactions: Transaction[]
	createTransaction: (transaction: TransactionInput) => Promise<void>
}

const TransactionsContext = createContext<TransactionsContextData>(
	{} as TransactionsContextData,
)

export function TransactionsProvider(props: TransactionsProviderProps) {
	const [transactions, setTransactions] = useState<Transaction[]>([])
	//API//
	useEffect(() => {
		api.get('transactions').then((response) =>
			setTransactions(response.data.transactions),
		)
	}, [])

	async function createTransaction(transactionInput: TransactionInput) {
		const response = await api.post('/transactions', {
			...transactionInput,
			createdAt: new Date(),
		})

		const { transaction } = response.data

		setTransactions([...transactions, transaction])
	}

	return (
		<TransactionsContext.Provider
			value={{ transactions, createTransaction }}
		>
			{props.children}
		</TransactionsContext.Provider>
	)
}

export function useTransactions() {
	const context = useContext(TransactionsContext)

	return context
}
