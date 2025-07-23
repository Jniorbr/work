"use client"
import { use } from 'react'
import styles from './styles.module.scss'
import { RefreshCcw } from 'lucide-react'
import { OrderProps } from '@/lib/order.types'
import { Modalorder } from '../modal'
import { OrderContext } from '@/providers/order'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'


interface Props {
    orders: OrderProps[];
}

export function Orders({ orders }: Props) {
    
    const { isOpen, onRequestOpen } = use(OrderContext)
    const router = useRouter();

    async function handleDetailOrder(order_id: string){
        await onRequestOpen(order_id);
    }

    async function handleRefresh() {
        router.refresh();
        toast.success("Pedidos atualizados ! ")
    }

    return (
        <>
        <main className={styles.container}>

            <section className={styles.containerHeader}>
                <h1> Últimos pedidos </h1>
                <button onClick={handleRefresh}>
                    <RefreshCcw size={24} color='#FFF' />
                </button>
            </section>

            <section className={styles.listOrders}>
                {orders.length === 0 && (
                    <span className={styles.emptyItem}>
                        Nenhum pedido aberto .... Dale nesse pedidos !!
                    </span>
                )}

                {orders.map(order => (
                    <button
                        key={order.id}
                        className={styles.orderItem}
                        onClick={() => handleDetailOrder(order.id)}
                        >

                        <div className={styles.tag}></div>
                        <span>Mesa {order.table}</span>
                    </button>
                ))}
            </section>
        </main>
        
        { isOpen && <Modalorder/>}

        </>
    )
}