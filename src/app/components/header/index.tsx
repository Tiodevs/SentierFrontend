"use client"

import Link from 'next/link'
import styles from './styles.module.scss'
import styless from './hamburgers.module.css'
import Image from 'next/image'

import { usePathname } from "next/navigation";
import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

export function Header() {
  const [isactive, setIsactive] = useState(false);

  // Verifica se a rota é ativa
  const pathname = usePathname(); // Pega a rota ativa
  const isActive = (path: string) => pathname === path;

  return (
    <motion.header className={styles.headerContainer}
      initial={{ opacity: 0, y: +100 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, delay: 0 }}
    >
      <div className={styles.headerContent}>
        <Link href="/attendence">
          <Image
            alt="Logo Sujeito Pizza"
            src={"/logo.svg"}
            width={116}
            height={70}
            priority={true}
            quality={100}
          />
        </Link>

        <button onClick={() => setIsactive(!isactive)} className={`${styless.hamburger} ${isactive ? styless.isactive : ""} ${styless.hamburgerspin} ${styles.btnnav}`}>
          <div className={styless.hamburgerbox}>
            <div className={styless.hamburgerinner}></div>
          </div>
        </button>


        <nav className={`${isactive ? styles.isactive : ""} ${styles.navmobi}`}>

          <Link className={isActive("/attendence") ? styles.active : styles.link} href="/">
            <p>Home</p>
          </Link>

          {/* <Link className={isActive("/projetos") ? styles.active : styles.link} href="/projetos">
            <p>Projetos</p>
          </Link> */}

          <Link className={isActive("/attendence") ? styles.active : styles.link} href="/contato">
            <p>Orçamento</p>
          </Link>
        </nav>

        <nav className={styles.nav}>
          <Link className={isActive("/attendence") ? styles.active : styles.link} href="/">
            <p>Home</p>
          </Link>

          {/* <Link className={isActive("/projetos") ? styles.active : styles.link} href="/projetos">
            <p>Projetos</p>
          </Link> */}

          {/* <Link className={isActive("/sobre") ? styles.active : styles.link} href="/sobre">
            <p>Sobre</p>
          </Link> */}


        </nav>

        <Link href="/contato" className={styles.btncontact}>
          <p className={styles.contact}>Orçamento</p>
        </Link>




      </div>
    </motion.header>
  )
}