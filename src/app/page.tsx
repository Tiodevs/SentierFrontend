'use client'

import styles from "./page.module.scss";
import { Header } from "./components/header";
import { useEffect, useState } from "react";
import { api } from "./services/api";
import { useRouter } from 'next/navigation';

import Image from 'next/image'

export default function Home() {

    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    useEffect(() => {
        async function getUser() {
            try {
                const response = await api.get("/users");

                setUser(response.data[0]);
                console.log(response.data[0])
            } catch (error) {
                console.error("Erro ao carregar o usuário:", error);
            }
        }

        getUser();

        setLoading(true)
    }, [])

    const handleClick = (id: string) => {
        router.push(`/project/${id}`); // Redireciona para a rota dinâmica
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
            <Header /> : <></>

                <section className={styles.header}>
                    <div className={styles.headeresquerda}>
                        <h1>
                            Somos a Sentier <br />
                            soluções digitais
                        </h1>
                        <p>
                            Somos especializados em criar sistemas digitais para ajudar nossos clientes a atingir seus objetivos de negócios em tecnologia e marketing.
                        </p>
                    </div>
                    <div className={styles.headerdireita}>

                        <p className={styles.headeremail}>sentier@contact.com</p>
                        <p>entre em contato</p>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2>Serviços</h2>

                    <div className={styles.sectionmeio}>
                        <div className={styles.sectiontext}>
                            <h3>Sites web</h3>
                            <p>Site institucional / Landing page / Portifólio virtual / Sistema interno e etc.</p>
                        </div>

                        <div className={styles.sectiontext}>
                            <h3>Branding (Identidade visual)</h3>
                            <p>Logo / Guia de marca / Estrategia de marca e etc.</p>
                        </div>

                        <div className={styles.sectiontext}>
                            <h3>Produção de conteúdo</h3>
                            <p>Fotos proficionais / Criação de vídeos / Posts para redes sociais e etc.</p>
                        </div>

                        <div className={styles.sectiontext}>
                            <h3>Tráfego pago</h3>
                            <p>Impulsionamos seu negócio com anúncios online</p>
                        </div>


                    </div>

                    <a href="/contato">Saiba mais</a>
                </section>

                <section className={styles.section}>
                    <h2>História</h2>

                    <div className={styles.sectionmeio}>
                        <div className={styles.sectiontext}>
                            <p>A empresa começou com uma amizade de infância do Felipe Santos e o William Meneses, aos 13 anos de idade os dois começaram a jogar e gravar vídeos para o Youtube juntos, eles estudaram na mesma sala por 5 anos e tambem iam a igreja juntos. Com o passar do tempo ambos se desenvolveram, o Felipe estudou programação e o William marketing, então com 22 anos os dois decidiram criar uma empresa especializada em soluções digitais.</p>
                        </div>

                        <Image
                            alt="Logo Sujeito Pizza"
                            src={"/capasobrenos.png"}
                            className={styles.img}
                            width={400}
                            height={1000}
                            priority={true}
                            quality={100}
                        />

                        <Image
                            alt="Logo Sujeito Pizza"
                            className={styles.imgmob}
                            src={"/capasobrenosmob.svg"}
                            width={700}
                            height={420}
                            priority={true}
                            quality={100}
                        />


                    </div>

                    <a href="/contato">Saiba mais</a>
                </section>

                <section className={styles.section}>
                    <h2>Processos</h2>

                    <div className={styles.sectionmeio}>
                        <div className={styles.sectiontext}>
                            <h3>01 Entender a necessidade</h3>
                            <p>We delve deep into understanding your brand, target audience, and objectives, unraveling the insights that will shape our creative journey.</p>
                        </div>

                        <div className={styles.sectiontext}>
                            <h3>02 Protótipo</h3>
                            <p>Armed with insights, our design experts bring concepts to life, seamlessly blending aesthetics and functionality for a and user-centric.</p>
                        </div>

                        <div className={styles.sectiontext}>
                            <h3>03 Feedback</h3>
                            <p>We iterate tirelessly, refining our designs based on feedback, ensuring every pixel and interaction aligns perfectly with your brand identity and user.</p>
                        </div>

                        <div className={styles.sectiontext}>
                            <h3>04 Entrega do projeto</h3>
                            <p>The culmination of our collaborative efforts results in the delivery of a polished, cohesive digital experience that not only meets but your expectations.</p>
                        </div>

                    </div>

                    <a href="/contato">Saiba mais</a>
                </section>

            </main >
        </div >
    );
}
