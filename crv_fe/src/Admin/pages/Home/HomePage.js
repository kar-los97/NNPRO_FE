import React from "react";
import Section from "../../../Components/Section";
import {rightCheck} from "../../RightCheck";

const HomePage = () => {
    return (
        <Section title={"DOMŮ"} description={"Domovská stránka"}>
            {rightCheck("ROLE_Admin") &&
                <div className={"text-xl"}>
                    Právě se nacházíte v administrátorském módu CRV infromačního systému.<br/>
                    Jste administrátor a jsou Vám umožněny všechny tyto operace v systému:
                    <ul className={"list-disc ml-6"}>
                        <li>
                            Všechny operace s auty
                        </li>
                        <li>
                            Všechny operace s majiteli
                        </li>
                        <li>
                            Všechny operace s pobočkami
                        </li>
                        <li>
                            Všechny operace s uživateli
                        </li>
                    </ul>
                </div>}
            {rightCheck("ROLE_Kraj") &&
                <div className={"text-xl"}>
                    Právě se nacházíte v krajském módu CRV infromačního systému.<br/>
                    Jste krajský pracovník a jsou Vám umožněny všechny tyto operace v systému:
                    <ul className={"list-disc ml-6"}>
                        <li>
                            Zobrazení aut, ověření vozidla v EU registru kradených vozů
                        </li>
                        <li>
                            Zobrazení majitelů
                        </li>
                        <li>
                            Zobrazení poboček
                        </li>
                        <li>
                            Zobrazení uživatelů
                        </li>
                    </ul>
                </div>}
            {rightCheck("ROLE_Okres") &&
                <div className={"text-xl"}>
                    Právě se nacházíte v okresním módu CRV infromačního systému.<br/>
                    Jste okresní pracovník a jsou Vám umožněny všechny tyto operace v systému:
                    <ul className={"list-disc ml-6"}>
                        <li>
                            Všechny operace s auty v rámci pobočky
                        </li>
                        <li>
                            Všechny operace s majiteli v rámci pobočky
                        </li>
                        <li>
                            Všechny operace s uživateli v rámci pobočky
                        </li>
                    </ul>
                </div>}
        </Section>
    );
}
export default HomePage;