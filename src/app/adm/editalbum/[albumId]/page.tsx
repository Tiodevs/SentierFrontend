'use client'

import Image from "next/image";
import styles from './page.module.scss';
import { api } from "../../../services/api";
import { useRouter } from 'next/navigation'; // Importa o hook useRouter
import { useState, ChangeEvent, FormEvent, useEffect } from "react";

interface Props {
    params: {
        albumId: string
    }
}

interface Album {
    id: string;
    titulo: string;
    description: string;
}

export default function CreateAlbum({ params }: Props) {

    const decodedId = decodeURIComponent(params.albumId as string).trim()

    const [album, setAlbum] = useState<Album>({
        id: '',
        titulo: '',
        description: '',
    });

    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter(); // Inicializa o router

    useEffect(() => {
        async function getUser() {
            try {
                const response = await api.get("/users");

                const albuns = response.data[0].album.filter((item:any) => item.id === decodedId)
                
                if (albuns.length > 0) {
                    setAlbum(albuns[0]); // Define o álbum no estado
                }
            } catch (error) {
                console.error("Erro ao carregar o usuário:", error);
            }
        }

        getUser();
    }, [decodedId])

    async function handleRegister(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
    
        try {
            // Utilize os valores do estado `album` corretamente
            const { titulo, description } = album;

            const response = await api.put("/album", {
                albumId: decodedId,
                titulo,
                description,
            });

            console.log("Álbum atualizado:", response.data);

            // Redireciona para a página de administração após o sucesso
            router.push("/adm");
        } catch (err) {
            console.error("Erro ao registrar:", err);
        } finally {
            setLoading(false);
        }
    }

    function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setAlbum((prevAlbum) => ({
            ...prevAlbum,
            [name]: value,
        }));
    }

    return (
        <div className={styles.containerCenter}>
            <Image
                src={"/logo.svg"}
                alt="Logo da empresa"
                className={styles.logo}
                width={700}
                height={80}
            />

            <section className={styles.login}>
                <form onSubmit={handleRegister}>
                    <input
                        type="text"
                        name="titulo"
                        placeholder="Titulo"
                        className={styles.input}
                        value={album.titulo}
                        onChange={handleInputChange}
                        required
                    />

                    <input
                        type="text"
                        name="description"
                        placeholder="Descrição"
                        className={styles.input}
                        value={album.description}
                        onChange={handleInputChange}
                        required
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Carregando..." : "Enviar"}
                    </button>
                </form>
            </section>
        </div>
    );
}
