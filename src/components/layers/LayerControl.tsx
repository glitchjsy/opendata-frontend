import React from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

interface SubOptionSection {
    title: string;
    options: SubOption[];
}

interface SubOption {
    label: string;
    value: string;
    isChecked: boolean;
    toggle: () => void;
}

interface LayerControlProps {
    label: string;
    isVisible: boolean;
    toggleVisibility: () => void;
    subOptions?: SubOptionSection[];
}

export default function LayerControl(props: LayerControlProps) {
    return (
        <div className={styles.layerControl}>
            <label className={styles.checkboxGroup}>
                {props.label}
                <input type="checkbox" checked={props.isVisible} onChange={props.toggleVisibility} />
                <span className={styles.checkmark}></span>
            </label>

            {props.isVisible && props.subOptions?.length > 0 && (
                <div className={styles.subOptions}>
                    {props.subOptions.map((section) => (
                        <div className={styles.subOptionSection}>
                            <p className={styles.subOptionSectionTitle}>{section.title}</p>

                            <div className={styles.subOptionOptions}>
                                {section.options.map((option) => (
                                    <label key={option.value} className={clsx(styles.checkboxGroup, styles.subOptionGroup)}>
                                        {option.label}
                                        <input
                                            type="checkbox"
                                            checked={option.isChecked}
                                            onChange={option.toggle}
                                        />
                                        <span className={styles.checkmark}></span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}