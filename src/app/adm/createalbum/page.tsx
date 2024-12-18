'use client'

import Image from "next/image";
import styles from './page.module.scss';
import { api } from "../../services/api";
import { useRouter } from 'next/navigation'; // Importa o hook useRouter
import { useState, ChangeEvent, FormEvent } from "react";

export default function CreateAlbum() {
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
    
            const response = await api.get("/users");
    
            if (!response || !response.data || response.data.length === 0) {
                console.error("Usuário não encontrado");
                setLoading(false);
                return;
            }
    
            const userId = response.data[0].id;
            formData.append("userId", userId);
    
            if (image) {
                formData.append("campamini", image); // Adiciona a imagem
            }
    
            const albumResponse = await api.post("/album", formData, {
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
                    <input
                        type="text"
                        name="titulo"
                        placeholder="Titulo"
                        className={styles.input}
                        required
                    />

                    <input
                        type="text"
                        name="description"
                        placeholder="Descrição"
                        className={styles.input}
                        required
                    />

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
