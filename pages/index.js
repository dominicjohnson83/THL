import { motion } from 'framer-motion';
import styles from '../styles/Home.module.css';
import Head from 'next/head';
import Image from 'next/image';
import ImageCarousel from '../components/ImageCarousel';
import { useState } from 'react';

export default function Home() {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className={styles.container}>
      <Head>
        <title>THL - Tourism Holdings Limited</title>
        <meta name="description" content="Experience the complete RV journey with THL - from design and manufacturing to sales, rentals, and service" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <nav className={styles.nav}>
        <div className={styles.logo}>
          <Image
            src="/images/thl-logo-master.png"
            alt="THL Logo"
            width={170}
            height={82}
            priority
          />
        </div>
        <div className={styles.navLinks}>
          <a href="#about">About Us</a>
          <a href="#businesses">Businesses</a>
          <a href="#investors">Investors</a>
          <a href="#news">News</a>
          <a href="#work">Work for Us</a>
          <a href="#partners">Partners</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <main className={styles.main}>
        <ImageCarousel />
        
        <section className={styles.content}>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to Tourism Holdings Limited
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Experience the complete RV journey with THL - from design and manufacturing to sales, rentals, and service
          </motion.p>
        </section>
      </main>

      {/* Chatbot */}
      {showChat ? (
        <div className={styles.chatbotContainer}>
          <div className={styles.chatHeader}>
            <span>Chat with THL</span>
            <button 
              onClick={() => setShowChat(false)}
              className={styles.closeButton}
            >
              ×
            </button>
          </div>
          <iframe 
            src="https://copilotstudio.microsoft.com/environments/Default-e1861c85-3a1d-4ba7-8d7d-1c5536d73ddc/bots/cr0d5_thlHunter/webchat?__version__=2"
            frameBorder="0"
            title="THL Hunter Chatbot"
            allow="microphone"
            className={styles.chatbotFrame}
          />
        </div>
      ) : (
        <button 
          className={styles.chatButton}
          onClick={() => setShowChat(true)}
        >
          Chat with Us
        </button>
      )}
    </div>
  );
} 