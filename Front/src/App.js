import "./App.css"
import { useState, useEffect } from "react"
import NavbarApp from "./components/NavbarApp"
import axios from "axios"

import {
  Container,
  Row,
  Col,
  InputGroup,
  FormControl,
  Button,
  Form,
} from "react-bootstrap"

export default function App() {
  const [nbPic, setNbPic] = useState(1)
  const [produit, setProduit] = useState({})
  const [formAjout, setFormAjout] = useState({})
  const [categs, setCategs] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3010/category").then((datas) => {
      setCategs(datas.data)
    })
  }, [])

  function getDatas() {
    let url = `http://localhost:3010/user/${nbPic}`

    fetch(url)
      .then(function (res) {
        return res.json()
      })
      .then(function (datas) {
        alert()
        // setProduit(datas)
      })
  }

  function addUser(event) {
    event.preventDefault()
    const { nom, prenom, age, category } = { ...formAjout }
    alert(category)
    let url = `http://localhost:3010/user`

    axios.post(url, {
      nom,
      prenom,
      age,
      category,
    })
  }

  return (
    <div className="App">
      <NavbarApp />

      <Container>
        <Row className="mt-5">
          <Col md="6">
            <h1>Exemple d'appel API </h1>
            <hr />

            <InputGroup className="mb-3">
              <FormControl
                placeholder="Saisir un nombre de photos"
                value={nbPic}
                onChange={(e) => setNbPic(e.target.value)}
              />
              <InputGroup.Text>
                Nombre de Photos {produit.length}
              </InputGroup.Text>
            </InputGroup>

            <Button variant="info" onClick={getDatas}>
              Cliquez moi
            </Button>
          </Col>
        </Row>
      </Container>

      <Container>
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
      </Container>
    </div>
  )
}
