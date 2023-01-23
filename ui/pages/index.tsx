import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function IndexPage() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next.js RabbitMQ Integration</title>
        <meta name="description" content="Learn forms with Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Next.js RabbitMQ Integration (VSCode Powerups)
        </h1>

        <div className={styles.grid}>
          <Link href="/rabbitmq-form" className={styles.card}>
            <h2>Form to Submit Rabbit Message &rarr;</h2>
            <p>
              Form to test server + client side debugging by sending messages to
              external applications via RabbitMQ.
            </p>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer">
          Built with Next.js | Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  );
}
