'use client'

import styles from "./page.module.scss";
import { Header } from "../components/header";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { div, p } from "framer-motion/client";

interface Props {
    params: {
        userId: string
    }
}

export default function Project() {


    const [user, setUser] = useState<any>(null);
    const [leads, setLeads] = useState<any>([]);
    const [loading, setLoading] = useState(false);


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

    useEffect(() => {
        async function getUser() {
            try {
                const response = await api.get("http://localhost:3333/leads");

                setLeads(response.data);

                console.log("Leads", response.data)
            } catch (error) {
                console.error("Erro ao carregar o usuário:", error);
            }
        }

        getUser();

        setLoading(true)
    }, [])

    if (!loading) {
        return (
            <div className={styles.loaderContainer}>
                <div className={styles.loader}></div>
            </div>
        );
    }

    return (
        <div>
            <Header/>
            {leads.length > 0 ?(
                <div className={styles.leadsList}>
                    {leads.map((lead: any) => (
                <div key={lead.id} id={styles.lead}>
                    <h3>{lead.nome}</h3>
                    <p><strong>Número:</strong> {lead.numero}</p>
                    <p><strong>Mensagem:</strong> {lead.mensagem}</p>
                    <p><strong>Criado em:</strong> {new Date(lead.createdAt).toLocaleString()}</p>
                </div>
            ))}
                </div>
            ): (
                <p>Nelhum lead encontrado</p>
            )}
        
        </div >
    );
}
