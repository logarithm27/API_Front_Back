import { React, useState, useEffect } from "react"

//import BarcodeScannerComponent from "react-qr-barcode-scanner";

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

export default function Home() {
  const [code, setCode] = useState('3274080005003')
  const [foods, setFoods] = useState({})
  const [formAjout, setFormAjout] = useState({})
  const [categs, setCategs] = useState([])
  //const [camView, setCamView] = useState("user");


  useEffect(() => {
    axios.get("http://localhost:3001/api/category").then((datas) => {
      setCategs(datas.data)
    })
  }, [])


  function getFood() {
    let url = `https://world.openfoodfacts.org/api/v0/product/${code}.json`

    axios.get(url).then( data => {
      console.log(data)
      setFoods(data)
    })
  }

//   function addProduct() {
//     let url = `https://world.openfoodfacts.org/api/v0/product/${code}.json`

//     // axios.post(url, foods).then( data => {
//     //   console.log(data)
//     //   setFoods(data)
//     // })
//   }

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
        alert('Produit ajouté avec succés')
    })
  }

  return (
    <div className="App">

      {/* <div>
      <BarcodeScannerComponent
                    width={465}
                    height={400}
                    facingMode={camView}
                    onUpdate={(err, result) => {
                        if(result){
                            setCode(result.text);
                            // setTimeout(()=>{
                            //     addProduct(result.text);
                            //     closeModal();
                            // },200)
                            console.log(result)
                        }
                        if(err) {
                          console.log("msg", err)
                        }

                        console.log('ici')

                    }}
                />
      </div> */}

      <Container>
        <Row className="mt-5">
          <Col md="6">
            <h1>Scanner ou saisir le code barre d'un produit</h1>
            <hr />

            <InputGroup className="mb-3">
              <FormControl
                placeholder="Saisir code barre"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
              <InputGroup.Text>
                Code barre {code}
              </InputGroup.Text>
            </InputGroup>

            <Button variant="info" onClick={getFood}>
              Chercher
            </Button>
          </Col>
        </Row>
      </Container>

      {foods.hasOwnProperty('data') && 
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
                onChange={(e) => {
                  let tmp = { ...formAjout }
                  tmp.category = e.target.value
                  setFormAjout(tmp)
                }}
              >
                {categs.map((categ) => {
                  return (
                    <option key={categ._id} value={categ._id}>
                      {categ.name}
                    </option>
                  )
                })}
              </Form.Select>
              <Button variant="info" className="mt-3 text-left" type="submit">
                Enregistrer
              </Button>
            </Form>
          </Col>
      </Row>

    </Container>
      }

      {/* <Container>
        <Row mt={5}>
          <Col md="6">
            <h1>Formulaire ajout utilisateur</h1>
            <hr />

            <Form.Label>Catégorie</Form.Label>
            <Form onSubmit={(e) => addUser(e)}>
              <Form.Select
                name="category"
                value={formAjout.category}
                onChange={(e) => {
                  let tmp = { ...formAjout }
                  tmp.category = e.target.value
                  setFormAjout(tmp)
                }}
              >
                {categs.map((categ) => {
                  return (
                    <option key={categ._id} value={categ._id}>
                      {categ.name}
                    </option>
                  )
                })}
              </Form.Select>

              <Form.Group className="mb-3">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                  value={formAjout.nom}
                  type="nom"
                  placeholder="Larrat"
                  required
                  onChange={(e) => {
                    let tmp = { ...formAjout }
                    tmp.nom = e.target.value
                    setFormAjout(tmp)
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Prenom</Form.Label>
                <Form.Control
                  value={formAjout.prenom}
                  type="prenom"
                  placeholder="Philippe"
                  required
                  onChange={(e) => {
                    let tmp = { ...formAjout }
                    tmp.prenom = e.target.value
                    setFormAjout(tmp)
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  value={formAjout.age}
                  type="number"
                  placeholder="ex : 20"
                  required
                  onChange={(e) => {
                    let tmp = { ...formAjout }
                    tmp.age = e.target.value
                    setFormAjout(tmp)
                  }}
                />
              </Form.Group>

              <Button variant="info" type="submit">
                Enregistrer
              </Button>
            </Form>
          </Col>
        </Row>
      </Container> */}
    </div>
  )
}
