import axios from 'axios'
import { useState, useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'

interface IPalletSearch {
  palletID: string,
  releasedFromStock: boolean,
  note: string,
  storageLocation: string,
  enteredBy: string,
}

export default function Search() {
  const [allPallets, setAllPallets] = useState<IPalletSearch[]>()


  useEffect(() => {
    axios.get('http://localhost:5000/search')
      .then(result => {
        console.log(result.data)
        setAllPallets(result.data)
      })
  }, [])

  return (
    <Container>
      {allPallets
        ? allPallets.map(pallet => {
          console.log(pallet)
          return (

            <div className="mt-3" style={{background: "lightgreen"}}>
              <p>Pallet ID: {pallet.palletID}</p>
              <p>Released from stock: {pallet.releasedFromStock}</p>
              <p>Note: {pallet.note}</p>
              <p>Storage Location: {pallet.storageLocation}</p>
              <p>Entered By: {pallet.enteredBy}</p>
            </div>
          )
        })
        : "No Pallets saved"}
    </Container>
  )
};
