"use client"

import { useState } from 'react';
import styles from './styles.module.scss'
import { InstagramIcon, Linkedin } from "lucide-react";
import axios from 'axios';
import { h1 } from 'framer-motion/client';


export function Form() {

  const [nome, setNome] = useState("")
  const [numero, setNumero] = useState("")
  const [mensagem, setMensagem] = useState("")
  const [returnForm, setReturnForm] = useState("")
  const [enviado, setEnviado] = useState(false)



  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setEnviado(true)

    try{
      const response = await axios.post("http://localhost:3333/leads", {
        nome,
        numero,
        mensagem
      })

      setNome('')
      setNumero('')
      setMensagem('')

      setReturnForm("Formulario enviado com sucesso :D")

    } catch (error){
      console.error(error);
      setReturnForm("Erro ao enviar o formulário, tente novamente...")
    } finally{
      setEnviado(false);
    }
  }


  return (
    <div className={styles.mensagem}>

      <div className={styles.formcontent}>
        <div className={styles.infoform}>
          <div className={styles.contntinfo}>

            <h1>Contato</h1>

            <div className={styles.infoemail}>
              <p>Mande um email em <span>sentier@gmail.com</span></p>
              <p>Faça agora o seu <span>orçamento</span></p>
            </div>

            <div className={styles.infoicons}>
              <Linkedin size={27} color="#01DEB2" />
              <InstagramIcon size={27} color="#01DEB2" />
            </div>

          </div>

          <p className={styles.copy}>© 2024 Sentier</p>


        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <p>Nome</p>
            <input type="text" value={nome} required onChange={(e) => setNome(e.target.value)} />
          </div>
          <div>
            <p>Número</p>
            <input type="text" value={numero} required onChange={(e) => setNumero(e.target.value)}/>
          </div>
          <div>
            <p>O que você precisa?</p>
            <textarea name="" id="" value={mensagem} required onChange={(e) => setMensagem(e.target.value)}></textarea>
          </div>

          <button type="submit" disabled={enviado}>
            {enviado ? 'Enviando...' : "Enviar"}
          </button>

          {returnForm !== "" ? <p>{returnForm}</p> : <></>}
        </form>
      </div>

    </div>
  )
}