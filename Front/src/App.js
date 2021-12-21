import "./App.css"
import { useState, useEffect } from "react"
import NavbarApp from "./components/NavbarApp"
//import BarcodeScannerComponent from "react-qr-barcode-scanner";

import axios from "axios"

import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Form,
  Card,
  ListGroup,
  ListGroupItem
} from "react-bootstrap"

export default function App() {
  const [code, setCode] = useState('3274080005003')
  const [foods, setFoods] = useState({})
  // const [formAjout, setFormAjout] = useState({})
  // const [categs, setCategs] = useState([])
  //const [camView, setCamView] = useState("user");


  // useEffect(() => {
  //   axios.get("http://localhost:3010/category").then((datas) => {
  //     setCategs(datas.data)
  //   })
  // }, [])


  function getFood() {
    let url = `https://world.openfoodfacts.org/api/v0/product/${code}.json`

    axios.get(url).then( data => {
      console.log(data)
      setFoods(data)
    })
  }

  // function addUser(event) {
  //   event.preventDefault()
  //   const { nom, prenom, age, category } = { ...formAjout }
  //   alert(category)
  //   let url = `http://localhost:3010/user`

  //   axios.post(url, {
  //     nom,
  //     prenom,
  //     age,
  //     category,
  //   })
  // }

  return (
    <div className="App">
      <NavbarApp />

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

      <Container className="mt-5">
        <Card style={{ width: '18rem' }}>
          <Card.Body>
            <Card.Img variant="top" style={{ width: '150px', height: '200px' }} src={foods?.data?.product?.image_front_small_url} />
              <ListGroup className="list-group-flush">
                <ListGroupItem><span>{foods?.data?.product?.product_brands}</span></ListGroupItem>
                <ListGroupItem><span>{foods?.data?.product?.generic_name_fr}</span></ListGroupItem>
                <ListGroupItem><span>{foods?.data?.product?.product_name_fr}</span></ListGroupItem>
                <ListGroupItem><span>{foods?.data?.product?.id}</span></ListGroupItem>
              </ListGroup>
          </Card.Body>
        </Card>
      </Container>

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
