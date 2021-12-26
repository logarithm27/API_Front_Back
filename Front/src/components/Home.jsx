import { React, useState, useEffect } from "react"

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

export default function Home() {
  const [code, setCode] = useState('3274080005003')
  const [foods, setFoods] = useState({})
  const [formAjout, setFormAjout] = useState({})
  const [categs, setCategs] = useState([])


  useEffect(() => {
    axios.get("http://localhost:3001/api/category").then((datas) => {
      setCategs(datas.data)
    })
  }, [])


  function getFood() {
    let url = `https://world.openfoodfacts.org/api/v0/product/${code}.json`

    axios.get(url).then( data => {
      setFoods(data)
    })
  }

  function addProduct(event) {
    event.preventDefault()
    const { category, content } = { ...formAjout }
    const data = {
        category,
        name: foods?.data?.product?.product_name_fr,
        brandName: foods?.data?.product?.brands,
        nutriGrade: foods?.data?.product?.nutrition_grade_fr,
        image: foods?.data?.product?.image_front_small_url,
        content: content
    }
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

  return (
    <div className="App">
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
              <Form.Label>Note personnelle</Form.Label>
              <Form.Control as="textarea" rows={3}  name="content"
              onChange={(e) => {
                let tmp = { ...formAjout }
                tmp.content = e.target.value
                setFormAjout(tmp)
              }} />
              <Button variant="info" className="mt-3 text-left" type="submit">
                Enregistrer
              </Button>
            </Form>
          </Col>
      </Row>

    </Container>
      }
    </div>
  )
}
