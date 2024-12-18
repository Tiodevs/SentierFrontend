'use client'

import Image from "next/image";
import styles from './page.module.scss';
import { api } from "../../../services/api";
import { useRouter } from 'next/navigation'; // Importa o hook useRouter
import { useState, ChangeEvent, FormEvent } from "react";

interface Props {
    params: {
        albumId: string
    }
}

export default function AddPhoto({ params }: Props) {

    const decodedId = decodeURIComponent(params.albumId as string).trim()

    console.log(decodedId)

    const [image, setImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState("");
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter(); // Inicializa o router

    async function handleRegister(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
    
        try {
            const form = e.currentTarget;
            const formData = new FormData(form);
    
            if (image) {
                formData.append("foto", image); // Adiciona a imagem
            }

            if (decodedId) {
                formData.append("albumId", decodedId); // Adiciona a imagem
            }
    
            const albumResponse = await api.post("/foto", formData, {
                headers: { "Content-Type": "multipart/form-data" }
            });
    
            console.log("Álbum criado:", albumResponse.data);
            // Redireciona para /adm após a criação bem-sucedida
            router.push("/adm");
        } catch (err) {
            console.error("Erro ao registrar:", err);
        } finally {
            setLoading(false);
        }
    }

    function handleFile(e: ChangeEvent<HTMLInputElement>) {
        if (e.target.files && e.target.files[0]) {
            const selectedImage = e.target.files[0];

            if (selectedImage.type !== "image/jpeg" && selectedImage.type !== "image/png") {
                console.error("Formato de imagem inválido");
                return;
            }

            setImage(selectedImage);
            setPreviewImage(URL.createObjectURL(selectedImage));
        }
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

                    <label className={styles.labelImage}>
                        <p>Escolha uma foto: <br /></p>
                        <input
                            type="file"
                            accept="image/png, image/jpeg"
                            name="photourl"
                            onChange={handleFile}
                            required
                        />
                    </label>

                    <button type="submit" disabled={loading}>
                        {loading ? "Carregando..." : "Enviar"}
                    </button>
                </form>
            </section>
        </div>
    );
}
