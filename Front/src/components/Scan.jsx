import { useState, useEffect } from "react";
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

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export default function Scan() {
  const [scan, setScan] = useState(false);
  const [logs, setLog] = useState([]);
  const [foods, setFoods] = useState({})
  const [categs, setCategs] = useState([])
  const [formAjout, setFormAjout] = useState({})
  const [show, setShow] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:3001/api/category").then((datas) => {
      setCategs(datas.data)
    })
  }, [])

  function addProduct(event) {
    event.preventDefault()
    const { category} = { ...formAjout }
    console.log(formAjout)
    const data = {
        category,
        name: foods?.data?.product?.product_name_fr,
        brandName: foods?.data?.product?.brands,
        nutriGrade: foods?.data?.product?.nutrition_grade_fr,
        image: foods?.data?.product?.image_front_small_url
    }
    // alert(category)
    let url = `http://localhost:3001/api/product`

    axios.post(url, data).then( data => {
        MySwal.fire({
            icon: 'success',
            title: data.data.message,
            footer: 'IPSSI - 2021',
            allowOutsideClick: false,
            showConfirmButton: false,
            timer: 900,
        });
    })
  }

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
    console.log(code)
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
                            <Row className="mt-2">
                                <Col md={3}>
                                    <Form.Label>Associez une catégorie</Form.Label>
                                    <Form onSubmit={(e) => addProduct(e)}>
                                        <Form.Select
                                            name="category"
                                            value={formAjout.category}
                                            onChange=
                                            {
                                                (e) => 
                                                {
                                                    let tmp = { ...formAjout }
                                                    tmp.category = e.target.value
                                                    setFormAjout(tmp)
                                                }
                                            }
                                        >
                                        {
                                            categs.map((categ) => 
                                            {
                                            return (
                                                <option key={categ._id} value={categ._id}>
                                                    {categ.name}
                                                </option>
                                            )
                                            })
                                        }
                                        </Form.Select>
                                            <Button variant="info" className="mt-3 text-left" type="submit">
                                                Enregistrer
                                            </Button>
                                    </Form>
                                </Col>
                            </Row>
                        </Container>
                    }
                </Col>
            </Row>
        </Container>

    </div>
);
}