import { useState } from "react";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import axios from "axios"

import {
    Container,
    Row,
    Col,
    InputGroup,
    FormControl,
    Button,
    Card,
    Form,
    ListGroup,
    ListGroupItem
  } from "react-bootstrap"

export default function Scan() {
  const [scan, setScan] = useState(false);
  const [logs, setLog] = useState([]);
  const [foods, setFoods] = useState({})

  
  const barcodeScannerComponentHandleUpdate = (error, result) =>
   {
    if (result) 
    {
        setLog([...logs, result.text]);
        setScan(false);
    }
  };


  function getFood(code) {
    let url = `https://world.openfoodfacts.org/api/v0/product/${code}.json`

    axios.get(url).then( data => {
      console.log(data)
      setFoods(data)
    })
  }

  return (
    <div className="App">
        <Container>
            <Row className="mt-5">
                <Col md="6">
                    <h1>Scanner le code barre d'un produit</h1>
                    
                    <Button variant="info" onClick={() => {setScan(true); setLog([])}} >Scan Bar Code</Button> {' '}
                    <Button variant="warning" onClick={() => setScan(false)} >Cancel</Button> {' '}
                    {
                        scan && (
                                    <div className="w-full h-12">
                                        <BarcodeScannerComponent
                                            width={500}
                                            height={500}
                                        onUpdate={barcodeScannerComponentHandleUpdate}
                                        />
                                    </div>
                                )
                    }
                    <div>
                    {
                    logs.map(
                        (log) => /*(
                                    <div key={log}>
                                        <h1>{log}</h1>
                                    </div>
                                )*/
                                {
                                    getFood(log)
                                }
                            )
                    }
                    <hr />
                    </div>
                    {
                        foods.hasOwnProperty('data') && 
                        <Container className="mt-3 text-center">
                            <Card style={{ width: '13rem' }}>
                                <Card.Body>
                                <Card.Img variant="top" style={{ width: '50px', height: '100px' }} src={foods?.data?.product?.image_front_small_url} />
                                <ListGroup className="list-group-flush">
                                <ListGroupItem><span className="text-dark" >{foods?.data?.product?.brands}</span></ListGroupItem>
                                <ListGroupItem><span>{foods?.data?.product?.generic_name_fr}</span></ListGroupItem>
                                <ListGroupItem><span>{foods?.data?.product?.product_name_fr}</span></ListGroupItem>
                                <ListGroupItem><span>{foods?.data?.product?.id}</span></ListGroupItem>
                                <ListGroupItem><span>Nutrigrade : {(foods?.data?.product?.nutrition_grade_fr.toUpperCase())}</span></ListGroupItem>
                                </ListGroup>
                                </Card.Body>
                            </Card>
                        </Container>
                    }
                </Col>
            </Row>
        </Container>

    </div>
);
}