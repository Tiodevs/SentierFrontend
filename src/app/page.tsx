'use client'

import styles from "./page.module.scss";
import { Header } from "./components/header";
// import { Head } from "./components/head";
import { useEffect, useState } from "react";
import { api } from "./services/api";
import { useRouter } from 'next/navigation';
import { InstagramIcon, Linkedin } from "lucide-react";

import { motion } from 'framer-motion';
// const { scrollYProgress } = useScroll()

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

                {/* <Head/> */}
                <Header /> : <></>

                <section
                    className={styles.header} >
                    <motion.div className={styles.headeresquerda}
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, delay: .5 }}
                    >

                        <h1>
                            Somos a Sentier <br />
                            soluções digitais
                        </h1>

                        <p>
                            Especialistas em impulsionar empresas rumo ao próximo nível, conectando marketing criativo e tecnologia de ponta.
                        </p>
                    </motion.div>
                    <motion.div className={styles.headerdireita}
                        initial={{ opacity: 0, x: +100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, delay: .5 }}
                    >

                        <p className={styles.headeremail}>sentiersm@gmail.com</p>
                        <p>entre em contato</p>
                    </motion.div>
                </section>

                <section className={styles.sectionprojetos}>
                    <motion.h2
                        initial={{ opacity: 0, y: +100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, delay: .5 }}
                    >Portifólio da Sentier</motion.h2>
                    <div className={styles.projetos}>
                        <motion.div className={styles.projeto}
                            initial={{ opacity: 0, y: +100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1, delay: .5 }}
                        >
                            <div className={styles.projetocapa}>
                                <Image
                                    alt="Logo Sujeito Pizza"

                                    src={"/projeto2.png"}
                                    width={700}
                                    height={420}
                                    priority={true}
                                    quality={100}
                                />
                            </div>

                            <div className={styles.projetotext}>
                                <p>Programação</p>
                                <h3>Plataforma de cursos</h3>
                            </div>
                        </motion.div>
                        <motion.div className={styles.projeto}
                            initial={{ opacity: 0, y: +100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1, delay: .7 }}
                        >
                            <div className={styles.projetocapa}>
                                <Image
                                    alt="Logo Sujeito Pizza"

                                    src={"/projeto01.png"}
                                    width={700}
                                    height={420}
                                    priority={true}
                                    quality={100}
                                />
                            </div>

                            <div className={styles.projetotext}>
                                <p>Programação</p>
                                <h3>Sistema de RH</h3>
                            </div>
                        </motion.div>
                        <motion.div className={styles.projeto}
                            initial={{ opacity: 0, y: +100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1, delay: .9 }}
                        >
                            <div className={styles.projetocapa}>
                                <Image
                                    alt="Logo Sujeito Pizza"

                                    src={"/projeto03.png"}
                                    width={700}
                                    height={420}
                                    priority={true}
                                    quality={100}
                                />
                            </div>

                            <div className={styles.projetotext}>
                                <p>Programação</p>
                                <h3>Carão de visita vitual</h3>
                            </div>
                        </motion.div>
                    </div>

                </section>


                <motion.section className={styles.section}>
                    <motion.h2
                        initial={{ opacity: 0, y: +100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, delay: .5 }}
                    >Serviços</motion.h2>

                    <motion.div className={styles.sectionmeio}
                        initial={{ opacity: 0, y: +100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, delay: .9 }}
                    >
                        <div className={styles.sectiontext}>
                            <h3>Sites web</h3>
                            <p>Site institucional / Landing page / Portifólio virtual / Sistema interno e etc.</p>
                        </div>

                        <div className={styles.sectiontext}>
                            <h3>Produção de conteúdo</h3>
                            <p>Posts para redes sociais / Fotos proficionais / Criação de vídeos /  e etc.</p>
                        </div>

                        <div className={styles.sectiontext}>
                            <h3>Tráfego pago</h3>
                            <p>Impulsionamos seu negócio com anúncios online</p>
                        </div>

                        <div className={styles.sectiontext}>
                            <h3>Análise de dados</h3>
                            <p>Criação de relatórios modernos usando Power BI</p>
                        </div>


                    </motion.div>

                    <motion.a href="/contato"
                        initial={{ opacity: 0, y: +100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1, delay: 1.3 }}
                    >Saiba mais</motion.a>
                </motion.section>



                <section className={styles.section}>
                    <motion.h2
                     initial={{ opacity: 0, y: +100 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0 }}
                     transition={{ duration: 1, delay: .5 }}
                    >História</motion.h2>

                    <motion.div className={styles.sectionmeio}
                    initial={{ opacity: 0, y: +100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, delay: .9 }}
                    >
                        <div className={styles.sectiontext}>
                            <p>A Sentier surgiu do sonho de dois amigos de infância, Felipe e William, de unir marketing e tecnologia em um único lugar. Notamos que muitas empresas precisavam contratar serviços separados para essas áreas, e decidimos simplificar esse processo.
                                <br /> <br />
                                Oferecemos soluções digitais completas que conectam criatividade e inovação tecnológica, ajudando nossos clientes a crescer e prosperar no mundo digital. A Sentier é fruto de muita dedicação e do nosso compromisso em transformar desafios em resultados.</p>
                        </div>

                        <Image
                            alt="Capa sobre nós"
                            src={"/capasobrenosfix.png"}
                            className={styles.img}
                            width={400}
                            height={1000}
                            priority={true}
                            quality={100}
                        />

                        <Image
                            alt="Capa sobre nós mobi"
                            className={styles.imgmob}
                            src={"/capasobrenosmob.svg"}
                            width={700}
                            height={420}
                            priority={true}
                            quality={100}
                        />


                    </motion.div>

                    <motion.a href="/contato"
                    initial={{ opacity: 0, y: +100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, delay: 1.3 }}
                    >Saiba mais</motion.a>
                </section>





                <section className={styles.section}>
                    <motion.h2
                    initial={{ opacity: 0, y: +100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, delay: .5 }}
                    >Etapas</motion.h2>

                    <motion.div className={styles.sectionmeio}
                    initial={{ opacity: 0, y: +100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, delay: .9 }}>
                        <div className={styles.sectiontext}>
                            <h3>01. Entender a necessidade</h3>
                            <p>Após o seu contato, vamos dedicar nosso tempo para entender os objetivos da sua empresa e como podemos ajudá-lo(a) a alcançá-los.</p>
                        </div>

                        <div className={styles.sectiontext}>
                            <h3>02. Encontrar o Plano Ideal</h3>
                            <p>Vamos te ajudar a encontrar um plano de que faça sentido para o momento atual da sua empresa.</p>
                        </div>

                        <div className={styles.sectiontext}>
                            <h3>03. Você no Próximo Nível</h3>
                            <p>Nesta etapa, a Sentier implementará as melhores soluções para alavancar os resultados da sua empresa.</p>
                        </div>

                        <div className={styles.sectiontext}>
                            <h3>04. Feedback e Resultados</h3>
                            <p>Apresentaremos os resultados obtidos, analisando o progresso e alinhando estratégias para futuras melhorias.</p>
                        </div>

                    </motion.div>

                    <motion.a href="/contato"
                    initial={{ opacity: 0, y: +100 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1, delay: 1.3 }}
                    >Saiba mais</motion.a>
                </section>

                <footer className={styles.footer}>
                    <div className={styles.footerDireita}>
                        <h3>
                            Nosso contato
                        </h3>
                        <p>
                            Mande email em <span> sentiersm@gmail.com</span>
                        </p>
                        <p>
                            Nosso número <span> (41)987208843</span>
                        </p>

                        <div className={styles.infoicons}>
                            <InstagramIcon size={27} color="#01DEB2" />
                            <Linkedin size={27} color="#01DEB2" />
                        </div>

                    </div>
                    <div className={styles.footerEsquerda}>
                        <p>© 2025 sentier</p>
                    </div>
                </footer>



            </main >
        </div >
    );
}
