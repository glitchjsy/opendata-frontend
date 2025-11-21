import Layout from "@theme/Layout";
import clsx from "clsx";
import React from "react";
import styles from "./index.module.css";

interface FeatureItem {
    title: string;
    image: string;
    description: JSX.Element;
};

const features: FeatureItem[] = [
    {
        title: "Seamlessly integrate local data",
        image: "feature-1.png",
        description: (
            <>
                Access high-quality data on Jersey’s car parks, public services, and more through our robust and standardized API endpoints.
            </>
        ),
    },
    {
        title: "Have data to share?",
        image: "feature-2.png",
        description: (
            <>
                Got valuable Jersey-related data? Let us help make it accessible via our API. Get in touch <a href="mailto:luke@glitch.je">by email</a> to collaborate.
            </>
        ),
    },
    {
        title: "Want to improve our platform?",
        image: "feature-3.png",
        description: (
            <>
                Interested in contributing ideas or sponsoring the project? Reach out <a href="mailto:luke@glitch.je">by email</a> to help us enhance Jersey's open data platform.
            </>
        ),
    }
];

export default function Home(): JSX.Element {
    return (
        <Layout
            title="Home"
            description="Jersey Open Data"
        >
            <Header />

            <main>
                <section className={styles.features}>
                    <div className="container">
                        <div className="row">
                            {features.map((props, idx) => (
                                <Feature key={idx} {...props} />
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </Layout>
    );
}

function Header() {
    return (
        <header className={clsx("hero hero--primary", styles.heroBanner)}>
            <div className={clsx("container", styles.heroContainer)}>
                <h1 className={clsx("hero__title", styles.heroTitle)}>OpenData.je</h1>
                <p className={clsx("hero__subtitle", styles.heroSubtitle)}>
                    Providing you with the tools you need to create stunning apps, websites and more using local data.
                </p>
            </div>
        </header>
    );
}

function Feature({ title, image, description }: FeatureItem) {
    return (
        <div className="col col--4">
            <div className="text--center">
                <img className={styles.featureImage} src={`/img/home/${image}`} />
            </div>
            <div className="text--center padding-horiz--md">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>
        </div>
    );
}