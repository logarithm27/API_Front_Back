import { React, useState, useEffect } from "react"
//import BarcodeScannerComponent from "react-qr-barcode-scanner";

import axios from "axios"

import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Modal
} from "react-bootstrap"

export default function Category() {
  const [formAjout, setFormAjout] = useState({})
  const [categs, setCategs] = useState([])
  const [currentCateg, setCurrentCategs] = useState({})
  const [show, setShow] = useState(false);

  useEffect(() => {
   getCategories()
  }, [])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function getCategories() {
    let url = `http://localhost:3001/api/category`

    axios.get(url).then( data => {
      console.log(data)
      setCategs(data?.data)
    })
  }

  function addCateg(event) {
    event.preventDefault()
    const { name } = { ...formAjout }
    let url = `http://localhost:3001/api/category`

    axios.post(url, {
        name
    }).then(res => {
        alert('Catégorie ajouté avec succés')
        getCategories()
    })
  }

  function deleteCateg(categ) {
    let url = `http://localhost:3001/api/category/${categ._id}`

    axios.delete(url).then(res => {
        alert('Catégorie supprimé avec succés')
        getCategories()
    })
  }

  function updateCateg(categ) {
    console.log(categ)
    const tmp = {
        name: categ.name
    }
    setFormAjout(tmp)
    setCurrentCategs(categ)
    handleShow()
    console.log(currentCateg)

}

function update(categ) {
    console.log(categ)
    const { name } = { ...formAjout }
    let url = `http://localhost:3001/api/category/${categ._id}`

    axios.put(url, {
        name
    }).then(res => {
        alert('Catégorie modifié avec succés')
        getCategories()
    })
}


  return (
    <div className="App">

      <Container>
        <Row mt={5}>
            {!show && 
                <Col md="6" className="mt-3">
                <h3>Ajouter une catégorie</h3>
                <hr />
                <Form onSubmit={(e) => addCateg(e)}>
    
                  <Form.Group className="mb-3">
                    <Form.Label>Nom</Form.Label>
                    <Form.Control
                      value={formAjout.name}
                      type="nom"
                      placeholder="Catégorie"
                      required
                      onChange={(e) => {
                        let tmp = { ...formAjout }
                        tmp.name = e.target.value
                        setFormAjout(tmp)
                      }}
                    />
                  </Form.Group>
    
                  <Button variant="info" type="submit">
                    Enregistrer
                  </Button>
                </Form>
              </Col>
            }
                  
          <Col md="6" className="mt-3">
            <h3>Liste des produits</h3>
            <hr />
            
            {categs.length > 0 && 
                categs.map((categ) => 
                    <Row mt={3}>
                        <Col className="mt-1" >
                            <span >{categ.name}</span>
                        </Col>
                        <Col className="mt-1">
                            <Button onClick={() => deleteCateg(categ)} className="ml-5" variant="danger">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                            </svg>
                            </Button>
                        </Col>
                        <Col className="mt-1">
                            <Button onClick={() => updateCateg(categ)} variant="info">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                            </svg>
                            </Button>
                        </Col>
                    </Row>
                )
            }
            
          </Col>        
        </Row>
      </Container>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>Modifier la catégorie {currentCateg?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form onSubmit={() => update(currentCateg)}>
                <Form.Group className="mb-3">
                <Form.Label>Nom</Form.Label>
                <Form.Control
                    value={formAjout.name}
                    type="nom"
                    placeholder="Catégorie"
                    required
                    onChange={(e) => {
                    let tmp = { ...formAjout }
                    tmp.name = e.target.value
                    setFormAjout(tmp)
                    }}
                />
                 </Form.Group>
                 <Button variant="primary" type="submit">
                    Modifier
                </Button>
            </Form>        
        </Modal.Body>
      </Modal>

    </div>
  )
}
