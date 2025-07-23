"use client";

import { ChangeEvent, useState } from 'react';
import styles from './styles.module.scss';
import { UploadCloud } from 'lucide-react'
import Image from 'next/image';
import { Button } from '@/app/dashboard/components/button';
import { api } from '@/services/api';
import { getCookieClient } from '@/lib/cookieClient';
import { toast } from 'sonner';
import { useRouter } from 'next/router';

interface CategoryProps {
    id: string;
    name: string;
}

interface Props {
    categories: CategoryProps[]
}

export function Form( {categories} : Props ) {
    const router = useRouter();
    const [image, setImage] = useState<File>()
    const [previewImage, setPreviewImage] = useState("")

    async function handleRegisterProduct(formdata:FormData) {
        
        const categoryIndex = formdata.get("category")
        const name = formdata.get("name")
        const price = formdata.get("price")
        const description = formdata.get("description")

        if(!name || !categoryIndex || !price || !description || !image){
            toast.warning("Preencha todos os campos!")
            return;
        }

        const data = new FormData();
        
        data.append("name", name)
        data.append("price", price)
        data.append("description", description)
        data.append("category_id", categories[Number(categoryIndex)].id)
        data.append("file", image)

        const token = getCookieClient();

        await api.post("product" , data , {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .catch((err)=>{
            toast.warning("Falha no registro")
        })

        toast.success("Registrado com sucesso")
        router.push("/dashboard")
    }

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            const image = e.target.files[0];

            if (image.type !== "image/jpeg" && image.type !== "image/png") {
                toast.warning("Formato proibido");
                return; 
            }

            setImage(image);
            setPreviewImage(URL.createObjectURL(image))

        }

    }

    return (
        <main className={styles.container}>
            <h1>Novo Produto</h1>

            <form className={styles.form} action={handleRegisterProduct}>

                <label className={styles.labelImage} >

                    <span>
                        <UploadCloud size={30} color='#FFF' />
                    </span>

                    <input
                        type='file'
                        accept='image/png, image/jpeg'
                        required
                        onChange={handleFile}
                    />

                    {previewImage && (
                        <Image
                            alt='Imagem preview'
                            src={previewImage}
                            className={styles.preview}
                            fill={true}
                            quality={100}
                            priority={true}
                        />
                    )}

                </label>

                <select name='category'>
                    {categories.map( (category, index) => (
                        <option key={category.id} value={index}>
                            {category.name}
                        </option>
                    )
                    )}
                </select>

                <input
                    type='text'
                    name='name'
                    placeholder='Digite o nome do produto...'
                    required
                    className={styles.input}
                />
                <input
                    type='text'
                    name='price'
                    placeholder='Digite o preço do produto...'
                    required
                    className={styles.input}
                />

                <textarea
                    className={styles.input}
                    placeholder='Descrição do produto...'
                    required
                    name='description'
                ></textarea>

                <Button name='Criar produto' />

            </form>
        </main>
    )
}