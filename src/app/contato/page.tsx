'use client'

import styles from "./page.module.scss";
import { Header } from "../components/header";
import { useEffect, useState } from "react";
import { api } from "../services/api";
import { useRouter } from 'next/navigation';

import Image from 'next/image'
import { Form } from "../components/form";

export default function Contato() {
    

    
    return (
        <div>
            <main className={styles.main}>
                
            <Header />
            
            <Form />
            </main >
        </div >
    );
}
