import React from 'react'
import TextInputWhitLabel from '../../components/TextInputWhitLabel'
import SelectBox from '../../components/SelectBox'
import SButton from '../../components/Button'

import { CloseButton, Col, Figure, Form, FormControl, InputGroup, Row } from 'react-bootstrap'
import { config } from '../../config'

const EventsForm = ({
    hendleSubmit,
    form,
    hendleChange,
    isLoading,
    edit,
    lists,
    hendlePlusKeyPoint,
    hendleChangeKeyPoint,
    hendleMinusKeyPoint,
    hendlePlusTicket,
    hendleMinusTicket,
    hendleChangeTicket
}) => {
    return (
        <Form>
            <Row>
                <Col>
                    <TextInputWhitLabel
                        name='title'
                        placeholder={'Masukan Judul'}
                        type='text'
                        label={'Judul'}
                        value={form.title}
                        onChange={hendleChange}
                    />
                </Col>
                <Col>
                    <TextInputWhitLabel
                        name='tagline'
                        placeholder={'Masukan Tagline'}
                        type='text'
                        label={'Tagline'}
                        value={form.tagline}
                        onChange={hendleChange}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <TextInputWhitLabel
                        name='date'
                        placeholder={'Masukan tanggal acara'}
                        label={'Tanggal'}
                        value={form.date}
                        type='datetime-local'
                        onChange={hendleChange}
                    />
                </Col>
                <Col>
                    <SelectBox
                        name='category'
                        label={'category'}
                        placeholder={'Masukan kategori'}
                        value={form.category}
                        options={lists.categories}
                        isClearable={true}
                        hendleChange={(e) => hendleChange(e)}
                    />
                </Col>
            </Row>
            <Row>
                <Col>
                    <TextInputWhitLabel
                        name='about'
                        placeholder={'Masukan about'}
                        type='text'
                        value={form.about}
                        label={'About'}
                        onChange={hendleChange}
                    />
                </Col>
                <Col>
                    <TextInputWhitLabel
                        name='venueName'
                        type='text'
                        placeholder={'Masukan tempat acara'}
                        label={'Tempat acara'}
                        value={form.venueName}
                        onChange={hendleChange}
                    />
                </Col>
            </Row>

            <Form.Label>Key Point</Form.Label>

            <Row>
                {form.keyPoint.map((key, i) => (
                    <Col sm={6}>
                        <InputGroup className='mb-3' key={i} >
                            <FormControl
                                name='key'
                                type='text'
                                value={key}
                                placeholder='Masukan keypoint'
                                onChange={(e) => { hendleChangeKeyPoint(e, i) }}
                            />
                            {i !== 0 && (
                                <InputGroup.Text>
                                    <CloseButton onClick={() => hendleMinusKeyPoint(i)} />
                                </InputGroup.Text>
                            )}
                        </InputGroup>
                    </Col>
                ))}
            </Row>

            <SButton variant={'success'} action={hendlePlusKeyPoint} size='sm'>
                Tambah Keypoint
            </SButton>

            <Row>
                <Col>
                    <SelectBox
                        name='talent'
                        label={'Talent'}
                        placeholder={'Masukan Pembicara'}
                        value={form.talent}
                        options={lists.talents}
                        isClearable={true}
                        hendleChange={(e) => hendleChange(e)}
                    />
                </Col>
                <Col>
                    <TextInputWhitLabel
                        name='avatar'
                        type='file'
                        placeholder={'Masukan Avatar'}
                        onChange={hendleChange}
                    />

                    {form.avatar !== '' && (
                        <div>
                            <Figure>
                                <Figure.Image
                                    width={171}
                                    height={180}
                                    alt='171x180'
                                    src={`${config.api_image}/${form.avatar}`}
                                />
                                <Figure.Caption>Privew image cover</Figure.Caption>
                            </Figure>
                        </div>
                    )}
                </Col>
            </Row>

            <Form.Label>Tiket</Form.Label>

            {form.tickets.map((ticket, i) => (
                <Row>
                    <Col sm={6}>
                        <TextInputWhitLabel
                            name='type'
                            type='text'
                            placeholder={'Masukan tipe tiket'}
                            label={'Type'}
                            value={ticket.type}
                            onChange={(e) => hendleChangeTicket(e, i)}
                        />
                    </Col>
                    <Col sm={6}>
                        <TextInputWhitLabel
                            name='price'
                            type='number'
                            placeholder={'Masukan Harga'}
                            value={ticket.price}
                            onChange={(e) => hendleChangeTicket(e, i)}
                        />
                    </Col>
                    <Col sm={6}>
                        <TextInputWhitLabel
                            name='stock'
                            type='number'
                            label={'Stock'}
                            placeholder={'Masukan stoct tiket'}
                            value={ticket.stock}
                            onChange={(e) => hendleChangeTicket(e, i)}
                        />
                    </Col>
                    <Col sm={i !== 0 ? 5 : 6}>
                        <TextInputWhitLabel
                            name='status'
                            type='text'
                            label={'Status'}
                            placeholder={'Masukan Status'}
                            value={ticket.status}
                            onChange={(e) => hendleChangeTicket(e, i)}
                        />
                    </Col>

                    {i !== 0 && (
                        <Col
                            sm={1}
                            className='d-flex justify-content-end alignt-items-center'
                        >
                            <CloseButton onClick={() => hendleMinusTicket(i)} />
                        </Col>
                    )}
                </Row>
            ))}

            <div className="mb-3">
                <SButton variant={'success'} action={hendlePlusTicket}>
                    Tambah Tiket
                </SButton>
            </div>

            <SButton action={hendleSubmit} loading={isLoading} >
                {edit ? 'Ubah' : "Simpan"}
            </SButton>

        </Form>
    )
}

export default EventsForm