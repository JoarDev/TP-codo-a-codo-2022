import React, { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Icon,
  Image,
  Input,
  Link,
  Select,
  Spacer,
} from '@chakra-ui/react';
import codo_a_codo_logo from '../assets/codo_a_codo_logo.png';
import { AiFillGithub } from 'react-icons/ai';
import DatePicker from "react-datepicker";
import html2pdf from 'html2pdf.js'

import "react-datepicker/dist/react-datepicker.css";
import '../styles/react-date-picker.css';

const get_zodiac_sign = (day, month) => {
    let signo
    switch (month) {
        case 1:
        if (day>=21)
        signo = "Aquarius"
        break
        case 2:
        if (day<=19)
        signo = "Aquarius"
        else
        signo = "Pisces"
        break
        
        case 3:
        if (day<=20)
        signo = "Pisces"
        else
        signo = "Aries"
        break
        
        case 4:
        if (day<=20)
        signo = "Aries"
        else
        signo = "Taurus"
        break
        
        case 5:
        if (day<=21)
        signo = "Taurus"
        else
        signo = "Gemini"
        break
        
        case 6:
        if (day<=21)
        signo = "Gemini"
        else
        signo = "Cancer"
        break
        
        case 7:
        if (day>=23)
        signo = "Cancer"
        else
        signo = "Leo"
        break
        
        case 8:
        if (day<=23)
        signo = "Leo"
        else
        signo = "Virgo"
        break
        
        case 9:
        if (day<=23)
        signo = "Virgo"
        else
        signo = "Libra"
        break
        
        case 10:
        if (day<=23)
        signo = "Libra"
        else
        signo = "Scorpio"
        break
        
        case 11:
        if (day<=22)
        signo = "Scorpio"
        else
        signo = "Sagittarius"
        break
        
        case 12:
        if (day<=21)
        signo = "Sagittarius"
        else
        signo = "Capricorn"
        break
        
    }
    return signo
}

export default function IndexPage() {
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [birthDate, setBirthDate] = useState(null)
    const [result, setResult] = useState(null)
    const [cards, setCards] = useState(null)

    const onSubmit = () => {
        console.log({birthDate, name, age})
        const day = birthDate.getDate()
        const month = birthDate.getMonth() + 1

        // Calcula el signo zodiacal en base a la fecha de nacimiento
        const signo = get_zodiac_sign(day, month)

        console.log({signo})

        const options = {
            method: 'POST',
        };

        const request_zodiac = new Request(`https://aztro.sameerkumar.website/?sign=${signo}&day=today`, options)

        // Llamada a api "aztro" para obtener la informacion del signo zodiacal
        fetch(request_zodiac)
        .then(response => response.json())
        .then(response => {
            console.log("zodiac",response)
            setResult({
                signo: signo,
                ...response
            })
        })
        .catch((error) => console.log("error",error))

        const request_cards = new Request(`https://rws-cards-api.herokuapp.com/api/v1/cards/random?n=3`)

        fetch(request_cards)
        .then(response => response.json())
	        .then(response => {
                console.log("cards from api =>",response.cards)
                const cards = [
                    {...response.cards[0], tiempo: "Pasado"},
                    {...response.cards[1], tiempo: "Presente"},
                    {...response.cards[2], tiempo: "Futuro"},
                ]
                console.log("owo", cards)
                setCards(cards)
            })
          .catch((error) => console.log("error",error))
    }

    const onDownloadPDF = () => {
        const pdf_element = document.querySelector("#to-pdf")
        const options = {
            margin: 10,
            filename: 'luna_magica.pdf',
        }
        html2pdf(pdf_element, options)
    }
  return (
    <>
      <header>
        <Flex bgColor="red" align="center">
          <Box bgColor="blue" p={5}>
            <Image src={codo_a_codo_logo} />
          </Box>
          <Spacer />
          <Flex>
            <Link href="https://github.com" isExternal>
              <Icon as={AiFillGithub} boxSize={20} />
            </Link>
          </Flex>
        </Flex>
      </header>
      <Box>
        <Container maxW='container.xl'>
          <Box>
            <Heading>La luna magica</Heading>
            <Heading>Adivinacion</Heading>
            <Box fontWeight="medium">
              ¿Sabes qué caracteristicas tiene tu personalidad? ¿Sabes que te
              depara tu futuro? La luna te dará una guía para tu vida
            </Box>
          </Box>
          <Box>
            Déjanos conocerte un poco más:
          </Box>
            <FormControl>
                <FormLabel htmlFor="name">Nombre completo</FormLabel>
                <Input
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
                <FormLabel htmlFor="age">Edad</FormLabel>
                <Input
                    value={age}
                    onChange={(event) => setAge(event.target.value)}
                />
                <FormLabel htmlFor="gender">Genero</FormLabel>
                <Select placeholder="Seleccione">
                    <option value="F">Femenino</option>
                    <option value="M">Masculino</option>
                    <option value="N">No binario</option>
                </Select>
                <FormLabel htmlFor="birth-date">Fecha de nacimiento</FormLabel>
                <DatePicker id="birth-date" showPopperArrow={true} selected={birthDate} onChange={(date) => setBirthDate(date)} />
            </FormControl>
            <Button onClick={onSubmit}>Consultá de horoscopo</Button>
            <Box id="to-pdf">
                {
                    result && (
                        <Box>
                            <Heading>
                                {name} tu signo es {result.signo}
                            </Heading>
                            <Box>
                                Color: {result.color}
                            </Box>
                            <Box>
                                Compatibilidad: {result.compatibility}
                            </Box>
                            <Box>
                                Descripcion: {result.description}
                            </Box>
                            <Box>
                                Numero de la suerte: {result.lucky_number}
                            </Box>
                            <Box>
                                Hora de la suerte: {result.lucky_time}
                            </Box>
                            <Box>
                                Estado emocional: {result.mood}
                            </Box>
                        </Box>
                    )
                }
                {
                    cards !== null && cards.map((card, index) => (
                        <Box>
                            <Heading>
                                {card.tiempo}
                            </Heading>
                            <Heading>
                                {`${index+1}°`} Carta: {card.name}
                            </Heading>
                            <Box>
                                Valor: {card.value}
                            </Box>
                            <Box>
                                Tipo: {card.type}
                            </Box>
                            <Box>
                                Significado: {card.meaning_up}
                            </Box>
                        </Box>
                    ))
                }
            </Box>
            {
                result && cards && (
                    <Button onClick={onDownloadPDF}>
                        Descargar pdf
                    </Button>
                )
            }
        </Container>
      </Box>
    </>
  );
}
