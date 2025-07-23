"use client"
import styles from './styles.module.scss'
import { X } from 'lucide-react'
import { use } from 'react'
import { OrderContext } from '@/providers/order'

export function Modalorder() {

    const { onRequestClose, order, finishOrder } = use(OrderContext);

    async function handleFinishOrder() {
        await finishOrder(order[0].order_id)
    }

    return (
        <dialog className={styles.dialogContainer} >

            <section className={styles.dialogContent} >
                <button className={styles.dialogBack} onClick={onRequestClose}>
                    <X size={40} color='#a52a2a' />
                </button>
                <article className={styles.container}>
                    <h2> Detalhes pedido</h2>

                    <span className={styles.table} >
                        Mesa <b>{order[0].order.table}</b>
                    </span>
                    {order[0].order?.name && (
                        <span className={styles.name} >
                            Nome: <b>{order[0].order.name}</b>
                        </span>)}



                    {order.map(item => (
                        <section className={styles.item} key={item.id}>
                            <img
                            src={`http://localhost:3333/files/${item.product.banner}`}
                            width={80}
                            height={80}
                            />
                            <span> {item.amount} - <b>{item.product.name}</b> </span>
                            <span className={styles.description}>
                                {item.product.description}
                            </span>
                        </section>))}

                    <button className={styles.buttonOrder} onClick={handleFinishOrder}>
                        Finalizar pedido
                    </button>

                </article>

            </section>
        </dialog>
    )
}