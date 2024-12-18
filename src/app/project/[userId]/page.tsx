'use client'

import styles from "./page.module.scss";
import { Header } from "../../components/header";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useRouter } from 'next/navigation';

import { Form } from "../../components/form";

interface Props {
    params: {
        userId: string
    }
}

export default function Project({ params }: Props) {

    const decodedId = decodeURIComponent(params.userId as string).trim()

    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [album, setAlbum] = useState<any>([]);

    const router = useRouter();

    useEffect(() => {
        async function getUser() {
            try {
                const response = await api.get("/users");

                setUser(response.data[0]);
                const album = response.data[0].album

                const albumfilter = album.filter((item: any) => item.id === decodedId)
                console.log(album)
                console.log("album atual", albumfilter[0])
                setAlbum(albumfilter[0])
            } catch (error) {
                console.error("Erro ao carregar o usuário:", error);
            }
        }

        getUser();

        setLoading(true)
    }, [])

    const handleClick = (id: string) => {
        router.push(`/${id}`); // Redireciona para a rota dinâmica
    };

    if (!loading) {
        return (
            <div className={styles.loaderContainer}>
                <div className={styles.loader}></div> {/* Loader giratório */}
            </div>
        );
    }

    return (
        <div>
            <main className={styles.main}>
                {loading ? user && <Header /> : <></>}

                {loading ? user && <div className={styles.content}>

                    <div className={styles.infosprojct}>
                        <img src={album.campamini} className={styles.capaproject} />
                        <div>
                            <h2>{album.titulo}</h2>
                            <p>{album.description}</p>
                        </div>
                    </div>
                    <div className={styles.capas}>
                        <div className={styles.capasitens}>
                            {album.fotos.map((item: any) => <div className={styles.project}>
                                <img src={item.foto} className={styles.imgfotos} />
                            </div>)}
                        </div>
                    </div>

                    <Form />
                </div> : <></>}
            </main >
        </div >
    );
}
