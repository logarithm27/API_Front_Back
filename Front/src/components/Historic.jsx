import { React, useState, useEffect } from "react"
import axios from "axios"

import {
    Container,
    Row,
    Col,
    InputGroup,
    FormControl,
    Button,
    Modal,
    Form
} from "react-bootstrap"

import load from '../assets/load.gif'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

export default function Historic() {
    const [code, setCode] = useState('')
    const [products, setProducts] = useState([])
    const [product, setProduct] = useState({})
    const [categs, setCategs] = useState([])
    const [formAjout, setFormAjout] = useState({})
    const [show, setShow] = useState(false);
    const [isLoad, setLoad] = useState(false)

    useEffect(() => {
        getProducts()
        getCategories()
    }, [])

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function searchByName() {
        const {name} = {...formAjout}
        setLoad(true)

        console.log(name)
        if(name !== '' && name !== undefined) {
            axios.get(`http://localhost:3001/api/product/name/${name}`).then((datas) => {
                setLoad(false)
                setProducts(datas?.data)
            })
        } else {
            getProducts()
        }        
        
        
    }

    function searchByCategory() {
        const {category } = { ...formAjout }
        setLoad(true)

        axios.get(`http://localhost:3001/api/product/category/${category}`).then((datas) => {
        setLoad(false)
           setProducts(datas?.data)
        })

    }

    function getCategories() {
        axios.get("http://localhost:3001/api/category").then((datas) => {
            setCategs(datas.data)
        })
    }

    function getProducts() {
        let url = `http://localhost:3001/api/product`
        setLoad(true)

        axios.get(url).then(data => {
            setLoad(false)
            setProducts(data?.data)
        })
    }

    function deleteProduct(product) {
        let url = `http://localhost:3001/api/product/${product._id}`

        axios.delete(url).then(data => {
            MySwal.fire({
                icon: 'success',
                title: data.data.message,
                footer: 'IPSSI - 2021',
                allowOutsideClick: false,
                showConfirmButton: false,
                timer: 900,
            });
            getProducts()
        })
    }

    function updateProduct(p) {
        setFormAjout(p)
        setProduct(p)
        handleShow()
    }

    function update(e, product) {
        e.preventDefault();

        let url = `http://localhost:3001/api/product/${product._id}`

        axios.put(url, {
            ...formAjout
        }).then(data => {
            setProducts(data?.data)
            getProducts()
            MySwal.fire({
                icon: 'success',
                title: data.data.message,
                footer: 'IPSSI - 2021',
                allowOutsideClick: false,
                showConfirmButton: false,
                timer: 900,
            });
            handleClose() 
        })
    }

    return (
        <>
            <Container>
                <Row>
                    <Col md="6" className="mt-3">
                        <h3>Chercher</h3>
                        <hr />

                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="Chercher un produit"
                                name="name"
                                onChange={(e) => {
                                    let tmp = { ...formAjout }
                                    tmp.name = e.target.value
                                    setFormAjout(tmp)
                                }}
                            />
                            <InputGroup.Text>
                                Search {code}
                            </InputGroup.Text>
                        </InputGroup>

                        <Button variant="info" onClick={searchByName}>
                            Chercher un produit
                    </Button>
                    </Col>

                    <Col md="6" className="mt-3">
                        <h3>Par cat??gorie</h3>
                        <hr />

                        <Form.Select
                            className="mb-3"
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

                        <Button variant="info" onClick={searchByCategory}>
                            Chercher par cat??gorie
                    </Button>
                    </Col>

                </Row>
            </Container>

            <Container>
                <h3 className="mt-3" >Liste des produits : {products.length}</h3>

                { isLoad &&
                    <Container>
                        <Row className="mt-5">
                        <Col md="6">
                        <img src={load} alt="loading..." />
                        </Col>
                        </Row>
                    </Container>
                }

                {products.length > 0 && !isLoad &&
                    products.map((product) =>
                        <Row mt={3}>
                            <Col className="mt-1" >
                                <div>
                                    {product.brandName} - {product.name}
                                </div>
                                <div>
                                    Nutrigrade : {product.nutriGrade} - Cat??gorie : {product?.category?.name}
                                </div>
                            </Col>
                            <Col className="mt-1">
                                <Button onClick={() => deleteProduct(product)} className="ml-5" variant="danger">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                    </svg>
                                </Button>
                            </Col>
                            <Col className="mt-1">
                                <Button onClick={() => updateProduct(product)} variant="info">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil" viewBox="0 0 16 16">
                                        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                    </svg>
                                </Button>
                            </Col>
                        </Row>
                    )
                }
            </Container>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifier le produit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={(e) => update(e, product)}>
                        <Form.Group className="mb-3">
                            <Form.Label>Marque</Form.Label>
                            <Form.Control
                                value={formAjout.brandName}
                                type="nom"
                                placeholder="Cat??gorie"
                                required
                                onChange={(e) => {
                                    let tmp = { ...formAjout }
                                    tmp.brandName = e.target.value
                                    setFormAjout(tmp)
                                }}
                            />
                            <Form.Label>Nom</Form.Label>
                            <Form.Control
                                value={formAjout.name}
                                type="nom"
                                placeholder="Nom"
                                required
                                onChange={(e) => {
                                    let tmp = { ...formAjout }
                                    tmp.name = e.target.value
                                    setFormAjout(tmp)
                                }}
                            />
                            <Form.Label>Url de l'image</Form.Label>
                            <Form.Control
                                value={formAjout.image}
                                type="nom"
                                placeholder="ex : https://"
                                required
                                onChange={(e) => {
                                    let tmp = { ...formAjout }
                                    tmp.image = e.target.value
                                    setFormAjout(tmp)
                                }}
                            />

                            <Form.Label>Nutrigrade</Form.Label>
                                <Form.Control
                                    value={formAjout.nutriGrade}
                                    type="nom"
                                    placeholder="ex : A"
                                    required
                                    onChange={(e) => {
                                        let tmp = { ...formAjout }
                                        tmp.nutriGrade = e.target.value
                                        setFormAjout(tmp)
                                    }}
                                />
                        <Form.Label>Cat??gorie</Form.Label>
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
                        value={formAjout.content}
                        onChange={(e) => {
                            let tmp = { ...formAjout }
                            tmp.content = e.target.value
                            setFormAjout(tmp)
                        }} />

                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Modifier
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>

        </>
    )
}