import React, { useState, useEffect, useRef } from 'react';

import {
  Container,
  SimpleGrid,
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
  Button,
} from '@chakra-ui/react'
import { BsPencil } from 'react-icons/bs'
import { BiEraser } from 'react-icons/bi'
import { AiOutlineClear } from 'react-icons/ai'

const Feature = ({ text, icon, iconBg, handler, highlight }) => {
  return (
    <Stack direction={'row'} align={'center'} onClick={handler} as="button" px={{base: 2, md: 3}} py={{base: 1, md: 2}} rounded={{base: 'md', md: 'xl'}} bg={highlight ? iconBg : 'transparent'}>
      <Flex w={6} h={6} align={'center'} justify={'center'} rounded={'full'} bg={iconBg}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{text}</Text>
    </Stack>
  )
}

const initialState = (ROW, COL) => {
  const tmp_table = [];
  for (let i = 0; i < ROW * COL; i++) {
    tmp_table.push(false);
  }
  return tmp_table;
}


export default function SplitWithImage() {
  // const [table, setTable] = useState([]);
  const ROW = 28;
  const COL = 28;
  const table = useRef(initialState(ROW, COL));
  const [force, setForce] = useState(0);

  const [hovering, setHovering] = useState(false);
  const [pen, setPen] = useState(true);

  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const write = (i) => {
    setPen(true);
  }
  const erase = (i) => {
    setPen(false);
  }
  const reset = () => {
    table.current = initialState(ROW, COL);
    setForce(force + 1);
  }

  const predict = async () => {
    setLoading(true);
    const res = await fetch("/api/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({table: table.current}),
    });
    const data = await res.json();
    setPrediction(data.prediction);
    setLoading(false);
  }
  useEffect(() => {
    table.current = initialState(ROW, COL);
  }, []);
  return (
    <Container maxW={'5xl'} py={12}>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} alignContent={"center"} alignItems={"center"}>
        <Stack spacing={4}>
          <Text
            // textTransform={'uppercase'}
            color={'blue.400'}
            fontWeight={600}
            fontSize={'sm'}
            bg={useColorModeValue('blue.50', 'blue.900')}
            p={2}
            alignSelf={'flex-start'}
            rounded={'md'}>
            NumProphet
          </Text>
          <Heading>Hand writing number prediction</Heading>
          <Text color={'gray.500'} fontSize={'lg'}>
            Draw the number you want to predict and click on the predict button
            (hold the mouse button to draw) 
          </Text>
          <Stack
            spacing={4}
            divider={
              <StackDivider borderColor={useColorModeValue('gray.100', 'gray.700')} />
            }
            direction={'row'}
            align={'center'}
            >
            <Feature
              icon={<Icon as={BsPencil} color={'green.500'} w={5} h={5} />}
              iconBg={useColorModeValue('green.100', 'green.900')}
              text={'Write'}
              highlight={pen}
              handler={write}
            />
            <Feature
              icon={<Icon as={BiEraser} color={'purple.500'} w={5} h={5} />}
              iconBg={useColorModeValue('purple.100', 'purple.900')}
              text={'Erase'}
              highlight={!pen}
              handler={erase}
            />
            <Feature
              icon={<Icon as={AiOutlineClear} color={'yellow.500'} w={5} h={5} />}
              iconBg={useColorModeValue('yellow.100', 'yellow.900')}
              text={'Reset'}
              handler={reset}
            />
          </Stack>
        </Stack>
        <Flex
          justify={'center'}
          align={'center'}
        >
          <Box
            minW={{ base: '90%', md: '100%' }}
            aspectRatio={1 / 1}
            rounded={{base: 'md', md: 'xl'}}
          >
            <SimpleGrid 
              columns={ROW}
              rows={COL}
              spacing={0}
              w={'100%'}
              h={'100%'}
              rounded={'lg'}
              overflow={'hidden'}
              onMouseDown={() => {
                setHovering(true);
              }}
              onMouseUp={() => {
                setHovering(false);
              }}
              border={useColorModeValue('1px solid #00000022', '1px solid #ffffff66')}
            >
              {table.current.map((row, i) => {
                return (<Box
                  key={i}
                  bg={row ? useColorModeValue('gray.600', 'gray.400') : "transparent"}
                  onClick={() => {
                    table.current[i] = pen;
                    setForce(force + 1);
                  }}
                  onMouseEnter={async () => {
                    if(hovering) {
                      console.log("hovering");
                      table.current[i] = pen;
                      setForce((force) => force + 1);
                    }
                  }}
                  // disable drag and drop
                  onDragStart={(e) => {
                    e.preventDefault();
                  }}
                />
              )})}
            </SimpleGrid>
          </Box>
        </Flex>
        <Flex
          justify={'space-evenly'}
          align={'center'}
        >
          <Button
            onClick={predict}
            isLoading={loading}
            loadingText="Predicting"
            colorScheme={loading ? "gray" : "twitter"}
            size="lg"
            fontSize="md"
            fontWeight="bold"
          >
              Predict
          </Button>
          <Text ml={4} fontSize="5xl" fontWeight="bold">
            {loading ? "..." : prediction === null ? "" : prediction}
          </Text>
        </Flex>
      </SimpleGrid>
    </Container>
  )
}