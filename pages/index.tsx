import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Row, Col, Card, Button } from 'react-bootstrap'

const Home: NextPage = () => {

  const router = useRouter()

  const onGetStarted = () => {
    router.push('/my-lists')
  }

  return (
    <div className='d-flex flex-column'>
      <Head>
        <title>List Simple</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <h1 className='mt-5 text-center'>List Simple</h1>
      <div className='text-center mb-4 fs-5'>An online tool to help you keep track of the important things in your life.</div>
      <Button className='mb-5 col-3 align-self-center' variant='primary' onClick={onGetStarted}>Get Started</Button>

      <section className='mt-4'>

        <Row className="g-5 justify-content-md-between justify-content-center">

          <Col xs={8} md={3}>
            <Card className='border-0'>
              <Image src='/contract.png' alt='' layout='responsive' height='100%' width='100%'></Image>
              <Card.Body className='p-0 mt-3'>
                <Card.Title>1. Sign up / Login</Card.Title>
                <Card.Text>
                  <Link passHref href="/login"><a>Login</a></Link> or <Link passHref href="/sign-up">sign up</Link> to get started with list simple.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={8} md={3}>
            <Card className='border-0'>
              <Image className='me-2' src='/list-svgrepo-com.svg' alt='' layout='responsive' height='100%' width='100%'></Image>
              <Card.Body className='p-0 mt-3'>
                <Card.Title>2. Create Lists</Card.Title>
                <Card.Text>
                  After logging in, navigate to <Link passHref href="/my-lists"><a>my lists</a></Link> to get started. You can create mutiple lists to organise your tasks effectively.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={8} md={3} className="mb-5 mb-md-0">
            <Card className='border-0'>
              <Image className='' src='/diskette-save-svgrepo-com.svg' alt='' layout='responsive' height='100%' width='100%'></Image>
              <Card.Body className='p-0 mt-3'>
                <Card.Title>3. Save Lists</Card.Title>
                <Card.Text>
                  List simple automatically saves your lists in real time, so when you come back, simply login into your account to have access to your previously created lists.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

      </section>

    </div>
  )
}

export default Home
