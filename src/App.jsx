
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
 
    const produkty = [
        { id: 1, nazwa: "Notes", cena: 12.50 },
        { id: 2, nazwa: "Długopis", cena: 3.20 },
        { id: 3, nazwa: "Plecak", cena: 89.00 },
        { id: 4, nazwa: "Kalkulator", cena: 45.90 },
        { id: 5, nazwa: "Zakreślacz", cena: 4.75 }
    ];

   
    const [koszyk, setKoszyk] = useState([]);

   
    const dodajDoKoszyka = (produkt) => {
        const istnieje = koszyk.some(
            (pozycja) => pozycja.id === produkt.id
        );

        let nowyKoszyk;
        if (istnieje) {
            nowyKoszyk = koszyk.map((pozycja) =>
                pozycja.id === produkt.id
                    ? { ...pozycja, ilosc: pozycja.ilosc + 1 }
                    : pozycja
            );
        } else {
            nowyKoszyk = [
                ...koszyk,
                { ...produkt, ilosc: 1 }
            ];
        }

        setKoszyk(nowyKoszyk);
        wyswietlKomunikat(nowyKoszyk);
    };   
    const usunZKoszyka = (id) => {
        const nowyKoszyk = koszyk.filter(
            (pozycja) => pozycja.id !== id
        );

        setKoszyk(nowyKoszyk);
        wyswietlKomunikat(nowyKoszyk);
    };

   
    const wyswietlKomunikat = (lista) => {
        const suma = lista.reduce(
            (suma, pozycja) =>
                suma + pozycja.cena * pozycja.ilosc,
            0
        );

        console.log(
            `Koszyk: ${lista.length} pozycji; suma: ${suma.toFixed(2)}`
        );
    };

   
    const sumaKoszyka = koszyk.reduce(
        (suma, pozycja) =>
            suma + pozycja.cena * pozycja.ilosc,
        0
    );

    return (
        <div className="container mt-4">
            <h2>Sklepik szkolny</h2>

          
            <div className="list-group mb-4">
                {produkty.map((produkt) => (
                    <div
                        className="list-group-item d-flex justify-content-between align-items-center"
                        key={produkt.id}
                    >
                        <span>
                            {produkt.nazwa} - {produkt.cena.toFixed(2)} zł
                        </span>

                        <button
                            className="btn btn-primary btn-sm"
                            onClick={() => dodajDoKoszyka(produkt)}
                        >
                            Do koszyka
                        </button>
                    </div>
                ))}
            </div>

           
            <h3>Koszyk ({koszyk.length} pozycji)</h3>
            {koszyk.length === 0 ? (
                <div className="alert alert-info">
                    Koszyk jest pusty
                </div>
            ) : (
                <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>Produkt</th>
                            <th>Ilość</th>
                            <th>Cena</th>
                            <th>Suma</th>
                            <th>Akcja</th>
                        </tr>
                    </thead>

                    <tbody>
                        {koszyk.map((pozycja) => (
                            <tr key={pozycja.id}>
                                <td>{pozycja.nazwa}</td>
                                 <td>{pozycja.ilosc}</td>
                                <td>{pozycja.cena.toFixed(2)} zł</td>
                                <td>
                                    {(pozycja.cena * pozycja.ilosc).toFixed(2)} zł
                                </td>
                                <td>
                                    <button
                                        className="btn btn-outline-danger btn-sm"
                                        onClick={() => usunZKoszyka(pozycja.id)}
                                    >
                                        Usuń
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

          
            <p>
                <strong>
                    Suma: {sumaKoszyka.toFixed(2)} zł
                </strong>
            </p>
        </div>
    );
}

export default App;
