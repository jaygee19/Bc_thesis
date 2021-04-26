import React, { Component } from 'react'
import Navigation from './Navigation';


class Home extends Component {

    render() {
        return (
            <div>
                <Navigation />
                <div className="container" style={{ color: 'white' }}>
                    <p></p>
                    <h1 className="title-margin"> Princípy operačných systémov </h1>
                    <hr />
                    <div className="row">
                        <div className="col">
                            <h3> Hodnotenie predmetu: </h3>
                            <p>Z predmetu je možné získať <u>200 bodov</u>.</p>
                                <p><b>Cvičenia</b></p>
                                <p>
                                    V rámci cvičení môže študent získať <u>100 bodov</u> (minimálne <u><i>61 bodov</i></u>).
                                </p>
                                <p>
                                    V prípade mimoriadnej aktivity môže cvičiaci udeliť študentovi aj bonusové body.
                                </p>
                                
                                <p><b>Skúška</b></p>
                                <p>
                                    Na skúške môže študent získať ďalších <u>100 bodov</u> (minimálne <u><i>61 bodov</i></u>).
                                </p>
                                <p>
                                    Každé zadanie, ktoré študent odovzdá, sa testuje na jedinečnosť.
                                </p>
                                <hr />
                        </div>

                        <div className="col">
                        <h3> Hodnotenie cvičení: </h3>
                            <table className="table_points table table-sm">
                                <thead style={{ background: 'white' }}>
                                    <tr>
                                        <th scope="col">Aktivita</th>
                                        <th scope="col">Maximálne (body)</th>
                                        <th scope="col">Minimálne (body)</th>
                                        <th scope="col-1">Týždeň</th>
                                    </tr>
                                </thead>
                                <tbody style={{ background: '#ffe6cc' }}>
                                    <tr>
                                        <td>Práca na cvičeniach</td>
                                        <td>10</td>
                                        <td>0</td>
                                        <td>priebežne</td>
                                    </tr>
                                    <tr>
                                        <td>Písomka LINUX</td>
                                        <td>10</td>
                                        <td>2</td>
                                        <td>5. / 6.</td>
                                    </tr>
                                    <tr>
                                        <td>Programátorska písomka</td>
                                        <td>30</td>
                                        <td>18</td>
                                        <td>11.</td>
                                    </tr>
                                    <tr>
                                        <td>Semestrálna práca</td>
                                        <td>50</td>
                                        <td>31</td>
                                        <td>12.</td>
                                    </tr>
                                    <tr style={{ background: '#ffcccc' }}>
                                        <td><b>Spolu</b></td>
                                        <td><b>100</b></td>
                                        <td><b>61</b></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home;